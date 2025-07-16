'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Type definitions for structured data
interface StructuredDataWebSite {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    url: string;
    alternateName: string[];
    publisher: {
        "@type": string;
        name: string;
        alternateName: string[];
        url: string;
    };
    potentialAction: {
        "@type": string;
        target: {
            "@type": string;
            urlTemplate: string;
        };
        "query-input": string;
    };
}

interface StructuredDataOrganization {
    "@context": string;
    "@type": string;
    name: string;
    alternateName: string[];
    url: string;
    address: {
        "@type": string;
        addressCountry: string;
        addressLocality: string;
    };
    description: string;
}

interface StructuredDataWebApplication {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    url: string;
    applicationCategory: string;
    operatingSystem: string;
    offers: {
        "@type": string;
        price: string;
        priceCurrency: string;
    };
    applicationSubCategory: string;
}

interface StructuredDataFAQ {
    "@context": string;
    "@type": string;
    mainEntity: Array<{
        "@type": string;
        name: string;
        acceptedAnswer: {
            "@type": string;
            text: string;
        };
    }>;
}

// Dynamically import AppBar to avoid SSR issues
const AppBar = dynamic(() => import('./appbar'), {
    ssr: false,
    loading: () => (
        <div className="h-16 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center justify-center h-full">
                <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
            </div>
        </div>
    )
});

