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
    metadataBase: new URL('https://talenthub.paragoniu.app'),
    title: {
        default: "TalentHub Paragon International University -  PIU TalentHub Portfolio Platform",
        template: "%s | TalentHub Portfolio - PIU TalentHub Paragon International University"
    },
    verification: {
        google: "07Xjr-50lKVhLxq03j5Um0V37gCVT4-7pw9_mpHJ2W0",
    },
    description: "TalentHub | A Web Platform for ParagonIU ICT Students to Create and Explore Peers’ Academic and Career Portfolios",
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
        url: "https://talenthub.paragoniu.app",
        title: "TalentHub Portfolio - PIU TalentHub Paragon International University Platform",
        description: "TalentHub | A Web Platform for ParagonIU ICT Students to Create and Explore Peers’ Academic and Career Portfolios",
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
    category: "education",
    classification: "University Portfolio Platform",
    viewport: "width=device-width, initial-scale=1",
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
            	<meta name="google-site-verification" content="07Xjr-50lKVhLxq03j5Um0V37gCVT4-7pw9_mpHJ2W0" />
                
                {/* Enhanced SEO Meta Tags */}
                <meta name="description" content="TalentHub Paragon International University is the official PIU TalentHub portfolio platform. Discover TalentHub Portfolio showcasing talented ICT students from Cambodia's leading university." />
                <meta name="keywords" content="TalentHub Paragon International University, TalentHub Portfolio, PIU TalentHub, TalentHub PIU, Paragon International University TalentHub, Cambodia ICT students, PIU student directory" />
                
                {/* Robots and Indexing */}
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow" />
                
                {/* Enhanced brand and platform identification */}
                <meta name="application-name" content="TalentHub Portfolio" />
                <meta name="apple-mobile-web-app-title" content="TalentHub PIU" />
                <meta name="brand" content="TalentHub Portfolio" />
                <meta name="institution" content="Paragon International University" />
                <meta name="platform-type" content="Official University Student Portfolio Platform" />
                <meta name="platform-category" content="Educational Technology" />
                <meta name="target-audience" content="Recruiters, Employers, ICT Industry, Students, HR Professionals" />
                
                {/* Enhanced location and regional targeting */}
                <meta name="geo.region" content="KH" />
                <meta name="geo.country" content="Cambodia" />
                <meta name="geo.placename" content="Phnom Penh, Cambodia" />
                <meta name="geo.position" content="11.5564;104.9282" />
                <meta name="ICBM" content="11.5564, 104.9282" />
                <meta name="location" content="Phnom Penh, Cambodia" />
                
                {/* Enhanced classification and categorization */}
                <meta name="classification" content="education, portfolio, university, Cambodia, ICT, technology" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />
                <meta name="subject" content="Student Portfolio Platform, University Directory, ICT Education" />
                <meta name="topic" content="TalentHub Paragon International University Student Portfolios" />

                {/* Dublin Core metadata for academic institutions */}
                <meta name="DC.title" content="TalentHub Portfolio - Official PIU TalentHub Platform" />
                <meta name="DC.creator" content="Paragon International University" />
                <meta name="DC.subject" content="Student Portfolio Platform, University Directory, ICT Talent" />
                <meta name="DC.description" content="Official TalentHub Paragon International University platform for student portfolios" />
                <meta name="DC.publisher" content="PIU TalentHub" />
                <meta name="DC.contributor" content="Paragon International University Students" />
                <meta name="DC.date" content="2025" />
                <meta name="DC.type" content="Interactive Resource" />
                <meta name="DC.format" content="text/html" />
                <meta name="DC.identifier" content="https://talenthub.paragoniu.app" />
                <meta name="DC.source" content="https://paragoniu.edu.kh" />
                <meta name="DC.language" content="en-US" />
                <meta name="DC.relation" content="https://paragoniu.edu.kh" />
                <meta name="DC.coverage" content="Cambodia, Global" />
                <meta name="DC.rights" content="© 2025 Paragon International University" />

                {/* Open Graph Enhanced */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://talenthub.paragoniu.app" />
                <meta property="og:title" content="TalentHub Portfolio - Official PIU TalentHub Paragon International University Platform" />
                <meta property="og:description" content="Discover TalentHub Portfolio - the official PIU TalentHub platform showcasing talented Paragon International University ICT students from Cambodia's leading technology university." />
                <meta property="og:image" content="https://talenthub.paragoniu.app/og-image.jpg" />
                <meta property="og:image:alt" content="TalentHub Portfolio - Official PIU TalentHub Platform" />
                <meta property="og:site_name" content="TalentHub Portfolio - PIU TalentHub" />
                <meta property="og:locale" content="en_US" />
                
                {/* Twitter Enhanced */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@ParagonIU" />
                <meta name="twitter:title" content="TalentHub Portfolio - PIU TalentHub Platform" />
                <meta name="twitter:description" content="Official TalentHub Paragon International University platform for discovering talented ICT students." />
                <meta name="twitter:image" content="https://talenthub.paragoniu.app/og-image.jpg" />
                <meta name="twitter:image:alt" content="TalentHub Portfolio Platform" />
                
                {/* Canonical URL */}
                <link rel="canonical" href="https://talenthub.paragoniu.app" />
                
                {/* Language and Regional Targeting */}
                <link rel="alternate" hrefLang="en" href="https://talenthub.paragoniu.app" />
                <link rel="alternate" hrefLang="en-US" href="https://talenthub.paragoniu.app" />
                <link rel="alternate" hrefLang="x-default" href="https://talenthub.paragoniu.app" />
                
                {/* Icons and Manifest */}
                <link rel="icon" href="/talenthublogo-sm.webp" />
                <link rel="apple-touch-icon" href="/talenthublogo-sm.png" />
                <link rel="manifest" href="/site.webmanifest" />
                
                {/* Performance optimization */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="//fonts.googleapis.com" />
                <link rel="dns-prefetch" href="//fonts.gstatic.com" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                
                {/* PWA and Mobile App Meta Tags */}
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#2563eb" />
                <meta name="theme-color" content="#2563eb" />
                
                {/* Author and Copyright */}
                <meta name="author" content="Paragon International University" />
                <meta name="publisher" content="TalentHub Portfolio - PIU TalentHub" />
                <meta name="copyright" content="© 2025 Paragon International University" />
                
                <title>TalentHub Portfolio - Official PIU TalentHub Paragon International University Platform</title>
            </head>
            <body className={`${ubuntuFont.className} bg-[#E8E8E8]`}>
                {/* SEO-friendly hidden content for crawlers */}
                <div className="sr-only">
                    <h1>TalentHub Portfolio - Official PIU TalentHub Platform for Paragon International University</h1>
                    <p>Welcome to TalentHub Paragon International University - the premier PIU TalentHub platform connecting talented ICT students with global opportunities. Discover comprehensive student portfolios from Cambodia's leading technology university.</p>
                    <nav aria-label="Main Navigation">
                        <ul>
                            <li><a href="/">TalentHub Portfolio Home</a></li>
                            <li><a href="/search">Search PIU Students</a></li>
                            <li><a href="/home">Browse TalentHub Portfolios</a></li>
                        </ul>
                    </nav>
                </div>

                <SessionProvider>
                    {/* Desktop/Tablet View (>= 650px) */}
                    <div className="hidden min-[650px]:block">
                        <Appbar />
                        <main role="main" aria-label="TalentHub Portfolio Main Content">
                            {children}
                        </main>
                    </div>
                    
                    {/* Mobile Warning (< 650px) */}
                    <div className="block min-[650px]:hidden min-h-screen flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto">
                            <div className="mb-4">
                                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                Desktop Required for TalentHub Portfolio
                            </h2>
                            <p className="text-gray-600 mb-4">
                                TalentHub Portfolio - PIU TalentHub Paragon International University platform requires a larger screen for optimal experience. Please use a desktop or tablet with a screen width of at least 650px to access our comprehensive student directory and portfolio features.
                            </p>
                            <div className="text-sm text-gray-500">
                                Current screen size is too small for TalentHub Portfolio
                            </div>
                            <div className="mt-4">
                                <p className="text-xs text-gray-400">
                                    Visit talenthub.paragoniu.app on desktop or tablet to explore PIU TalentHub
                                </p>
                            </div>
                        </div>
                    </div>
                </SessionProvider>
                
                {/* Enhanced SEO Footer Content */}
                <footer className="sr-only" role="contentinfo">
                    <h2>TalentHub Portfolio - Official PIU TalentHub Platform Information</h2>
                    <address>
                        TalentHub Portfolio<br/>
                        Official PIU TalentHub Platform<br/>
                        Paragon International University<br/>
                        Phnom Penh, Cambodia<br/>
                        Website: talenthub.paragoniu.app
                    </address>
                    <p>© 2025 TalentHub Portfolio - Official PIU TalentHub Platform by Paragon International University. Connecting Cambodia's premier ICT talent with global opportunities.</p>
                    
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/">TalentHub Portfolio Home</a></li>
                        <li><a href="/search">Search PIU TalentHub Directory</a></li>
                        <li><a href="/home">Browse Student Portfolios</a></li>
                    </ul>
                    
                    <h3>Keywords</h3>
                    <p>TalentHub Paragon International University, TalentHub Portfolio, PIU TalentHub, TalentHub PIU, Paragon International University TalentHub, Cambodia ICT students, PIU student directory, official university portfolio platform</p>
                </footer>
            </body>
        </html>
    );
}
