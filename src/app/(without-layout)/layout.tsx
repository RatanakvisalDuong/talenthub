// app/layout.tsx - Enhanced SEO Layout
import { Ubuntu } from "next/font/google";
import "../globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import { Metadata } from "next";

const ubuntuFont = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  // metadataBase: new URL('https://talenthub.paragoniu.app'),
  metadataBase: new URL('https://talenthub-liart.vercel.app'),
  title: {
    default: "TalentHub Paragon International University - Official PIU TalentHub Portfolio Platform",
    template: "%s | TalentHub Portfolio - PIU TalentHub Paragon International University"
  },
  description: "TalentHub Paragon International University is the official PIU TalentHub portfolio platform. Discover TalentHub Portfolio showcasing talented ICT students from Cambodia's leading university. Search PIU TalentHub student directory and connect with top tech talent.",
  keywords: [
    // Primary SEO targets
    "TalentHub Paragon International University",
    "TalentHub Portfolio",
    "PIU TalentHub",
    "TalentHub PIU",
    "Paragon International University TalentHub",
    "TalentHub Platform PIU",
    "PIU Portfolio Platform",
    "Paragon University TalentHub",
    // Secondary keywords
    "TalentHub Paragon University",
    "official PIU TalentHub",
    "TalentHub Portfolio platform",
    "Paragon International University Portfolio",
    "PIU student directory",
    "TalentHub student platform",
    // Supporting long-tail keywords
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
  verification: {
    google: "NhFAJMnBkxDvWqZGbxMtdA95TW2DGV96hn9RaF5Wv0g",
  },
  // Enhanced metadata for better search visibility
  other: {
    "brand": "TalentHub Portfolio",
    "institution": "Paragon International University", 
    "platform-type": "Official University Student Portfolio Platform",
    "target-audience": "Recruiters, Employers, ICT Industry, Students, HR Professionals",
    "geo.region": "KH",
    "geo.placename": "Phnom Penh, Cambodia",
    "geo.position": "11.5564;104.9282",
    "ICBM": "11.5564, 104.9282",
    "coverage": "Worldwide",
    "distribution": "Global",
    "rating": "General",
    "language": "English",
    "DC.title": "TalentHub Portfolio - Official PIU TalentHub Platform",
    "DC.creator": "Paragon International University",
    "DC.subject": "Student Portfolio Platform, University Directory, ICT Talent",
    "DC.description": "Official TalentHub Paragon International University platform",
    "DC.publisher": "PIU TalentHub",
    "DC.contributor": "Paragon International University Students",
    "DC.date": "2025",
    "DC.type": "Interactive Resource",
    "DC.format": "text/html",
    "DC.identifier": "https://talenthub.paragoniu.app",
    "DC.source": "https://paragoniu.edu.kh",
    "DC.language": "en-US",
    "DC.relation": "https://paragoniu.edu.kh",
    "DC.coverage": "Cambodia, Global",
    "DC.rights": "© 2025 Paragon International University"
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

        {/* Enhanced brand and search meta tags */}
        <meta name="brand" content="TalentHub" />
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