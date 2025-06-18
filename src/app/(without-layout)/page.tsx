'use client';

import React from 'react';
import AppBar from './appbar';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#E8E8E8] p-40 h-screen overflow-hidden">
            <AppBar />
            <div className='items-center justify-center h-screen p-4'>
                <div className='flex justify-center items-center mb-4'>
                    <div className=''>
                        <p className='text-3xl font-bold text-gray-800'>
                            TalentHub, A Web Platform for <span className='text-blue-600'>Paragon International University</span> ICT Students to Create and Explore Academic and Career Portfolios
                        </p>
                        <div className='mt-4 text-md text-gray-600'>
                            <p>
                                Are you a recruiter looking for talented students? You are in the right place! TalentHub is designed to help you find and connect with the best ICT students from Paragon International University.
                            </p>
                            <button
                                className='mt-4 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 cursor-pointer transition-colors duration-300 flex items-center justify-center group'
                                onClick={() => window.location.href = '/home'}
                            >
                                Find Students
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center mb-4">
                        <img
                            src="/PIULogo.svg"
                            alt="Paragon IU Logo"
                            className="w-100 h-100 mx-auto mb-4"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}