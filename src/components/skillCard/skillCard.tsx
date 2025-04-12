import React from 'react';
import Image from 'next/image';
import { Skill } from '@/app/type/skill';

type Props = {
    skill: Skill;
    index: number;
    dropdownOpen: { [key: number]: boolean };
    toggleDropdown: (id: number) => void;
    openEditSkillDialog: (skill: Skill) => void;
    owner: boolean;
};

const SkillCard: React.FC<Props> = ({ skill, index, dropdownOpen, toggleDropdown, owner, openEditSkillDialog }) => {
    return (
        <div
            className={`mt-4 text-black ml-4 flex items-start transition-all duration-300 ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'
                } p-4 rounded-lg shadow-md hover:shadow-lg hover:transform hover:scale-105`}
        >
            <div className="bg-[#5086ed] w-5 h-5 rounded-full mr-6 mt-1 animate-pulse"></div>

            <div className='w-full'>
                <div className="flex justify-between items-start font-semibold text-lg text-gray-800">
                    <div className="flex w-[70%] items-center gap-4 flex-wrap">
                        <p className="text-md">
                            <span>{skill.title}</span>
                        </p>

                        {/* Endorsements Dropdown */}
                        {skill.endorsers && skill.endorsers.filter(endorser => endorser.status_id === 2).length > 0 && (
                            <div className="relative">
                                <div
                                    className="py-2 px-4 bg-[#C0DDEC] rounded-full flex items-center cursor-pointer"
                                    onClick={() => toggleDropdown(skill.id)}
                                >
                                    <Image src="/verified.png" alt="Verified" width={20} height={20} className="mr-2" />
                                    <span className="text-sm text-black">Endorsed</span>
                                </div>

                                {dropdownOpen[skill.id] && (
                                    <div className="absolute left-0 mt-2 p-2 w-48 bg-white border rounded-md shadow-lg z-10">
                                        <ul>
                                            {skill.endorsers
                                                .filter((endorser) => endorser.status_id === 2) // Only show endorsers with status_id === 2
                                                .map((endorser, idx) => (
                                                    <li
                                                        key={endorser.email}
                                                        className="py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded cursor-pointer"
                                                        onClick={() => {
                                                            window.location.href = `/portfolio/${endorser.id}`;
                                                        }}
                                                    >
                                                        {endorser.name}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    {owner && (
                        <button
                            className="text-sm text-white hover:underline cursor-pointer p-2 bg-[#ffc107] rounded-md"
                            onClick={() => openEditSkillDialog(skill)}
                        >
                            Update
                        </button>
                    )}
                </div>

                <p className='text-black text-sm mt-2'>
                    {skill.description}
                </p>
                <div className="h-[2px] bg-gray-300 w-full mt-4"></div>
            </div>
        </div>
    );
};

export default SkillCard;