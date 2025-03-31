import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
	interface Session {
		accessToken: string;
		roleId: number;
		googleId: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken: string;
		roleId: number;
		googleId: string;
	}
}

const BLOCKED_DOMAINS = ["gmail.com", "yahoo.com", "email.com", "aupp.edu.kh", "hotmail.com", "outlook.com", "live.com", "icloud.com", "protonmail.com", "tutanota.com", "yandex.com", "zoho.com", "gmx.com", "mailinator.com", "rupp.edu.kh"];

let laravelToken = "";
let roleId = 0;
let googleId = "";

const authOptions: NextAuthOptions = {
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

				const res = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}login_google?${params.toString()}`,
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				laravelToken = res.data.token;
				roleId = res.data.role_id;
				googleId = res.data.google_id;

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
			}
			return token;
		},

		async session({ session, token }) {
			session.accessToken = token.accessToken;
			session.roleId = token.roleId;
			session.googleId = token.googleId;
			return session;
		},
	},
};

// NextAuth handler to handle GET and POST requests
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
