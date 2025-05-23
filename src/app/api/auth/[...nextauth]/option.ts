import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
	interface Session {
		accessToken: string;
		roleId: number;
		googleId: string;
		photo: string;
		expires: string; // ISO date string for session expiry
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken: string;
		roleId: number;
		googleId: string;
		photo: string;
		exp: number; // Standard JWT expiration claim
	}
}

const BLOCKED_DOMAINS = ["yahoo.com", "email.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "protonmail.com", "tutanota.com", "yandex.com", "zoho.com", "gmx.com", "mailinator.com"];

let laravelToken = "";
let roleId = 0;
let googleId = "";
let photo = "";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
				};
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		error: "/auth/error",
	},
	// Set session max age to 14 days
	session: {
		strategy: "jwt",
		maxAge: 14 * 24 * 60 * 60, // 14 days in seconds
	},
	// Set JWT max age to 14 days for consistency
	jwt: {
		maxAge: 14 * 24 * 60 * 60, // 14 days in seconds
	},
	callbacks: {
		async signIn({ user }) {
			if (user?.email) {
				const domain = user.email.split("@")[1];
				if (BLOCKED_DOMAINS.includes(domain)) {
					return "/auth/error?error=BlockedDomain";
				}
			}
			try {
				const params = new URLSearchParams();
				params.append("sub", user.id);
				params.append("email", user.email!);
				params.append("name", user.name!);
				params.append('photo', user.image!);

				const res = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}login_google?${params.toString()}`,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if(res.data.user_status === 0){
					return "/auth/ban";
				}

				laravelToken = res.data.token;
				roleId = res.data.role_id;
				googleId = res.data.google_id;
				photo = res.data.photo;

				// Store expiry in localStorage
				if (typeof window !== "undefined") {
					const expiryDate = new Date();
					expiryDate.setDate(expiryDate.getSeconds() + 5);
					localStorage.setItem("auth_expiry", expiryDate.getTime().toString());
				}

			} catch (error) {
				console.error("Error:", error);
				return "/auth/error?error=ApiCallFailed";
			}

			return true;
		},

		async jwt({ token, account }) {
			if (account) {
				token.accessToken = laravelToken;
				token.roleId = roleId;
				token.googleId = googleId;
				token.photo = photo;
			}
			return token;
		},

		async session({ session, token }) {
			session.accessToken = token.accessToken;
			session.roleId = token.roleId;
			session.googleId = token.googleId;
			session.photo = token.photo;

			return session;
		},
	},
};

export default NextAuth(authOptions);