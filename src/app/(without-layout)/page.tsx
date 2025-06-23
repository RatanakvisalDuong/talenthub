'use client';

import React from 'react';
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

    const faqSchema = {
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
                    "text": "You can search for Paragon International University students by visiting talenthub-liart.vercel.app/search and entering the student's name."
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
    
    return (
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
            <meta name="google-site-verification" content="NhFAJMnBkxDvWqZGbxMtdA95TW2DGV96hn9RaF5Wv0g" />

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
                        TalentHub PIU - Paragon International University Portfolio Platform requires a larger screen. Please use a desktop or tablet to access Paragon International University student portfolios.
                    </p>
                    <div className="text-sm text-gray-500">
                        Current screen size is too small
                    </div>
                </div>
            </div>

            <div className="hidden min-[650px]:block min-h-screen bg-[#E8E8E8] lg:p-40 md:p-20 sm:pt-30 p-6 h-screen overflow-y-auto">
                <AppBar />
                <main className='items-center justify-center h-screen px-4'>
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
                        <div className='flex-1 max-w-3xl'>
                            <h1 className='text-2xl lg:text-3xl font-bold text-gray-800 leading-tight '>
                                TalentHub PIU: Official <span className='text-blue-600'>Paragon International University</span> Portfolio Platform
                            </h1>

                            <div className='mt-4 text-sm lg:text-md text-gray-600'>
                                <h2 className='text-lg lg:text-xl font-semibold mb-2 text-gray-700'>
                                    Discover Paragon International University Students on TalentHub PIU
                                </h2>

                                <div className='mt-3'>
                                    <p className='text-sm leading-relaxed'>
                                        TalentHub PIU serves as the official bridge between Paragon International University's exceptional ICT education and industry needs. Our TalentHub Paragon International University platform showcases student achievements, technical skills, and professional projects. 
                                    </p>
                                </div>

                                <div className='mt-3'>
                                    <h3 className='text-base lg:text-lg text-gray-700 mb-2 font-bold'>Search TalentHub PIU Student Directory</h3>
                                    <p className='text-sm leading-relaxed'>
                                        Use TalentHub PIU's powerful search to find specific Paragon International University students by name, major, or skills. Our TalentHub Paragon International University platform makes it easy to discover talented individuals and connect with the perfect candidate for your organization. Start your search today on the official TalentHub PIU platform.
                                    </p>
                                </div>

                                <div className="flex gap-4 mt-6">
                                    <button
                                        className='px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer transition-colors duration-300 flex items-center justify-center group font-medium text-sm lg:text-base'
                                        onClick={() => window.location.href = '/search'}
                                        aria-label="Search Paragon International University students on TalentHub PIU"
                                    >
                                        Search Students
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                    
                                    <button
                                        className='px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 cursor-pointer transition-colors duration-300 flex items-center justify-center group font-medium text-sm lg:text-base'
                                        onClick={() => window.location.href = '/home'}
                                        aria-label="Browse all TalentHub PIU portfolios"
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
                                alt="Paragon International University Logo - Official TalentHub PIU Portfolio Platform"
                                className="w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 mx-auto"
                                loading="eager"
                                width="400"
                                height="400"
                            />
                        </div>
                    </div>
                </main>

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
                        Search Paragon International University students on TalentHub PIU by visiting talenthub-liart.vercel.app/search. Find specific students by name using the search function. Browse all Paragon International University portfolios on the official TalentHub PIU platform.
                    </p>
                </div>

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
                        <li>Student Name Search - Use TalentHub PIU search to find specific students: talenthub-liart.vercel.app/search?q=studentname</li>
                    </ul>
                </section>
            </div>
        </>
    );
}