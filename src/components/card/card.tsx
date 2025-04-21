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
        <Link className="w-53 h-64 rounded-sm shadow-md p-4 bg-white shadow-sm p-4 text-black transform transition-transform duration-200 hover:scale-105 hover:cursor-pointer" href={`/portfolio/${portfolio.user_id}`}>
            <div className="flex justify-between items-center">
                <div></div>
                {portfolio.role === 1 ? (
                    portfolio.working_status != null ? (
                        <WorkingStatusBar status={portfolio.working_status} />
                    ) : (
                        <div
                            className="h-6 flex justify-center items-center text-white text-[12px] rounded-md bg-[#0277B6] w-24"
                        >

                            No Status
                        </div>
                    )
                ) : (
                    <div className="h-6 flex justify-center items-center text-white text-[12px] rounded-md bg-[#5086ed] w-24">
                        <i className="fas fa-check-circle mr-1"></i>
                        Endorser
                    </div>

                )}
            </div>
            <Image
                src={portfolio.photo || "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg?crop=0.66667xw:1xh;center,top&resize=1200:*"}
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-sm m-auto mx-auto mt-2 aspect-square object-cover"
            />
            <div className='w-full mt-2'>
                <p className="text-sm mx-auto w-max">{portfolio.name}</p>
                <div className='flex mt-2'>
                    <p className='font-bold text-[12px]'>
                        Contact:
                    </p>
                    <p className='text-[12px] ml-2'>
                        {portfolio.phone_number}
                    </p>
                </div>
                {portfolio.role == 1 ? <div className='flex mt-2'>
                    <p className='font-bold text-[12px]'>
                        Major:
                    </p>
                    <p className='text-[12px] ml-2 break-words overflow-hidden text-ellipsis -webkit-box -webkit-line-clamp-2 -webkit-box-orient-vertical w-full'>
                        {getMajorName(portfolio.major ?? 0)}
                    </p>
                </div> : null
                }
            </div>
        </Link>
    );

}

