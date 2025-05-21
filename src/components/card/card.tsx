import Image from 'next/image';
import WorkingStatusBar from '../workingStatus/workingStatusBar';
import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import Link from 'next/link';
import { getMajorName } from '@/dummydata/major';
import { convertPhoneNumberSpacing } from '@/utils';


interface Portfolio {
    user_id: number;
    name: string;
    phone_number: string | null;
    major: number | null;
    working_status: number | null;
    role: number | null;
    photo: string;
}

export default function Card({ portfolio }: { portfolio: Portfolio }) {
    return (
        <Link
            href={`/portfolio/${portfolio.user_id}`}
            className="w-full flex flex-col rounded-xl shadow-sm border border-gray-200 p-4 bg-white text-gray-800 transition-transform duration-200 hover:scale-[1.02] hover:shadow-md"
        >
            <div className="flex justify-end">
                {portfolio.role === 1 ? (
                    <WorkingStatusBar status={portfolio.working_status ?? 2} />
                ) : (
                    <div className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full flex items-center space-x-1">
                        <i className="fas fa-check-circle"></i>
                        <span>Endorser</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center mt-3 space-y-3">
                <div className="relative">
                    <Image
                        src={
                            portfolio.photo ||
                            "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg"
                        }
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-lg aspect-square object-cover border border-gray-300"
                    />
                    {/* {portfolio.role === 1 && (
                        <div className="absolute -top-2 -left-2 bg-white p-1 rounded-full border border-gray-200">
                            <i className="fas fa-user-graduate text-blue-500 text-lg"></i>
                        </div>
                    )} */}
                </div>

                <div className="w-full space-y-2 text-center">
                    <p className="text-base font-semibold flex items-center justify-center gap-2">
                        {/* <i className="fas fa-id-badge text-blue-500"></i> */}
                        {portfolio.name}
                    </p>

                    <div className="text-sm text-gray-600">
                        <p className="flex items-center justify-center gap-2">
                            <i className="fas fa-phone text-blue-500"></i>
                            {/* <span className="font-bold">Contact:</span> {convertPhoneNumberSpacing(portfolio.phone_number || '') || 'N/A'} */}
                             {convertPhoneNumberSpacing(portfolio.phone_number || '') || 'N/A'}
                        </p>
                        {portfolio.role === 1 && (
                            <p className=" gap-2">
                                <i className="fas fa-graduation-cap text-blue-500 mr-2"></i>
                                {/* <span className="font-bold ml-1">Major:</span> {getMajorName(portfolio.major ?? 0) || 'N/A'} */}
                                {getMajorName(portfolio.major ?? 0) || 'N/A'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {/* <div className="mt-3 w-full flex justify-center">
                <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1">
                    <i className="fas fa-arrow-right"></i>
                    <span>View Profile</span>
                </button>
            </div> */}
        </Link>
    );
}
