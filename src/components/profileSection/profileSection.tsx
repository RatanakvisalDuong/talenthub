'use client';

import React from 'react';
import Image from 'next/image';
import { PencilSquareIcon, ShareIcon } from '@heroicons/react/20/solid';
import WorkingStatusBar from '../workingStatus/workingStatusBar';
import { signIn, useSession } from 'next-auth/react';
import { Portfolio } from '@/app/type/portfolio';

interface Props {
    owner: boolean;
    portfolio: Portfolio;
    getMajorName: string;
    convertPhoneNumberSpacing: (phone: string) => string;
    toggleSharePortfolio: () => void;
    toggleEditPortfolioDialog?: () => void;
}

const ProfileSummarySection: React.FC<Props> = ({
    owner,
    portfolio,
    getMajorName,
    convertPhoneNumberSpacing,
    toggleSharePortfolio,
    toggleEditPortfolioDialog,
}) => {
    const session = useSession();
    const handleSignIn = async () => {
        const result = await signIn('google', { redirect: false });
    };
    return (
        <div className="flex flex-col lg:flex-row justify-between gap-2 sm:gap-3 lg:gap-0 h-auto lg:h-[240px]">
            {/* Main Profile Section */}
            <div className="w-full lg:w-[68%] bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-3 md:p-4 overflow-y-auto">
                <div className="flex flex-col sm:flex-row items-center justify-start h-full gap-3 sm:gap-4">
                    {/* Profile Image and Status */}
                    <div className="w-full sm:w-[40%] relative flex items-center justify-center">
                        <div className="absolute top-0 right-0 z-10 -translate-y-1/2 translate-x-1/2 sm:translate-x-0">
                            {portfolio.portfolio.role_id === 1 ? (
                                portfolio.portfolio.working_status != null ? (
                                    <WorkingStatusBar status={portfolio.portfolio.working_status} />
                                ) : (
                                    <WorkingStatusBar status={2} />
                                )
                            ) : (
                                <div className="h-5 sm:h-6 flex justify-center items-center text-white text-[10px] sm:text-[12px] rounded-lg sm:rounded-xl bg-blue-500 px-2 py-1">
                                    Endorser
                                </div>
                            )}
                        </div>
                        <div className="h-[120px] w-[120px] sm:h-[140px] sm:w-[140px] md:h-[160px] md:w-[160px] lg:h-[90%] lg:w-[90%] rounded-xl overflow-hidden mx-auto flex items-center justify-center">
                            <Image
                                src={
                                    portfolio.portfolio.photo ||
                                    'https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg'
                                }
                                alt="placeholder"
                                width={190}
                                height={190}
                                className="w-[200px] h-[200px] aspect-square object-cover border border-gray-200 shadow-sm rounded-xl"
                            />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="w-full sm:w-[60%] h-full flex flex-col justify-center text-center sm:text-left">
                        <p className="text-black font-bold text-base sm:text-lg md:text-xl">{portfolio.portfolio.user_name}</p>
                        <div className="w-16 sm:w-20 bg-[#dfdfdf] h-[2px] mt-1 mx-auto sm:mx-0"></div>
                        
                        <div className="text-black mt-2 text-xs sm:text-sm flex flex-col sm:flex-row items-center sm:items-start">
                            <span className="font-bold mr-0 sm:mr-2 mb-1 sm:mb-0">Email:</span>
                            <p className="text-gray-600 text-center sm:text-left">
                                {session.data == null ?
                                    (portfolio.portfolio.email && (
                                        <span
                                            className="cursor-pointer text-blue-600 hover:underline"
                                            onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolio.portfolio.email}`, '_blank')}
                                        >
                                            Send an email
                                        </span>
                                    )) : (
                                        portfolio.portfolio.email || 'N/A'
                                    )
                                }
                            </p>
                        </div>
                        
                        {session.data != null && (
                            <div className="text-black mt-2 text-xs sm:text-sm flex flex-col sm:flex-row items-center sm:items-start">
                                <span className="font-bold mr-0 sm:mr-2 mb-1 sm:mb-0">Contact:</span>
                                <p className="text-gray-600 text-center sm:text-left">
                                    {portfolio.portfolio.phone_number
                                        ? convertPhoneNumberSpacing(portfolio.portfolio.phone_number || '')
                                        : 'N/A'}
                                </p>
                            </div>
                        )}

                        {portfolio.portfolio.role_id === 1 && (
                            <div className="text-black mt-2 text-xs sm:text-sm flex flex-col sm:flex-row items-center sm:items-start">
                                <span className="font-bold mr-0 sm:mr-2 mb-1 sm:mb-0">Major:</span>
                                <p className="text-gray-600 text-center sm:text-left">{getMajorName || 'N/A'}</p>
                            </div>
                        )}
                        
                        <div className='flex md:flex-row items-center gap-2 sm:gap-1 mt-3 sm:mt-4'>
                            <button
                                className="sm:w-auto rounded-lg sm:rounded-xl text-white px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 flex items-center justify-center font-bold cursor-pointer hover:scale-105 hover:brightness-105 transition-all duration-200 ease-in-out border-2 border-blue-400 text-xs sm:text-sm"
                                onClick={toggleSharePortfolio}
                            >
                                <ShareIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" />
                                <span className="hidden xl:inline-block">Share Portfolio</span>
                                <span className="xl:hidden">Share</span>
                            </button>

                            {owner && toggleEditPortfolioDialog && (
                                <button
                                    className="w-full sm:w-auto rounded-lg sm:rounded-xl text-white px-1 py-1 sm:px-4 sm:py-2 bg-[#ffc107] flex items-center justify-center font-bold cursor-pointer hover:scale-105 hover:brightness-105 transition-all duration-200 ease-in-out border-2 border-[#ffc107] text-xs sm:text-sm"
                                    onClick={toggleEditPortfolioDialog}
                                >
                                    <PencilSquareIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" />
                                    Update
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* About Me Section */}
            <div className="w-full lg:w-[31%] rounded-xl shadow-sm p-3 sm:p-4 md:p-6 overflow-y-auto border border-gray-200 bg-white">
                <div className="flex items-center">
                    <i className="fas fa-user text-blue-500 mr-2 text-sm sm:text-base"></i>
                    <p className="text-gray-800 font-semibold text-sm sm:text-base md:text-lg">About Me</p>
                </div>
                <div className="h-[2px] bg-gray-300 w-32 sm:w-36 md:w-40 mt-2 mb-2"></div>
                <p className="text-gray-600 mt-2 text-xs sm:text-sm leading-relaxed text-justify">
                    {portfolio.portfolio.about ? portfolio.portfolio.about : 'No description available'}
                </p>
            </div>
        </div>
    );
};

export default ProfileSummarySection;