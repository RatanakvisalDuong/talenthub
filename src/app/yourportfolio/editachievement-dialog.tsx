import { Achievement } from "@/app/type/achievement";
import React, { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import TextInput from "@/components/textinput/textInput";
import BigTextInput from "../../components/bigtextinput/bigtextinput";
import SelectMonthInput from "@/components/selectMonthInput/selectMonthInput";
import EndorserInput from "@/components/endorsementInput/endorsementInput";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
    achievement: Achievement;
    onClose: () => void;
    onSave: (updatedAchievement: Achievement) => void;
    onDelete?: (deletedAchievementId: number) => void;
    setSuccessMessage: (message: string) => void;
};

const EditCertificateDialog: React.FC<Props> = ({ achievement, onClose, onSave, setSuccessMessage, onDelete }) => {
    const router = useRouter();
    // const [editedAchievement, setEditedAchievement] = useState<Achievement>(achievement);
    const session = useSession();

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectIssuedMonth, setSelectIssuedMonth] = useState<string>("");
    const [selectIssuedYear, setSelectIssuedYear] = useState<string>("");
    const [organization, setOrganization] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [endorsers, setEndorsers] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState<string>("");

    const handleEndorserChange = (endorsers: string[]) => {
        setEndorsers(endorsers);
    };


    const imagePreviews = useMemo(() => {
        return imageFiles.map((file) => URL.createObjectURL(file));
    }, [imageFiles]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFiles = Array.from(files);

        setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
        event.target.value = "";
    };

    const handleRemoveImage = (index: number) => {
        setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleSelectMonthMonthChange = (value: string | null) => {
        setSelectIssuedMonth(value ? value : "");
    };

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    //     setEditedAchievement({
    //         ...editedAchievement,
    //         [field]: e.target.value,
    //     });
    // };

    const handleSave = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("issued_by", organization);
            formData.append("issue_month", selectIssuedMonth);
            formData.append("issue_year", selectIssuedYear);
            for (let i = 0; i < endorsers.length; i++) {
                formData.append(`endorsers[]`, endorsers[i]);
            }
            if (imageFiles.length > 0) {
                formData.append('image', imageFiles[0]);
            }
            
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}update_achievement/${achievement.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${session?.data?.accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const updateAchievement: Achievement = {
                ...achievement,
                title: response.data.title,
                description: response.data.description,
                issued_by: response.data.issued_by,
                issue_month: response.data.issue_month,
                issue_year: response.data.issue_year,
                endorsers: response.data.endorsers,
                image: response.data.photo,
            }
            
            if (response.status === 200) {
                router.refresh();
                onSave(updateAchievement);
                setSuccessMessage("Achievement updated successfully.");
                onClose();
            } else {
                setError("Failed to update achievement.");
            }
        }
        catch (error) {
            console.error("Error saving achievement:", error);
            setError("An error occurred while saving the achievement.");

        }
    };

    const handleDeleteAchievement = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}delete_achievement/${achievement.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.data?.accessToken}`,
                },
            });

            if (response.status === 200) {
                router.refresh();
                onDelete?.(achievement.id);
                setSuccessMessage("Achievement deleted successfully.");
                onClose();
            } else {
                setError("Failed to delete achievement.");
            }
        } catch (error) {
            console.error("Error deleting achievement:", error);
            setError("An error occurred while deleting the achievement.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setDescription(achievement.description);
        setTitle(achievement.title);
        setSelectIssuedMonth(achievement.issue_month);
        setSelectIssuedYear(achievement.issue_year);
        setOrganization(achievement.issued_by);
        setEndorsers(achievement.endorsers ? achievement.endorsers.map(e=>e.email) : []);
    }, [achievement]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
            <div className={`relative bg-white rounded-md p-6 w-[850px] max-w-full shadow-lg z-50 relative ${showDeleteConfirmation ? "blur-sm" : ""}`}>
            {loading && (
                    <div className="absolute inset-0 bg-white backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-black hover:text-red-500"
                    aria-label="Close dialog"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-bold">Edit Certificate</h2>

                <div className="flex gap-x-6">
                    <form className="w-3/5">
                        <TextInput
                            id="link"
                            label="Title of Achievement or Certificate"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="Eg.Certificate of Completion in Web Development"
                        />

                        <TextInput
                            id="link"
                            label="Issued by Organization"
                            required
                            onChange={(e) => setOrganization(e.target.value)}
                            value={organization}
                            placeholder="Eg.Coursera, Udemy, etc."
                        />

                        <div className="flex justify-between gap-2">
                            <div className="mb-2 w-1/2">
                                <SelectMonthInput
                                    label="Issued Month"
                                    id="issuedMonth"
                                    required={true}
                                    onChange={handleSelectMonthMonthChange}
                                    value={selectIssuedMonth}
                                />
                            </div>
                            <div className="mb-2 w-1/2">
                                <label htmlFor="issuedYear" className="block text-sm font-medium text-black">
                                    Issued Year<span className="text-red-400 ml-2">*</span>
                                </label>
                                <select
                                    id="issuedYear"
                                    value={selectIssuedYear}
                                    onChange={(e) => setSelectIssuedYear(e.target.value)}
                                    // defaultValue={''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                >
                                    <option value="" disabled>Select Year</option>
                                    {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* <TextEditor id="instruction" required={true} label="Project Instruction" /> */}

                        <BigTextInput
                            id="description"
                            label="Description"
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder="Eg.I completed a course on Web Development, covering HTML, CSS, and JavaScript."
                        />

                        <EndorserInput onEndorserChange={handleEndorserChange} existingEndorsers={endorsers} />

                        {error && (
                            <div className="text-red-500 text-sm ">
                                {error}
                            </div>
                        )}
                    </form>


                    {/* Right side: Multiple Image Upload */}
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
                            multiple
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />

                        <div className="flex flex-wrap gap-2 mt-2">
                            {imagePreviews.length > 0 ? (
                                imagePreviews.map((src, index) => (
                                    <div key={index} className="relative">
                                        <Image
                                            src={src}
                                            alt={`Selected ${index + 1}`}
                                            width={300}
                                            height={300}
                                            className="object-cover rounded shadow mx-auto"
                                            unoptimized
                                        />
                                        <div
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-0 right-0 text-red-500 p-1 rounded-full"
                                        >
                                            <i className="fas fa-times"></i>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="relative">
                                    <Image
                                        src={achievement.image}
                                        alt="Achievement Image"
                                        width={300}
                                        height={300}
                                        className="object-cover rounded shadow mx-auto"
                                        unoptimized
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        type="button"
                        className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => setShowDeleteConfirmation(true)}
                        disabled={loading}
                    >
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>

            </div>
            {showDeleteConfirmation && (
                <div className="fixed inset-0 z-60 flex items-center justify-center">
                    <div className="bg-white rounded-md shadow-lg p-6 w-[400px] text-center">
                        <p className="text-lg font-semibold mb-4 text-red-600">Confirm Delete</p>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete this education entry? This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                onClick={handleDeleteAchievement}
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Yes, Delete"}
                            </button>
                            <button
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                                onClick={() => setShowDeleteConfirmation(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditCertificateDialog;
