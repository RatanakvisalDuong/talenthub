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
        <div className="flex justify-between h-[240px]">
            <div className="w-[68%] bg-white rounded-xl border border-gray-200 shadow-sm p-4 overflow-y-auto">
                <div className="flex items-center justify-start h-full">
                    {/* Profile Image and Status */}
                    <div className="w-[40%] relative flex items-center justify-center">
                        <div className="absolute top-0 right-0 z-10 -translate-y-1/2">
                            {portfolio.portfolio.role_id === 1 ? (
                                portfolio.portfolio.working_status != null ? (
                                    <WorkingStatusBar status={portfolio.portfolio.working_status} />
                                ) : (
                                    <WorkingStatusBar status={2} />
                                )
                            ) : (
                                <div className="h-6 flex justify-center items-center text-white text-[12px] rounded-xl bg-blue-500 p-2">
                                    Endorser
                                </div>
                            )}
                        </div>
                        <div className="h-[90%] w-[90%] rounded-xl overflow-hidden mx-auto flex items-center justify-center">
                            <Image
                                src={
                                    portfolio.portfolio.photo ||
                                    'https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg'
                                }
                                alt="placeholder"
                                width={190}
                                height={190}
                                className="aspect-square object-cover border border-gray-200 shadow-sm rounded-xl"
                            />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="justify-start w-[60%] h-full items-start ml-4 mt-4">
                        <p className="text-black font-bold text-lg">{portfolio.portfolio.user_name}</p>
                        <div className="w-20 bg-[#dfdfdf] h-[2px] mt-1"></div>
                        <div className="text-black mt-2 text-sm flex">
                            <span className="font-bold mr-2">Email:</span>
                            <p className="text-gray-600">
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
                        {session.data != null && (<div className="text-black mt-2 text-sm flex">
                            <span className="font-bold mr-2">Contact:</span>
                            <p className="text-gray-600">
                                {portfolio.portfolio.phone_number
                                    ? convertPhoneNumberSpacing(portfolio.portfolio.phone_number || '')
                                    : 'N/A'}
                            </p>
                        </div>
                        )}

                        {portfolio.portfolio.role_id === 1 && (
                            <div className="text-black mt-2 text-sm flex">
                                <span className="font-bold mr-2">Major:</span>
                                <p className="text-gray-600">{getMajorName || 'N/A'}</p>
                            </div>
                        )}
                        <div className='flex flex-col sm:flex-row items-start sm:items-center mt-4'>
                            <button
                                className="w-full sm:w-auto rounded-xl text-white px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 flex items-center justify-center font-bold cursor-pointer hover:scale-105 hover:brightness-105 transition-all duration-200 ease-in-out border-2 border-blue-400 text-xs sm:text-sm"
                                onClick={toggleSharePortfolio}
                            >
                                <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                                <span className="hidden xl:inline-block">Share Portfolio</span>
                                <span className="xl:hidden">Share</span>
                            </button>

                            {owner && toggleEditPortfolioDialog && (
                                <button
                                    className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-3 rounded-xl text-white px-3 py-1.5 sm:px-4 sm:py-2 bg-[#ffc107] flex items-center justify-center font-bold cursor-pointer hover:scale-105 hover:brightness-105 transition-all duration-200 ease-in-out border-2 border-[#ffc107] text-xs sm:text-sm"
                                    onClick={toggleEditPortfolioDialog}
                                >
                                    <PencilSquareIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                                    Update
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[31%] rounded-xl shadow-sm p-6 overflow-y-auto border border-gray-200 bg-white">
                <div className="flex items-center">
                    <i className="fas fa-user text-blue-500 mr-2"></i>
                    <p className="text-gray-800 font-semibold text-lg">About Me</p>
                </div>
                <div className="h-[2px] bg-gray-300 w-40 mt-2 mb-2"></div>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed text-justify">
                    {portfolio.portfolio.about ? portfolio.portfolio.about : 'No description available'}
                </p>
            </div>
        </div>
    );
};

export default ProfileSummarySection;
