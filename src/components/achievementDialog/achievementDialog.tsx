import { Achievement } from "@/app/type/achievement";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import ApiDialog from "../apiDialog/page";

type Props = {
    owner: boolean
    onClose: () => void;
    achievement: Achievement | null;
    onEdit: (updatedAchievement: Achievement) => void;
    ableToUpdate: boolean;
    openEditExperienceDialog: (achievement: Achievement) => void;
    onEndorserRemoved?: () => void;
};

const CertificateDialog: React.FC<Props> = ({ owner, onClose, achievement, onEdit, ableToUpdate, openEditExperienceDialog, onEndorserRemoved }) => {
    const { data: session } = useSession();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [selectedEndorser, setSelectedEndorser] = useState<any>(null);
    // Local state to manage endorsers list for immediate UI update
    const [localEndorsers, setLocalEndorsers] = useState(achievement?.endorsers || []);

    // Update local endorsers when achievement prop changes
    useEffect(() => {
        setLocalEndorsers(achievement?.endorsers || []);
    }, [achievement?.endorsers]);

    const toggleDropdown = (id: number | undefined) => {
        setDropdownOpen(!dropdownOpen);
    };

    // Click outside to close dialog, but not when API dialog is open
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target as Node) && !removeDialogOpen) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose, removeDialogOpen]);

    useEffect(() => {
        const handleDropdownClickOutside = (event: MouseEvent) => {
            const dropdownElement = document.querySelector('.dropdown-container');
            if (dropdownElement && !dropdownElement.contains(event.target as Node) && dropdownOpen) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleDropdownClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleDropdownClickOutside);
        };
    }, [dropdownOpen]);

    const handleRemoveEndorser = (endorser: any) => {
        setSelectedEndorser(endorser);
        setRemoveDialogOpen(true);
    };

    const handleRemoveSuccess = () => {
        // Remove the endorser from local state immediately
        if (selectedEndorser) {
            setLocalEndorsers(prev => 
                prev.filter(endorser => endorser.id !== selectedEndorser.id)
            );
        }
        
        // Close the remove dialog
        setRemoveDialogOpen(false);
        
        // Close the dropdown
        setDropdownOpen(false);
        
        // Reset selected endorser
        setSelectedEndorser(null);
        
        // Call the parent callback to refresh data
        if (onEndorserRemoved) {
            onEndorserRemoved();
        }
    };

    // Filter active endorsers from local state
    const activeEndorsers = localEndorsers.filter(endorser => endorser.status_id === 2);

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto">
                <div
                    ref={dialogRef}
                    className="relative bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-start max-w-5xl w-auto"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-black hover:text-red-500 cursor-pointer z-10"
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

                    <div className="w-full md:w-3/5 p-6 flex items-center justify-center">
                        {achievement?.image && (
                            <Image
                                src={achievement.image}
                                alt="Certificate"
                                width={500}
                                height={350}
                                className="w-full h-auto object-contain w-[500px] h-[350px]"
                            />
                        )}
                    </div>

                    <div className="w-full md:w-2/5 p-6 flex flex-col justify-start items-start text-black">
                        <p className="w-full text-lg font-bold break-words">
                            {achievement?.title}
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                            Issued By: {achievement?.issued_by}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                            Issued On: {achievement?.issue_month} {achievement?.issue_year}
                        </p>

                        <div className="flex items-center justify-between mt-4 w-full">
                            {activeEndorsers.length > 0 && (
                                <div className="relative dropdown-container">
                                    <div
                                        className="py-2 px-4 bg-[#C0DDEC] rounded-full flex items-center cursor-pointer mr-4"
                                        onClick={(e) => {
                                            toggleDropdown(achievement?.id);
                                        }}
                                    >
                                        <Image src="/verified.png" alt="Verified" width={20} height={20} className="mr-2" />
                                        <span className="text-sm text-black font-bold">Endorsed by</span>
                                    </div>

                                    {dropdownOpen && (
                                        <div className="absolute p-2 w-64 bg-white border rounded-xl shadow-lg ml-4 z-10 font-bold">
                                            <ul>
                                                {activeEndorsers.map((endorser, idx) => (
                                                    <li
                                                        key={endorser.id} // Use endorser.id as key for better React tracking
                                                        className="py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded cursor-pointer"
                                                        onClick={() => {
                                                            window.location.href = `/portfolio/${endorser.id}`;
                                                        }}
                                                    >
                                                        <div className='flex items-center justify-between'>
                                                            <div className='flex items-center'>
                                                                <Image 
                                                                    src={endorser.photo || "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg"} 
                                                                    alt="Endorser" 
                                                                    width={20} 
                                                                    height={20} 
                                                                    className="mr-2 rounded-full w-8 h-8" 
                                                                />
                                                                <p>{endorser.name}</p>
                                                            </div>
                                                            {session?.googleId === endorser.id.toString() && (
                                                                <div
                                                                    className="flex items-center hover:bg-red-100 p-1 rounded"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleRemoveEndorser(endorser);
                                                                    }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {owner && ableToUpdate && (
                                <div
                                    className="text-sm h-10 text-white hover:underline cursor-pointer px-4 bg-[#ffc107] rounded-xl flex items-center justify-center font-bold"
                                    onClick={() => {
                                        onEdit(achievement!);
                                    }}
                                >
                                    Update
                                </div>
                            )}
                        </div>

                        <div className="mt-2 w-full text-sm">
                            <p className="text-gray-500">
                                {achievement?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {removeDialogOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <ApiDialog
                        isOpen={removeDialogOpen}
                        onClose={() => setRemoveDialogOpen(false)}
                        apiUrl="https://talenthub.newlinkmarketing.com/api/remove_endorsement"
                        requestData={{
                            "type": 3,
                            "id": achievement?.id
                        }}
                        title="Remove Endorsement"
                        description={`Are you sure you want to remove your endorsement?`}
                        confirmButtonText="Remove"
                        cancelButtonText="Cancel"
                        onSuccess={handleRemoveSuccess}
                    />
                </div>
            )}
        </>
    );
}

export default CertificateDialog;