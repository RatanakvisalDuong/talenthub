// RootLayout.tsx

import { Ubuntu } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/option";  // import auth options for server session handling
import ClientSessionWrapper from "./ClientSessionWrapper";

const ubuntuFont = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <title>TalentHub</title>
      </head>
      <body className={`${ubuntuFont.className} bg-[#E8E8E8]`}>
        <ClientSessionWrapper session={session}>{children}</ClientSessionWrapper>
      </body>
    </html>
  );
}