export default function LandingPage() {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [imageError, setImageError] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const structuredData: StructuredDataWebSite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "TalentHub - Paragon International University Portfolio Platform",
        "description": "TalentHub is the premier web platform for Paragon International University ICT students to create and explore academic and career portfolios. Connect with talented students and showcase your skills.",
        "url": "https://talenthub.paragoniu.app",
        "alternateName": [
            "TalentHub Portfolio",
            "TalentHub Platform",
            "Paragon University Portfolio",
            "Paragon International University TalentHub",
            "Paragon International University Portfolio",
            "TalentHub Paragon International University",
            "TalentHub PIU"
        ],
        "publisher": {
            "@type": "Organization",
            "name": "Paragon International University",
            "alternateName": ["ParagonIU", "Paragon University", "PIU"],
            "url": "https://paragoniu.edu.kh"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://talenthub.paragoniu.app/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    const organizationSchema: StructuredDataOrganization = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Paragon International University",
        "alternateName": ["ParagonIU", "Paragon University", "PIU"],
        "url": "https://paragoniu.edu.kh",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "KH",
            "addressLocality": "Phnom Penh"
        },
        "description": "Leading international university in Cambodia offering ICT and technology programs"
    };

    const webApplicationSchema: StructuredDataWebApplication = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "TalentHub Portfolio Platform",
        "description": "Web platform for Paragon International University students to create academic and career portfolios",
        "url": "https://talenthub.paragoniu.app",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "applicationSubCategory": "Student Portfolio Platform"
    };

    const faqSchema: StructuredDataFAQ = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is TalentHub PIU?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "TalentHub PIU is the official portfolio platform for Paragon International University students. It allows ICT students to showcase their academic achievements, projects, and skills to potential employers and recruiters."
                }
            },
            {
                "@type": "Question",
                "name": "How do I search for Paragon International University students on TalentHub?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can search for Paragon International University students by visiting the search page and entering the student's name."
                }
            },
            {
                "@type": "Question",
                "name": "Is TalentHub the Paragon International University portfolio platform?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, TalentHub is the portfolio platform for Paragon International University ICT students to create and share their academic and career portfolios."
                }
            }
        ]
    };

    const handleSearchClick = (): void => {
        router.push('/search');
    };

    const handleBrowseClick = (): void => {
        router.push('/home');
    };

    const handleImageError = (): void => {
        console.warn('PIU Logo failed to load');
        setImageError(true);
    };

    // Don't render anything until mounted to prevent hydration issues
    if (!isMounted) {
        return null;
    }

    return (
        <div className=" bg-[#E8E8E8]">
            {/* Structured Data - Only add after mounting */}
            {isMounted && (
                <>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />

                    <meta name="google-site-verification" content="07Xjr-50lKVhLxq03j5Um0V37gCVT4-7pw9_mpHJ2W0" />
                </>
            )}

            {/* Fixed AppBar */}
            <AppBar />

            {/* Mobile/Small Screen Warning (below 650px) */}
            <div className="block min-[650px]:hidden min-h-screen">
                <div className="pt-16 flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto">
                        <div className="mb-4">
                            <svg
                                className="w-16 h-16 mx-auto text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Desktop Required
                        </h2>
                        <p className="text-gray-600 mb-4">
                            TalentHub PIU - Paragon International University Portfolio Platform requires a larger screen. Please use a desktop or tablet to access Paragon International University student portfolios.
                        </p>
                        <div className="text-sm text-gray-500">
                            Current screen size is too small
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Content */}
            <div className="hidden min-[650px]:block">
                <div className=" lg:p-40 md:p-20 md:pt-36 sm:p-12 sm:pt-28 p-6">
                    <main className="flex items-center justify-center px-4">
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 w-full max-w-7xl">
                            {/* Content Section */}
                            <div className="flex-1 max-w-3xl">
                                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 leading-tight mb-6">
                                    TalentHub PIU: {' '}
                                    <span className="text-blue-600">Paragon International University</span>{' '}
                                    Portfolio Platform
                                </h1>

                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg lg:text-xl font-semibold mb-3 text-gray-700">
                                            Discover Paragon International University Students on TalentHub PIU
                                        </h2>
                                        <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                                            TalentHub PIU serves as the official bridge between Paragon International University's exceptional ICT education and industry needs. Our TalentHub Paragon International University platform showcases student achievements, technical skills, and professional projects.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-base lg:text-lg text-gray-700 mb-2 font-semibold">
                                            Search TalentHub PIU Student Directory
                                        </h3>
                                        <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                                            Use TalentHub PIU's powerful search to find specific Paragon International University students by name, major, or skills. Our TalentHub Paragon International University platform makes it easy to discover talented individuals and connect with the perfect candidate for your organization. Start your search today on the official TalentHub PIU platform.
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                        <button
                                            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 flex items-center justify-center group font-medium text-sm lg:text-base shadow-lg hover:shadow-xl"
                                            onClick={handleSearchClick}
                                            aria-label="Search Paragon International University students on TalentHub PIU"
                                            type="button"
                                        >
                                            Search Students
                                            <svg
                                                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                        </button>

                                        <button
                                            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-300 flex items-center justify-center group font-medium text-sm lg:text-base shadow-lg hover:shadow-xl"
                                            onClick={handleBrowseClick}
                                            aria-label="Browse all TalentHub PIU portfolios"
                                            type="button"
                                        >
                                            Browse Portfolios
                                            <svg
                                                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Logo Section */}
                            <div className="flex justify-center flex-shrink-0">
                                <div className="relative">
                                    {!imageError ? (
                                        <img
                                            src="/PIULogo.svg"
                                            alt="Paragon International University Logo - Official TalentHub PIU Portfolio Platform"
                                            className="w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain mx-auto"
                                            loading="eager"
                                            width="400"
                                            height="400"
                                            onError={handleImageError}
                                        />
                                    ) : (
                                        <div className="w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <div className="text-center text-gray-500">
                                                <svg
                                                    className="w-16 h-16 mx-auto mb-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <p className="text-sm">PIU Logo</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                {/* SEO Content - Hidden from users but visible to search engines */}
                <div className="sr-only">
                    <h2>TalentHub PIU - Paragon International University Portfolio Platform</h2>
                    <p>
                        TalentHub PIU, TalentHub Paragon International University, Paragon International University Portfolio, Paragon International University TalentHub, Paragon International University Students, TalentHub Portfolio, ParagonIU, ICT students, student portfolios, portfolio platform, academic portfolios, career portfolios, university students, Cambodia tech talent, Paragon University, student directory, tech recruitment
                    </p>

                    <h3>Search Keywords</h3>
                    <p>
                        TalentHub PIU, TalentHub Paragon International University, Paragon University TalentHub, official Paragon International University portfolio, Paragon International University student search, TalentHub student directory, Cambodia university portfolios, ICT student platform
                    </p>

                    <h3>How to Find Students</h3>
                    <p>
                        Search Paragon International University students on TalentHub PIU by visiting the search page and entering the student's name. Find specific students by name using the search function. Browse all Paragon International University portfolios on the official TalentHub PIU platform.
                    </p>
                </div>

                {/* Additional SEO sections preserved from original */}
                <section className="sr-only">
                    <h2>About TalentHub PIU</h2>
                    <p>TalentHub PIU is the official portfolio platform for Paragon International University students. Our TalentHub Paragon International University platform connects talented ICT students with career opportunities and showcases their academic achievements.</p>

                    <h3>Paragon International University Excellence</h3>
                    <p>Paragon International University is Cambodia's leading institution for ICT education. The official TalentHub PIU platform showcases the best of our students' academic and professional achievements.</p>

                    <h3>Student Search Directory</h3>
                    <p>Use TalentHub PIU to search for specific Paragon International University students by name. Our comprehensive student directory makes it easy to find and connect with talented individuals from Cambodia's premier ICT university.</p>

                    <h3>Popular Searches</h3>
                    <ul>
                        <li>TalentHub PIU - Find the official Paragon International University portfolio platform</li>
                        <li>TalentHub Paragon International University - Discover student portfolios and achievements</li>
                        <li>Paragon International University TalentHub - Access the official student directory</li>
                        <li>Paragon International University Students - Search and connect with talented individuals</li>
                        <li>Student Name Search - Use TalentHub PIU search to find specific students</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

