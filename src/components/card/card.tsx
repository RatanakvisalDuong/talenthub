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

                <div className="w-full space-y-2 text-center">
                    <p className="text-base font-semibold">{portfolio.name}</p>

                    <div className="text-sm text-gray-600">
                        <p><span className="font-bold">Contact:</span> {convertPhoneNumberSpacing(portfolio.phone_number || '') || 'N/A'}</p>
                        {portfolio.role === 1 && (
                            <p><span className="font-bold">Major:</span> {getMajorName(portfolio.major ?? 0) || 'N/A'}</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>

    );

}

