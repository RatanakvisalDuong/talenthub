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
        <div className="h-screen overflow-y-auto px-4 flex flex-col">
            {session?.user?.name && (
                <div className="bg-white w-full rounded-xl p-4 items-center justify-center text-black mb-4 cursor-pointer shadow-sm border border-gray-200 flex-shrink-0">
                    <Link href={`/yourportfolio`}>
                        <p className="w-max m-auto font-bold">{session.user.name || 'N/A'}</p>
                        <div className="rounded-full m-auto mt-4 items-center justify-center flex">
                            <Image
                                src={photo || session.user.image || "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg?crop=0.66667xw:1xh;center,top&resize=1200:*"}
                                alt="Profile Picture"
                                width={100}
                                height={100}
                                className="rounded-xl aspect-square object-cover border border-gray-200"
                            />
                        </div>
                        <p className="m-auto text-sm mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className='font-bold'>Contact: </span>
                            <span className='ml-1'>{convertPhoneNumberSpacing(phoneNumber || '') || 'N/A'}</span>
                        </p>
                        <p className="m-auto text-sm mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className='font-bold'>Email: </span>
                            <span className='ml-1'>
                                {session.user.email || 'N/A'}
                            </span>
                        </p>
                        {session.roleId === 1 && (<p className="m-auto text-sm mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
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
            <div className="bg-white w-full h-100 rounded-xl shadow-md p-4 overflow-y-auto shadow-sm border border-gray-200">
                <div className="bg-[#C0DDEC] w-full h-8 justify-start items-center flex text-left mb-4">
                    <p className="text-md text-black ml-4">Majors:</p>
                </div>

                {majors.map((major) => (
                    <label key={major.id} className="flex items-center text-black text-sm mt-1">
                        <input
                            type="checkbox"
                            className="mr-2 h-3 w-3"
                            checked={selectedMajors.includes(major.id)}
                            onChange={() => handleMajorSelect(major.id)}
                        />
                        {major.name}
                    </label>
                ))}

                <div className="bg-[#C0DDEC] w-full h-8 justify-start items-center flex text-left mb-4 mt-4">
                    <p className="text-md text-black ml-4">Role:</p>
                </div>

                {role.map((role) => (
                    <label key={role.id} className="flex items-center text-black text-sm mt-1">
                        <input
                            type="checkbox"
                            className="mr-2 h-3 w-3"
                            checked={selectedRoles.includes(role.id)}
                            onChange={() => handleRoleSelect(role.id)}
                        />
                        {role.name}
                    </label>
                ))}

                <div className="bg-[#C0DDEC] w-full h-8 justify-start items-center flex text-left mb-4 mt-4">
                    <p className="text-md text-black ml-4">Employment Status:</p>
                </div>

                {workingStatus.map((workingStatus) => (
                    <label key={workingStatus.id} className="flex items-center text-black text-sm mt-1">
                        <input
                            type="checkbox"
                            className="mr-2 h-3 w-3"
                            checked={selectedWorkingStatuses.includes(workingStatus.id)}
                            onChange={() => handleWorkingStatusSelect(workingStatus.id)}
                        />
                        {workingStatus.name}
                    </label>
                ))}
            </div>
        </div>
    );
}
