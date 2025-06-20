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
    default: "TalentHub PIU - Paragon International University Portfolio | Official Student Platform",
    template: "%s | TalentHub PIU - Paragon International University"
  },
  description: "TalentHub PIU is the official Paragon International University portfolio platform. Search TalentHub Paragon International University students, discover talented ICT students, and connect with top tech talent from Cambodia's leading university.",
  keywords: [
    // Primary target keywords
    "TalentHub PIU",
    "TalentHub Paragon International University", 
    "Paragon International University TalentHub",
    "TalentHub Portfolio PIU",
    // Secondary keywords
    "Paragon International University Portfolio",
    "Paragon International University Students",
    "TalentHub Portfolio",
    "ParagonIU TalentHub",
    "PIU TalentHub",
    "PIU Portfolio Platform",
    // Supporting keywords
    "ICT students Cambodia",
    "student portfolios Cambodia",
    "portfolio platform PIU",
    "tech recruitment Cambodia",
    "academic portfolios PIU",
    "career portfolios Cambodia",
    "university students Cambodia",
    "Cambodia ICT students",
    "tech talent Cambodia",
    "Paragon University students",
    "student search PIU",
    "university portfolio platform Cambodia",
    "Cambodia university student directory"
  ],
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
    title: "TalentHub PIU - Paragon International University Portfolio Platform",
    description: "Official TalentHub Paragon International University platform. Discover talented ICT students and connect with Paragon International University through TalentHub PIU.",
    siteName: "TalentHub PIU",
    images: [
      {
        url: "https://talenthub-liart.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TalentHub PIU - Paragon International University Portfolio Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "TalentHub PIU - Paragon International University Portfolio Platform",
    description: "Official TalentHub Paragon International University platform. Discover talented ICT students and connect with PIU through TalentHub.",
    images: ["https://talenthub-liart.vercel.app/og-image.jpg"],
  },
  verification: {
    google: "NhFAJMnBkxDvWqZGbxMtdA95TW2DGV96hn9RaF5Wv0g",
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
  },
  // Additional metadata for better search visibility
  other: {
    "brand": "TalentHub PIU",
    "institution": "Paragon International University", 
    "platform-type": "Student Portfolio Platform",
    "target-audience": "Recruiters, Employers, ICT Industry",
    "geo.region": "KH",
    "geo.placename": "Phnom Penh",
    "geo.position": "11.5564;104.9282",
    "ICBM": "11.5564, 104.9282",
    "coverage": "Worldwide",
    "distribution": "Global",
    "rating": "General",
    "language": "English"
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
        <meta name="application-name" content="TalentHub PIU" />
        <meta name="apple-mobile-web-app-title" content="TalentHub PIU" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#2563eb" />

        {/* Enhanced brand and search meta tags */}
        <meta name="brand" content="TalentHub PIU" />
        <meta name="institution" content="Paragon International University" />
        <meta name="platform-type" content="Student Portfolio Platform" />
        <meta name="target-audience" content="Recruiters, Employers, ICT Industry, Students" />
        
        {/* Location-based meta tags */}
        <meta name="geo.region" content="KH" />
        <meta name="geo.placename" content="Phnom Penh" />
        <meta name="geo.position" content="11.5564;104.9282" />
        <meta name="ICBM" content="11.5564, 104.9282" />
        
        {/* Classification meta tags */}
        <meta name="classification" content="education, portfolio, university, Cambodia" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Additional alternate names for search engines */}
        <link rel="alternate" hrefLang="en" href="https://talenthub-liart.vercel.app" />
      </head>
      <body className={`${ubuntuFont.className} bg-[#E8E8E8]`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}