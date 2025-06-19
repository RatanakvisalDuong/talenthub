'use client';

import React from 'react';
import Head from 'next/head';
import AppBar from './appbar';

export default function LandingPage() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "TalentHub - Paragon International University Portfolio Platform",
        "description": "Web platform for Paragon International University ICT students to create and explore academic and career portfolios. Connect with talented students and showcase your skills.",
        "url": "https://talenthub.paragoniu.app",
        "publisher": {
            "@type": "Organization",
            "name": "Paragon International University",
        }
    };
    return (
        <>
            <Head>
                {/* Primary Meta Tags */}
                <title>TalentHub - Paragon International University ICT Student Portfolio Platform</title>
                <meta name="title" content="TalentHub - Paragon International University ICT Student Portfolio Platform" />
                <meta name="description" content="Discover talented ICT students from Paragon International University. TalentHub is the premier web platform for students to showcase academic and career portfolios. Perfect for recruiters seeking top tech talent." />
                <meta name="keywords" content="TalentHub, Paragon International University, ICT students, portfolio platform, student portfolios, tech recruitment, academic portfolios, career portfolios, university students, Cambodia ICT, tech talent" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <meta name="author" content="Paragon International University" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

                {/* Additional SEO Meta Tags */}
                <meta name="geo.region" content="KH" />
                <meta name="geo.placename" content="Phnom Penh" />
                <meta name="geo.position" content="11.5564;104.9282" />
                <meta name="ICBM" content="11.5564, 104.9282" />

                {/* Canonical URL */}
                <link rel="canonical" href="https://talenthub.paragoniu.app/" />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>

            <div className="min-h-screen bg-[#E8E8E8] p-40 h-screen overflow-hidden">
                <AppBar />

                {/* Main Content with SEO-optimized headings */}
                <main className='items-center justify-center h-screen p-4'>
                    <div className='flex justify-center items-center mb-4'>
                        <div className=''>
                            <h1 className='text-3xl font-bold text-gray-800'>
                                TalentHub: Premier Web Platform for <span className='text-blue-600'>Paragon International University</span> ICT Students to Create and Explore Academic and Career Portfolios
                            </h1>

                            <div className='mt-4 text-md text-gray-600'>
                                <h2 className='text-xl font-semibold mb-2 text-gray-700'>
                                    Connect with Top ICT Talent from Cambodia's Leading University
                                </h2>
                                <p>
                                    Are you a recruiter looking for talented ICT students? You are in the right place! TalentHub is specifically designed to help employers and recruiters discover and connect with the most skilled Information and Communication Technology students from Paragon International University. Our platform showcases comprehensive academic achievements, technical skills, and professional portfolios.
                                </p>

                                {/* Additional SEO content */}
                                <div className='mt-3'>
                                    <h3 className='text-lg font-medium text-gray-700 mb-2'>Why Choose TalentHub?</h3>
                                    <p className='text-sm'>
                                        TalentHub serves as the bridge between Cambodia's top ICT education and industry needs. Students from Paragon International University showcase their projects, certifications, internship experiences, and technical competencies through detailed portfolios. Find your next software developer, web designer, data analyst, or IT specialist today.
                                    </p>
                                </div>

                                <button
                                    className='mt-6 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 cursor-pointer transition-colors duration-300 flex items-center justify-center group font-medium'
                                    onClick={() => window.location.href = '/home'}
                                    aria-label="Browse ICT student portfolios from Paragon International University"
                                >
                                    Discover ICT Student Portfolios
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center mb-4">
                            <img
                                src="/PIULogo.svg"
                                alt="Paragon International University Logo - Premier ICT Education in Cambodia"
                                className="w-100 h-100 mx-auto mb-4"
                                loading="eager"
                                width="400"
                                height="400"
                            />
                        </div>
                    </div>
                </main>

                {/* Hidden SEO content for better indexing */}
                <div className="sr-only">
                    <h2>Keywords for Search Engines</h2>
                    <p>
                        TalentHub, A Web Platform for ParagonIU ICT Students to Create and Explore Academic and Career Portfolios
                    </p>
                </div>
            </div>
        </>
    );
}