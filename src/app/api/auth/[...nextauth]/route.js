import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// List of blocked domains
const BLOCKED_DOMAINS = ["gmail.com", "yahoo.com", "email.com"];

let laravelToken = "";

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
        // Logging the user data
        console.log("user: ", user);
    
        // Constructing the API URL
        const apiUrl = `${process.env.API_URL}login_google`;
    
        // Sending the POST request to the Laravel API with the profile data
        const res = await axios.post(
            apiUrl, 
            {
                profile: {
                    name: user.name,     // Name from the user object
                    email: user.email,   // Email from the user object
                    sub: user.id,        // Google ID (sub) from the user object
                },
            },
            {
              headers: {
                "Authorization": "Bearer YOUR_API_TOKEN",
                "Content-Type": "application/json"
              }
            }
            
        );
        console.log("res: ", res);
        laravelToken = res.data.token;
    
    } catch (error) {
        console.error("KDMV Error: ", error);
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
