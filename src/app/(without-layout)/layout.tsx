import { Ubuntu } from "next/font/google";
import "../globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import { Metadata } from "next";

const ubuntuFont = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://talenthub.paragoniu.app'),
  title: {
    default: "TalentHub Paragon International University - Official PIU TalentHub Portfolio Platform",
    template: "%s | TalentHub Portfolio - PIU TalentHub Paragon International University"
  },
  description: "TalentHub Paragon International University is the official PIU TalentHub portfolio platform. Discover TalentHub Portfolio showcasing talented ICT students from Cambodia's leading university. Search PIU TalentHub student directory and connect with top tech talent.",
  keywords: [
    "TalentHub Paragon International University",
    "TalentHub Portfolio",
    "PIU TalentHub",
    "TalentHub PIU",
    "Paragon International University TalentHub",
    "TalentHub Platform PIU",
    "PIU Portfolio Platform",
    "Paragon University TalentHub",
    "TalentHub Paragon University",
    "official PIU TalentHub",
    "TalentHub Portfolio platform",
    "Paragon International University Portfolio",
    "PIU student directory",
    "TalentHub student platform",
    "Cambodia ICT students TalentHub",
    "Paragon International University student portfolios",
    "official TalentHub Paragon International University platform",
    "PIU TalentHub student search",
    "TalentHub Portfolio Cambodia university",
    "Paragon International University tech talent",
    "Cambodia university portfolio platform",
    "PIU academic portfolio showcase",
    "TalentHub Paragon International University directory",
    "official PIU student platform"
  ],
  authors: [{ name: "Paragon International University - TalentHub Portfolio Team" }],
  creator: "TalentHub Portfolio - Paragon International University",
  publisher: "PIU TalentHub - Paragon International University",
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
        url: "/logo.png",
        sizes: "52x52",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      }
    ],
    shortcut: "/logo.png",
    apple: [
      {
        url: "/logo.png",
        sizes: "52x52",
        type: "image/png",
      }
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "07Xjr-50lKVhLxq03j5Um0V37gCVT4-7pw9_mpHJ2W0"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://talenthub.paragoniu.app",
    title: "TalentHub Portfolio - Official PIU TalentHub Paragon International University Platform",
    description: "Discover TalentHub Paragon International University - the official PIU TalentHub platform. Browse TalentHub Portfolio showcasing talented ICT students from Cambodia's leading university.",
    siteName: "TalentHub Portfolio - PIU TalentHub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TalentHub Portfolio - Official PIU TalentHub Paragon International University Platform",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ParagonIU",
    title: "TalentHub Portfolio - PIU TalentHub Platform",
    description: "Official TalentHub Paragon International University platform for student portfolios.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://talenthub.paragoniu.app",
    languages: {
      'en-US': 'https://talenthub.paragoniu.app',
      'en': 'https://talenthub.paragoniu.app',
    },
  },
  category: "education",
  classification: "University Portfolio Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ubuntuFont.className}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className="bg-[#E8E8E8]">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
