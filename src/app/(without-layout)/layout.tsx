import { Ubuntu } from "next/font/google";
import "../globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import { Metadata } from "next";

const ubuntuFont = Ubuntu({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    title: {
        default: "TalentHub - Paragon International University Student Portfolio Platform",
        template: "%s | TalentHub - Paragon International University"
    },
    description: "TalentHub is the official portfolio platform for Paragon International University students. Discover talented ICT students, explore academic portfolios, and connect with top tech talent from Cambodia's leading university.",
    keywords: ["TalentHub", "TalentHub Portfolio", "Paragon International University", "Paragon International University Students", "ParagonIU", "ICT students", "student portfolios", "portfolio platform", "tech recruitment", "academic portfolios", "career portfolios", "university students", "Cambodia ICT", "tech talent", "Paragon University"],
    authors: [{ name: "Paragon International University" }],
    creator: "Paragon International University",
    publisher: "Paragon International University",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            {
                url: "/talenthublogo-sm.png",
                sizes: "52x52",
                type: "image/png",
            },
            {
                url: "/favicon.ico",
                sizes: "any",
            }
        ],
        shortcut: "/talenthublogo-sm.png",
        apple: [
            {
                url: "/talenthublogo-sm.png",
                sizes: "52x52",
                type: "image/png",
            }
        ],
    },
    manifest: "/site.webmanifest",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://talenthub-liart.vercel.app",
        title: "TalentHub - Paragon International University Student Portfolio Platform",
        description: "Discover talented ICT students from Paragon International University. Official portfolio platform for academic and career portfolios.",
        siteName: "TalentHub",
        images: [
            {
                url: "https://talenthub-liart.vercel.app/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "TalentHub - Paragon International University Portfolio Platform",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "TalentHub - Paragon International University Student Portfolio Platform",
        description: "Discover talented ICT students from Paragon International University. Official portfolio platform for academic and career portfolios.",
        images: ["https://talenthub-liart.vercel.app/og-image.jpg"],
    },
    verification: {
        google: "google-site-verification=NhFAJMnBkxDvWqZGbxMtdA95TW2DGV96hn9RaF5Wv0g", // Add your Google Search Console verification code
    },
    alternates: {
        canonical: "https://talenthub-liart.vercel.app",
    },
    category: "education",
    classification: "Education Platform",
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
    }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for better SEO */}
        <meta name="application-name" content="TalentHub" />
        <meta name="apple-mobile-web-app-title" content="TalentHub" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${ubuntuFont.className} bg-[#E8E8E8]`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}