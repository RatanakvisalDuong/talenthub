import { Ubuntu } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Appbar from "@/components/appbar/appbar";
import SessionProvider from "@/components/providers/SessionProvider";
import type { Metadata } from "next";

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


export default async function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/talenthublogo-sm.webp" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <title>TalentHub</title>
            </head>
            <body className={`${ubuntuFont.className} bg-[#E8E8E8]`}>
                <SessionProvider>
                    {/* Desktop/Tablet View (>= 900px) */}
                    <div className="hidden min-[650px]:block">
                        <Appbar />
                        {children}
                    </div>
                    
                    {/* Mobile View (< 900px) - Restriction Message */}
                    <div className="block min-[900px]:hidden min-h-screen flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto">
                            <div className="mb-4">
                                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                Desktop Required
                            </h2>
                            <p className="text-gray-600 mb-4">
                                This application does not work on your device. Please use a desktop or tablet with a screen width of at least 650px.
                            </p>
                            <div className="text-sm text-gray-500">
                                Current screen size is too small
                            </div>
                        </div>
                    </div>
                </SessionProvider>
            </body>
        </html>
    );
}