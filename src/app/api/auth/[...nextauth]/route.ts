
import NextAuth from "next-auth";
import { authOptions } from "./option"; // Import the authOptions from authOptions.ts

const handler = NextAuth(authOptions); // Initialize NextAuth with the authOptions

export { handler as GET, handler as POST }; // Allow both GET and POST requests for the authentication route


// // NextAuth handler to handle GET and POST requests
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
