import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// List of blocked domains
const BLOCKED_DOMAINS = ["gmail.com", "yahoo.com", "email.com"];

let laravelToken = '';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
        const res = await axios.post(`${process.env.API_URL}login_google`, {
          "profile": {
            "name": user.name,
            "email": user.email,
            "sub": user.id,
          },
        });
        laravelToken = res.data.token;
      } catch (error) {
        console.error("Error: ", error);
        return "/auth/error?error=ApiCallFailed";
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = laravelToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
