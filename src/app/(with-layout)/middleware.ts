// // src/app/middleware.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req: NextRequest) {
//   // Get the session data using JWT (from next-auth)
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   if (!token?.googleId) {
//     // Redirect to login if googleId is not present in session
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // If googleId exists, attach it to the request headers
//   const headers = new Headers(req.headers);
//   headers.set('x-google-id', token.googleId);

//   return NextResponse.next({
//     request: {
//       headers,
//     },
//   });
// }

// // Apply middleware to specific routes
// export const config = {
//   matcher: ['/yourportfolio/*'],
// };
