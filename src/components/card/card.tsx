import Image from 'next/image';
import WorkingStatusBar from '../workingStatus/workingStatusBar';
import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import Link from 'next/link';
import { getMajorName } from '@/dummydata/major';


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
            className="w-full flex flex-col rounded-sm shadow-md p-3 sm:p-4 bg-white text-black transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
            href={`/portfolio/${portfolio.user_id}`}
        >
            <div className="flex justify-end items-center w-full">
                {portfolio.role === 1 ? (
                    portfolio.working_status != null ? (
                        <WorkingStatusBar status={portfolio.working_status} />
                    ) : (
                        <WorkingStatusBar status={2} />
                    )
                ) : (
                    <div className="h-6 flex justify-center items-center text-white text-xs rounded-md bg-[#5086ed] w-20 sm:w-24">
                        <i className="fas fa-check-circle mr-1"></i>
                        Endorser
                    </div>
                )}
            </div>

            <div className="flex-grow flex flex-col items-center mt-2">
                <Image
                    src={portfolio.photo || "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg?crop=0.66667xw:1xh;center,top&resize=1200:*"}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-sm aspect-square object-cover"
                />

                <div className='w-full mt-3'>
                    <p className="text-sm font-medium text-center">{portfolio.name}</p>

                    <div className='flex flex-wrap mt-2'>
                        <p className='font-bold text-xs'>
                            Contact:
                        </p>
                        <p className='text-xs ml-1 sm:ml-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-full'>
                            {portfolio.phone_number || 'N/A'}
                        </p>
                    </div>

                    {portfolio.role == 1 ?
                        <div className='flex  mt-2'>
                            <p className='font-bold text-xs'>
                                Major:
                            </p>
                            <p className='text-xs ml-1 sm:ml-2 overflow-hidden text-ellipsis line-clamp-2 w-full'>
                                {getMajorName(portfolio.major ?? 0) || 'N/A'}
                            </p>
                        </div>
                        : null
                    }
                </div>
            </div>
        </Link>
    );

}

