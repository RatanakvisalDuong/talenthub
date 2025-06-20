'use client';

import React from 'react';
import Head from 'next/head';
import AppBar from './appbar';

export default function LandingPage() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "TalentHub - Paragon International University Portfolio Platform",
        "description": "TalentHub is the premier web platform for Paragon International University ICT students to create and explore academic and career portfolios. Connect with talented students and showcase your skills.",
        "url": "https://talenthub-liart.vercel.app",
        "alternateName": [
            "TalentHub Portfolio", 
            "TalentHub Platform", 
            "Paragon University Portfolio",
            "Paragon International University TalentHub",
            "Paragon International University Portfolio",
            "TalentHub Paragon International University"
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
                "urlTemplate": "https://talenthub-liart.vercel.app/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    const organizationSchema = {
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

    const webApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "TalentHub Portfolio Platform",
        "description": "Web platform for Paragon International University students to create academic and career portfolios",
        "url": "https://talenthub-liart.vercel.app",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "applicationSubCategory": "Student Portfolio Platform"
    };

    // FAQ Schema for better search understanding
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is TalentHub?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "TalentHub is the official portfolio platform for Paragon International University students. It allows ICT students to showcase their academic achievements, projects, and skills to potential employers and recruiters."
                }
            },
            {
                "@type": "Question", 
                "name": "How do I search for Paragon International University students on TalentHub?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can search for Paragon International University students by visiting talenthub-liart.vercel.app/search and entering the student's name or browsing by major and skills."
                }
            },
            {
                "@type": "Question",
                "name": "Is TalentHub the official Paragon International University portfolio platform?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, TalentHub is the official portfolio platform for Paragon International University ICT students to create and share their academic and career portfolios."
                }
            }
        ]
    };
    
    return (
        <>
            <Head>
                {/* Enhanced Primary Meta Tags */}
                <title>TalentHub - Paragon International University Portfolio | Official Student Portfolio Platform</title>
                <meta name="title" content="TalentHub - Paragon International University Portfolio | Official Student Portfolio Platform" />
                <meta name="description" content="TalentHub is the official Paragon International University portfolio platform. Search and discover talented ICT students from Paragon International University. Connect with Paragon International University TalentHub for student portfolios and recruitment." />
                <meta name="keywords" content="TalentHub, Paragon International University Portfolio, Paragon International University TalentHub, Paragon International University Students, TalentHub Portfolio, ParagonIU, ICT students, student portfolios, portfolio platform, Paragon University, Cambodia university students, tech recruitment, academic portfolios, career portfolios, university students, Cambodia ICT, tech talent" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <meta name="author" content="Paragon International University" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

                {/* Enhanced Brand Meta Tags */}
                <meta name="brand" content="TalentHub" />
                <meta name="institution" content="Paragon International University" />
                <meta name="platform-type" content="Student Portfolio Platform" />
                <meta name="target-audience" content="Recruiters, Employers, ICT Industry" />

                {/* Enhanced Open Graph Tags */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://talenthub-liart.vercel.app/" />
                <meta property="og:title" content="TalentHub - Paragon International University Portfolio Platform" />
                <meta property="og:description" content="Official Paragon International University portfolio platform. Discover talented ICT students and connect with Paragon International University TalentHub." />
                <meta property="og:image" content="https://talenthub-liart.vercel.app/og-image.jpg" />
                <meta property="og:site_name" content="TalentHub" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter Cards */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://talenthub-liart.vercel.app/" />
                <meta property="twitter:title" content="TalentHub - Paragon International University Portfolio Platform" />
                <meta property="twitter:description" content="Official Paragon International University portfolio platform. Discover talented ICT students." />
                <meta property="twitter:image" content="https://talenthub-liart.vercel.app/og-image.jpg" />

                {/* Additional SEO Meta Tags */}
                <meta name="geo.region" content="KH" />
                <meta name="geo.placename" content="Phnom Penh" />
                <meta name="geo.position" content="11.5564;104.9282" />
                <meta name="ICBM" content="11.5564, 104.9282" />

                {/* Brand and Education specific meta tags */}
                <meta name="classification" content="education, portfolio, university" />
                <meta name="category" content="Education" />
                <meta name="coverage" content="Worldwide" />
                <meta name="distribution" content="Global" />
                <meta name="rating" content="General" />

                {/* Canonical URL */}
                <link rel="canonical" href="https://talenthub-liart.vercel.app/" />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

                {/* Enhanced Structured Data */}
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
            </Head>

            {/* Mobile/Small Screen Warning (below 650px) */}
            <div className="block min-[650px]:hidden min-h-screen flex items-center justify-center p-4">
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
                        TalentHub - Paragon International University Portfolio Platform requires a larger screen. Please use a desktop or tablet to access Paragon International University student portfolios.
                    </p>
                    <div className="text-sm text-gray-500">
                        Current screen size is too small
                    </div>
                </div>
            </div>

            {/* Main Content (650px and above) */}
            <div className="hidden min-[650px]:block min-h-screen bg-[#E8E8E8] lg:p-40 md:p-20 sm:p-10 p-6 h-screen overflow-y-auto">
                <AppBar />

                {/* Main Content with enhanced SEO headings */}
                <main className='items-center justify-center h-screen p-4'>
                    <div className='flex flex-col lg:flex-row justify-center items-center mb-4 gap-8'>
                        <div className='flex-1 max-w-3xl'>
                            <h1 className='text-2xl lg:text-3xl font-bold text-gray-800 leading-tight sm:mt-8 lg:mt-0'>
                                TalentHub: Official <span className='text-blue-600'>Paragon International University Portfolio</span> Platform
                            </h1>

                            <div className='mt-4 text-sm lg:text-md text-gray-600'>
                                <h2 className='text-lg lg:text-xl font-semibold mb-2 text-gray-700'>
                                    Discover Paragon International University Students on TalentHub
                                </h2>
                                <p className='leading-relaxed'>
                                    Welcome to TalentHub, the official Paragon International University portfolio platform. As the premier destination for Paragon International University TalentHub experience, we connect talented ICT students with industry opportunities. Explore comprehensive student portfolios from Paragon International University's brightest minds and discover Cambodia's next generation of tech professionals.
                                </p>

                                <div className='mt-3'>
                                    <h3 className='text-base lg:text-lg font-medium text-gray-700 mb-2'>Why Choose Paragon International University TalentHub?</h3>
                                    <p className='text-sm leading-relaxed'>
                                        TalentHub serves as the official bridge between Paragon International University's exceptional ICT education and industry needs. Our Paragon International University portfolio showcases student achievements, technical skills, and professional projects. Whether you're searching for specific students or browsing our comprehensive directory, TalentHub makes finding Paragon International University students effortless.
                                    </p>
                                </div>

                                <div className='mt-3'>
                                    <h3 className='text-base lg:text-lg font-medium text-gray-700 mb-2'>Search Paragon International University Students</h3>
                                    <p className='text-sm leading-relaxed'>
                                        Use TalentHub's powerful search to find specific Paragon International University students by name, major, or skills. Our platform makes it easy to discover talented individuals and connect with the perfect candidate for your organization. Start your search today on the official Paragon International University TalentHub platform.
                                    </p>
                                </div>

                                <div className="flex gap-4 mt-6">
                                    <button
                                        className='px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer transition-colors duration-300 flex items-center justify-center group font-medium text-sm lg:text-base'
                                        onClick={() => window.location.href = '/search'}
                                        aria-label="Search Paragon International University students on TalentHub"
                                    >
                                        Search Students
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                    
                                    <button
                                        className='px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 cursor-pointer transition-colors duration-300 flex items-center justify-center group font-medium text-sm lg:text-base'
                                        onClick={() => window.location.href = '/home'}
                                        aria-label="Browse all Paragon International University portfolios on TalentHub"
                                    >
                                        Browse Portfolios
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center flex-shrink-0">
                            <img
                                src="/PIULogo.svg"
                                alt="Paragon International University Logo - Official TalentHub Portfolio Platform"
                                className="w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 mx-auto"
                                loading="eager"
                                width="400"
                                height="400"
                            />
                        </div>
                    </div>
                </main>

                {/* Enhanced SEO content for better indexing */}
                <div className="sr-only">
                    <h2>TalentHub - Paragon International University Portfolio Platform</h2>
                    <p>
                        TalentHub, Paragon International University Portfolio, Paragon International University TalentHub, Paragon International University Students, TalentHub Portfolio, ParagonIU, ICT students, student portfolios, portfolio platform, academic portfolios, career portfolios, university students, Cambodia tech talent, Paragon University, student directory, tech recruitment
                    </p>
                    <h3>Search Keywords</h3>
                    <p>
                        TalentHub Paragon International University, Paragon University TalentHub, official Paragon International University portfolio, Paragon International University student search, TalentHub student directory, Cambodia university portfolios, ICT student platform
                    </p>
                    <h3>How to Find Students</h3>
                    <p>
                        Search Paragon International University students on TalentHub by visiting talenthub-liart.vercel.app/search. Find specific students by name using the search function. Browse all Paragon International University portfolios on the official TalentHub platform.
                    </p>
                </div>

                {/* Additional semantic content for search engines */}
                <section className="sr-only">
                    <h2>About TalentHub Paragon International University</h2>
                    <p>TalentHub is the official portfolio platform for Paragon International University students. Our Paragon International University TalentHub platform connects talented ICT students with career opportunities and showcases their academic achievements.</p>
                    
                    <h3>Paragon International University Excellence</h3>
                    <p>Paragon International University is Cambodia's leading institution for ICT education. The official Paragon International University portfolio platform, TalentHub, showcases the best of our students' academic and professional achievements.</p>
                    
                    <h3>Student Search Directory</h3>
                    <p>Use TalentHub to search for specific Paragon International University students by name. Our comprehensive student directory makes it easy to find and connect with talented individuals from Cambodia's premier ICT university.</p>

                    <h3>Popular Searches</h3>
                    <ul>
                        <li>TalentHub - Find the official Paragon International University portfolio platform</li>
                        <li>Paragon International University Portfolio - Discover student portfolios and achievements</li>
                        <li>Paragon International University TalentHub - Access the official student directory</li>
                        <li>Paragon International University Students - Search and connect with talented individuals</li>
                        <li>Student Name Search - Use TalentHub search to find specific students: talenthub-liart.vercel.app/search?q=studentname</li>
                    </ul>
                </section>
            </div>
        </>
    );
}