import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getMajorName, majors } from "@/dummydata/major";
import { role } from "@/dummydata/role";
import { useSession } from 'next-auth/react';
import { workingStatus } from '@/dummydata/workingStatus';
import Link from 'next/link';
import { convertPhoneNumberSpacing } from '@/utils';

export default function Sidebar({
    photo,
    phoneNumber,
    major,
    onMajorSelect,
    onRoleSelect,
    onWorkingStatusSelect }: {
        photo: string | null;
        phoneNumber: string | null;
        major: number | null;
        onMajorSelect: (selectedMajors: number[]) => void;
        onRoleSelect: (selectedRoles: number[]) => void;
        onWorkingStatusSelect: (selectedWorkingStatus: number[]) => void;
    }) {

    const { data: session } = useSession();
    const [selectedMajors, setSelectedMajors] = useState<number[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
    const [selectedWorkingStatuses, setSelectedWorkingStatuses] = useState<number[]>([]);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleMajorSelect = (majorId: number) => {
        setSelectedMajors((prevSelectedMajors) => {
            if (prevSelectedMajors.includes(majorId)) {
                return prevSelectedMajors.filter((id) => id !== majorId);
            } else {
                return [...prevSelectedMajors, majorId];
            }
        });
    };

    const handleRoleSelect = (roleId: number) => {
        setSelectedRoles((prevSelectedRoles) => {
            if (prevSelectedRoles.includes(roleId)) {
                return prevSelectedRoles.filter((id) => id !== roleId);
            } else {
                return [...prevSelectedRoles, roleId];
            }
        });
    };

    const handleWorkingStatusSelect = (workingStatusId: number) => {
        setSelectedWorkingStatuses((prevSelectedWorkingStatuses) => {
            if (prevSelectedWorkingStatuses.includes(workingStatusId)) {
                return prevSelectedWorkingStatuses.filter((id) => id !== workingStatusId);
            } else {
                return [...prevSelectedWorkingStatuses, workingStatusId];
            }
        });
    };

    useEffect(() => {
        onMajorSelect(selectedMajors);
        onRoleSelect(selectedRoles);
        onWorkingStatusSelect(selectedWorkingStatuses);
    }, [selectedMajors, selectedRoles, selectedWorkingStatuses, onMajorSelect, onRoleSelect, onWorkingStatusSelect]);

    return (
        // <div className={`flex flex-col px-2 sm:px-4 ${session?.user == null ? 'h-max' : 'h-full'}`}>
        <div className={`flex flex-col px-2 sm:px-4 `}>
            {session?.user?.name && (
                <div className="bg-white w-full rounded-xl p-2 sm:p-4 items-center justify-center text-black mb-2 sm:mb-4 cursor-pointer shadow-sm border border-gray-200 flex-shrink-0">
                    <Link href={`/yourportfolio`}>
                    <div className='flex items-center justify-center'>

                        <p className="sm:text-sm md:text-base font-bold overflow-hidden text-ellipsis whitespace-nowrap">{session.user?.name || 'N/A'}</p>
                    </div>
                        <div className="rounded-full m-auto mt-2 sm:mt-4 items-center justify-center flex">
                            <Image
                                src={photo || session.user.image || "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg?crop=0.66667xw:1xh;center,top&resize=1200:*"}
                                alt="Profile Picture"
                                width={80}
                                height={80}
                                className="rounded-xl aspect-square object-cover border border-gray-200 sm:w-[100px] sm:h-[100px]"
                            />
                        </div>
                        <p className="m-auto text-xs sm:text-sm mt-1 sm:mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className='font-bold'>Contact: </span>
                            <span className='ml-1'>{convertPhoneNumberSpacing(phoneNumber || '') || 'N/A'}</span>
                        </p>
                        <p className="m-auto text-xs sm:text-sm mt-1 sm:mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className='font-bold'>Email: </span>
                            <span className='ml-1'>
                                {session.user.email || 'N/A'}
                            </span>
                        </p>
                        {session.roleId === 1 && (<p className="m-auto text-xs sm:text-sm mt-1 sm:mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className='font-bold'>Major: </span>
                            <span className="ml-1">
                                {
                                    getMajorName(major ?? 0) || 'N/A'
                                }
                            </span>
                        </p>)
                        }
                    </Link>
                </div>
            )}

            <div className="bg-white w-full rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200 flex-1 flex flex-col h-max min-h-0">
                <div className="overflow-y-auto flex-1 pr-1 sm:pr-2">
                    <div className="bg-[#C0DDEC] w-full h-6 sm:h-8 justify-start items-center flex text-left mb-2 sm:mb-4">
                        <p className="text-md sm:text-md text-black ml-1 sm:ml-2">Majors:</p>
                    </div>

                    {majors.map((major) => (
                        <label key={major.id} className="flex items-center text-black text-xs sm:text-sm mt-1">
                            <input
                                type="checkbox"
                                className="mr-1 sm:mr-2 h-2.5 w-2.5 sm:h-3 sm:w-3"
                                checked={selectedMajors.includes(major.id)}
                                onChange={() => handleMajorSelect(major.id)}
                            />
                            {major.name}
                        </label>
                    ))}

                    <div className="bg-[#C0DDEC] w-full h-6 sm:h-8 justify-start items-center flex text-left mb-2 sm:mb-4 mt-2 sm:mt-4">
                        <p className="text-md sm:text-md text-black ml-1 sm:ml-2">Role:</p>
                    </div>

                    {role.map((role) => (
                        <label key={role.id} className="flex items-center text-black text-xs sm:text-sm mt-1">
                            <input
                                type="checkbox"
                                className="mr-1 sm:mr-2 h-2.5 w-2.5 sm:h-3 sm:w-3"
                                checked={selectedRoles.includes(role.id)}
                                onChange={() => handleRoleSelect(role.id)}
                            />
                            {role.name}
                        </label>
                    ))}

                    <div className="bg-[#C0DDEC] w-full h-6 sm:h-8 justify-start items-center flex text-left mb-2 sm:mb-4 mt-2 sm:mt-4">
                        <p className="text-md sm:text-md text-black ml-1 sm:ml-2">Employment Status:</p>
                    </div>

                    {workingStatus.map((workingStatus) => (
                        <label key={workingStatus.id} className="flex items-center text-black text-xs sm:text-sm mt-1">
                            <input
                                type="checkbox"
                                className="mr-1 sm:mr-2 h-2.5 w-2.5 sm:h-3 sm:w-3"
                                checked={selectedWorkingStatuses.includes(workingStatus.id)}
                                onChange={() => handleWorkingStatusSelect(workingStatus.id)}
                            />
                            {workingStatus.name}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

