import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Skill } from '@/app/type/skill';
import { PencilSquareIcon } from '@heroicons/react/20/solid';

type Props = {
    skill: Skill;
    index: number;
    dropdownOpen: { [key: number]: boolean };
    toggleDropdown: (id: number) => void;
    openEditSkillDialog: (skill: Skill) => void;
    owner: boolean;
};

const SkillCard: React.FC<Props> = ({ skill, index, dropdownOpen, toggleDropdown, owner, openEditSkillDialog }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                // Close the dropdown if it's open and click is outside
                if (dropdownOpen[skill.id]) {
                    toggleDropdown(skill.id);
                }
            }
        }

        // Only add event listener if dropdown is open
        if (dropdownOpen[skill.id]) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen, skill.id, toggleDropdown]);

    return (
        <div
            className={`mt-4 text-black ml-4 flex items-start ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'
                } p-4 rounded-xl shadow-md hover:shadow-lg`}
        >
            <div className="bg-[#5086ed] w-5 h-5 rounded-full mr-6 mt-1 animate-pulse"></div>

            <div className='w-full'>
                <div className="flex justify-between items-start font-semibold text-lg text-gray-800">
                    <div className="flex w-[70%] items-center gap-4 flex-wrap">
                        <p className="text-md">
                            <span>{skill.title}</span>
                        </p>

                        {skill.endorsers && skill.endorsers.filter(endorser => endorser.status_id === 2).length > 0 && (
                            <div className="relative" ref={dropdownRef}>
                                <div
                                    className="py-2 px-4 bg-[#C0DDEC] rounded-full flex items-center cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleDropdown(skill.id);
                                    }}
                                >
                                    <Image src="/verified.png" alt="Verified" width={20} height={20} className="mr-2" />
                                    <span className="text-sm text-black">Endorsed by</span>
                                </div>

                                {dropdownOpen[skill.id] && (
                                    <div className="absolute left-0 mt-2 p-2 w-64 bg-white border rounded-xl shadow-lg z-10">
                                        <ul>
                                            {skill.endorsers
                                                .filter((endorser) => endorser.status_id === 2) // Only show endorsers with status_id === 2
                                                .map((endorser) => (
                                                    <li
                                                        key={endorser.email}
                                                        className="py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded cursor-pointer"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.location.href = `/portfolio/${endorser.id}`;
                                                        }}
                                                    >
                                                        <div className='flex items-center'>
                                                            <Image src={endorser.photo || "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg"} alt="Endorser" width={20} height={20} className="mr-2 rounded-full w-8 h-8" />
                                                            <p>{endorser.name}</p>
                                                        </div>
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
                            className="text-sm flex text-white hover:underline hover:brightness-110 cursor-pointer py-2 px-4 bg-[#ffc107] rounded-xl items-center justify-center transition-all duration-200"
                            onClick={() => openEditSkillDialog(skill)}
                        >
                            <PencilSquareIcon className="w-5 h-5 mr-2" />
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