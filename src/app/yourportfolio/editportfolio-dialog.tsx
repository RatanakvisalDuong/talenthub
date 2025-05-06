"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import TextInput from "@/components/textinput/textInput";
import Image from "next/image";
import { useRef, useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useSession, getSession } from "next-auth/react";
import { Portfolio } from "../type/portfolio";
import { error } from "console";
import { useRouter } from "next/navigation";

const EditPortfolioDialog = ({
    isOpen,
    onClose,
    onClick,
    portfolioId,
    phoneNumber,
    major,
    workingStatus,
    aboutMe,
    setSuccessMessage,
    handlePortfolioUpdate
}: {
    isOpen: boolean;
    onClose: () => void;
    onClick: () => void;
    portfolioId: number;
    phoneNumber: string | null;
    major: number | null;
    workingStatus: number | null;
    aboutMe: string | null;
    setSuccessMessage: (message: string) => void;
    handlePortfolioUpdate: (updatedPortfolio: any) => void;
}) => {
    const { data: session, update } = useSession();
    const router = useRouter();

    const [phone, setPhone] = useState<string | null>(phoneNumber || null);
    const [selectedMajor, setSelectedMajor] = useState<number | null>(major || null);
    const [selectedWorkingStatus, setSelectedWorkingStatus] = useState<number | null>(workingStatus || null);
    const [about, setAbout] = useState<string | null>(aboutMe || null);
    const [photoString, setPhotoString] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);

    const imagePreviews = useMemo(() => {
        return imageFiles.map((file) => URL.createObjectURL(file));
    }, [imageFiles]);

    if (!isOpen) return null;

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFile = files[0];
        if (newFile) {
            setImageFiles([newFile]);
        }
        
        event.target.value = "";
    };

    const handleRemoveImage = (index: number) => {
        setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    useEffect(() => {
        setPhone(phoneNumber || null);
        setSelectedMajor(major || null);
        setSelectedWorkingStatus(workingStatus || null);
        setAbout(aboutMe || null);
        setPhotoString(session?.user?.image ?? null);
    }, [phoneNumber, major, workingStatus, aboutMe]);

    const handleOnEdit = async () => {
        if (selectedMajor == null || selectedWorkingStatus == null || phone == null || about == null) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append('major_id', selectedMajor.toString());
            formData.append('phone_number', phone);
            formData.append('about', about);
            formData.append('working_status', selectedWorkingStatus.toString());
            if (imageFiles.length > 0) {
                formData.append('photo', imageFiles[0]);
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}update_portfolio/${portfolioId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                }
            );

            if (response.status == 200) {
                setLoading(false);
                const updatedPortfolio = {
                    portfolioId,
                    major: response.data.major_id,
                    phone_number: response.data.phone_number,
                    working_status: response.data.working_status,
                    about: response.data.about,
                    photo: response.data.photo,
                }
                router.refresh();
                handlePortfolioUpdate(updatedPortfolio);
                setSuccessMessage("Portfolio updated successfully.");
                onClose();
            }
        } catch (error) {
            console.error("Error updating portfolio:", error);
            setLoading(false);
            setError("An error occurred while updating your portfolio.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 w-[850px] max-w-full shadow-lg overflow-y-auto z-50 relative">
                {/* Loading overlay - positioned relative to the dialog */}
                {loading && (
                    <div className="absolute inset-0 bg-white backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Update Profile</h2>
                    <button onClick={onClose} className="text-black cursor-pointer hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="h-[2px] w-24 bg-gray-200 mb-2" />

                <div className="flex gap-x-6">
                    {/* Left side: Form */}
                    <form className="w-3/5">
                        <TextInput
                            id="link"
                            label="Telephone Number"
                            required
                            placeholder="Eg.017 614 694"
                            value={phone || ""}
                            onChange={(e) => setPhone(e.target.value || null)}
                        />

                        {session?.roleId === 1 ? (
                            <div className="mb-2">
                                <label htmlFor="major" className="block text-sm font-medium text-black">
                                    Major<span className="text-red-400 ml-2">*</span>
                                </label>
                                <select
                                    id="major"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                    required
                                    value={selectedMajor || ""}
                                    onChange={(e) => setSelectedMajor(Number(e.target.value) || null)}
                                >
                                    <option value="" disabled>Select Major</option>
                                    <option value="1">Computer Science</option>
                                    <option value="2">Management of Information Systems</option>
                                    <option value="3">Digital Art and Designs</option>
                                </select>
                            </div>
                        )
                            :
                            <div></div>
                        }


                        {session?.roleId === 1 ? (
                            <div className="mb-2">
                                <label htmlFor="workingStatus" className="block text-sm font-medium text-black">
                                    <span className="text-red-400 ml-2">*</span>
                                </label>
                                <select
                                    id="workingStatus"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                    required
                                    value={selectedWorkingStatus || ""}
                                    onChange={(e) => setSelectedWorkingStatus(Number(e.target.value) || null)}
                                >
                                    <option value="" disabled>Select Working Status</option>
                                    <option value="1">Working</option>
                                    <option value="2">Open for Work</option>
                                </select>
                            </div>
                        ) :
                            <div></div>
                        }


                        <BigTextInput
                            id="about"
                            label="About Me"
                            required
                            value={about || ""}
                            onChange={(e) => setAbout(e.target.value || null)}
                            placeholder="Eg.I am a student at Paragon International University, majoring in Computer Science. I have learned various programming languages and software development methodologies."
                        />
                        {error && (
                            <div className="text-red-500 text-sm ">
                                {error}
                            </div>
                        )}
                    </form>

                    {/* Right side: Image Upload */}
                    <div className="w-2/5">
                        <label className="block text-sm font-medium text-black mb-1">Upload Images</label>
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="px-4 py-2 bg-[#EFEFEF] rounded hover:bg-black mb-2 text-black w-full hover:text-white"
                        >
                            Upload Images
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />

                        {imagePreviews.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {imagePreviews.map((src, index) => (
                                    <div key={index} className="relative">
                                        <Image
                                            src={src}
                                            alt={`Selected ${index + 1}`}
                                            width={300}
                                            height={300}
                                            className=" aspect-square object-cover rounded shadow mx-auto"
                                            unoptimized
                                        />
                                        <div
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-0 right-0 text-red-500 p-1 rounded-full"
                                        >
                                            <i className="fas fa-times"></i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 hover:cursor-pointer"
                        onClick={handleOnEdit}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPortfolioDialog;