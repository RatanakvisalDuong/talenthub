import React from 'react';
import Image from 'next/image';
import { Education } from '@/app/type/education';

type Props = {
    education: Education;
    index: number;
    owner: boolean
};

const EducationCard: React.FC<Props> = ({ education, index, owner }) => {
    return (
        <div
            key={index}
            className={`mt-4 text-black ml-4 flex items-start transition-all duration-300 ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'
                } p-4 rounded-lg shadow-md hover:shadow-lg hover:transform hover:scale-105 cursor-pointer`}
        >
            <div className="bg-[#5086ed] w-5 h-5 rounded-full mr-6 mt-1 animate-pulse"></div>

            <div className='w-full'>
                <div className="flex justify-between items-start font-semibold text-lg text-gray-800">
                    <div className="flex w-[70%] items-center gap-4 flex-wrap">

                    <p className="text-md">
							<span>{education.education_center}</span>
							<span className="mx-[2px]">-</span>
							<span>{education.field_of_study}</span>
						</p>
                    </div>

                    {owner && (
                        <button
                            className="text-sm text-white hover:underline cursor-pointer p-2 bg-[#ffc107] rounded-md"
                        >
                            Edit
                        </button>
                    )}
                </div>

                <p className='text-black text-sm mt-2'>
                    {education.description}
                </p>
                <div className="h-[2px] bg-gray-300 w-full mt-4"></div>
            </div>
        </div>
    );
};

export default EducationCard;
