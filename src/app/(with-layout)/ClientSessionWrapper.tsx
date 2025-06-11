"use client"

import { SessionProvider } from "next-auth/react";  // Client-side only
import { ReactNode } from "react";

// Client-side wrapper component to pass the session data to SessionProvider
export default function ClientSessionWrapper({
  session,
  children,
}: {
  session: any;  // The session object passed from the server
  children: ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
