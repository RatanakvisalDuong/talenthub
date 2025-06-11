import { Ubuntu } from "next/font/google";
import "../globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import { Metadata } from "next";

// export const metadata = {
//   title: 'TalentHub',
// }
const ubuntuFont = Ubuntu({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    title: "TalentHub",
    icons: {
        icon: [
            {
                url: "/talenthublogo-sm.png",
                sizes: "52x52",
                type: "image/png",
            },
        ],
        shortcut: "/talenthublogo-sm.png",
        apple: "/talenthublogo-sm.png",
    },
    viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${ubuntuFont.className} bg-[#E8E8E8]`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
