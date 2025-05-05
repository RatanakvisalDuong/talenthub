import { Achievement } from "@/app/type/achievement";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
    owner: boolean
    onClose: () => void;
    achievement: Achievement | null;
    onEdit: (updatedAchievement: Achievement) => void;
    ableToUpdate: boolean;
};

const CertificateDialog: React.FC<Props> = ({ owner, onClose, achievement, onEdit, ableToUpdate }) => {
    console.log("Achievement data:", achievement);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-md p-6 w-max h-max max-w-full shadow-lg flex items-start gap-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-black hover:text-red-500 cursor-pointer"
                    aria-label="Close dialog"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="w-[60%] h-[300px] flex items-center justify-center">
                    <Image src={achievement?.image || ''} alt="Certificate" width={500} height={350} className="w-auto h-[330px]" />
                </div>
                <div className="w-[38%] flex flex-col justify-start items-start ml-2 text-black">
                    <p className="w-full text-lg font-bold">
                        {achievement?.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Issued By: {achievement?.issued_by}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Issued On: {achievement?.issue_month} {achievement?.issue_year}
                    </p>
                    <div className="flex items-center justify-between mt-4 w-full">
                        {achievement?.endorsers && achievement.endorsers.filter(endorser => endorser.status_id === 2).length > 0 && (
                            <div className="relative" onClick={toggleDropdown}>
                                <div className="py-2 px-4 bg-[#C0DDEC] rounded-full flex items-center cursor-pointer mr-4">
                                    <Image src="/verified.png" alt="Verified" width={20} height={20} className="mr-2" />
                                    <span className="text-sm text-black">Endorsed</span>
                                </div>

                                {dropdownOpen && (
                                    <div className="absolute p-2 w-48 bg-white border rounded-md shadow-lg ml-4 z-10">
                                        <ul>
                                            {achievement.endorsers.filter(endorser => endorser.status_id === 2).map((endorser, idx) => (
                                                <li
                                                    key={idx}
                                                    className="py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded cursor-pointer"
                                                >
                                                    {endorser.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                        {owner && ableToUpdate && (
                            <div
                                className="text-sm h-[40px] text-white hover:underline cursor-pointer px-4 bg-[#ffc107] rounded-md flex items-center justify-center font-bold"
                                onClick={() => {
                                    onEdit(achievement!);
                                }}
                            >
                                Update
                            </div>
                        )}
                    </div>



                    <div className="mt-2 h-[170px] w-full text-sm">
                        <p className="text-gray-500">
                            {achievement?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CertificateDialog;