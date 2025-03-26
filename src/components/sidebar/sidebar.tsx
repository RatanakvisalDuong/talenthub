import { useEffect, useState } from 'react';
import Image from 'next/image';
import { major } from "@/dummydata/major";
import { role } from "@/dummydata/role";
import { useSession } from 'next-auth/react';
import { workingStatus } from '@/dummydata/workingStatus';

export default function Sidebar({ 
    studentMajor,
    onMajorSelect,
    onRoleSelect,
    onWorkingStatusSelect }: {
        studentMajor: number | null;
        onMajorSelect: (selectedMajors: number[]) => void;
        onRoleSelect: (selectedRoles: number[]) => void;
        onWorkingStatusSelect: (selectedWorkingStatus: number[]) => void;
    }) {

    const { data: session} = useSession();
    const [selectedMajors, setSelectedMajors] = useState<number[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
    const [selectedWorkingStatuses, setSelectedWorkingStatuses] = useState<number[]>([]);

    const handleMajorSelect = (majorId: number) => {
        console.log('Major selected: ', majorId);
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
        <div className="w-max h-[100vh] overflow-y-auto px-2">
            {session?.user?.name && (
                <div className="bg-white w-64 h-max rounded-sm shadow-md p-4 items-center justify-center text-black mb-4 transform transition-transform duration-200 hover:scale-105 hover:mt-2 hover:cursor-pointer">
                    <p className="w-max m-auto font-bold">{session.user.name}</p>
                    <div className="rounded-full m-auto mt-4 items-center justify-center flex">
                        <Image
                            src={session.user.image || "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg?crop=0.66667xw:1xh;center,top&resize=1200:*"}
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            className="rounded-sm"
                        />
                    </div>
                    <p className="m-auto text-sm mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className='font-bold'>Contact: </span>
                        <span className='ml-1'>017 614 694</span>
                    </p>
                    <p className="m-auto text-sm mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className='font-bold'>Email: </span>
                        <span className='ml-1'>
                            {session.user.email}
                        </span>
                    </p>
                    <p className="m-auto text-sm mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className='font-bold'>Major: </span>
                        <span className='ml-1'>{studentMajor == null ? "" : studentMajor === 1 ? 'Computer Science' : "Management of Information System"}</span>
                    </p>
                </div>
            )}

            <div className="bg-white w-64 h-100 rounded-sm shadow-md p-4 overflow-y-auto">
                <div className="bg-[#C0DDEC] w-full h-8 justify-start items-center flex text-left mb-4">
                    <p className="text-md text-black ml-4">Majors:</p>
                </div>

                {major.map((major) => (
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
                    <p className="text-md text-black ml-4">Portfolio:</p>
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
                    <p className="text-md text-black ml-4">Working Status:</p>
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
