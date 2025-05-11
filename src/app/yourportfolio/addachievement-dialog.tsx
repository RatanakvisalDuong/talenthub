"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import TextInput from "@/components/textinput/textInput";
import Image from "next/image";
import axios from "axios";
import { useRef, useState, useMemo, useEffect } from "react";
import EndorserInput from "@/components/endorsementInput/endorsementInput";
import SelectMonthInput from "@/components/selectMonthInput/selectMonthInput";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddCertificateDialog = ({ isOpen, onClose, onClick, portfolioId, handleUpdatedAchievement, setSuccessMessage }: { isOpen: boolean; onClose: () => void; onClick: () => void; portfolioId: number; handleUpdatedAchievement: (updatedAchievement: any) => void; setSuccessMessage: (message: string) => void; }) => {
    const router = useRouter();
    const session = useSession();
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

    if (!isOpen) return null;

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

    const handleAddAchievement = async () => {
        console.log('test')
        if (title === "" || organization === "" || description === "" || selectIssuedMonth === "" || selectIssuedYear === "" || imageFiles.length === 0) {
            setError("Please fill in all required fields.");
            return;
        }
        if (endorsers.some(endorser => endorser === session?.data?.user?.email)) {
            setError("You cannot endorse your own achievement.");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("portfolio_id", portfolioId.toString());
        formData.append("title", title);
        formData.append("issued_by", organization);
        formData.append("description", description);
        formData.append("issue_month", selectIssuedMonth);
        formData.append("issue_year", selectIssuedYear);
        formData.append('image', imageFiles[0]);

        for (let i = 0; i < endorsers.length; i++) {
            formData.append(`endorsers[]`, endorsers[i]);
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}create_achievement`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${session?.data?.accessToken}`,
                    },
                },
            );
            console.log(response)
            if (response.status === 200) {
                const achievement = {
                    id: response.data.achievement_id,
                    portfolio_id: portfolioId,
                    title: title,
                    issued_by: organization,
                    issue_month: selectIssuedMonth,
                    issue_year: selectIssuedYear,
                    description: description,
                    image: response.data.photo,
                    endorsers: endorsers,
                };
                router.refresh();
                handleUpdatedAchievement(achievement);
                setSuccessMessage("Achievement created successfully!");
                onClose();
            } else {
                setError("Failed to create achievement.");
            }
        }
        catch (error) {
            setError("Failed to create achievement.");
        }
        finally {
            setLoading(false);
        }
        // onClose();
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-[850px] max-w-full shadow-lg h-max overflow-y-auto z-50 relative">
                {loading && (
                    <div className="absolute inset-0 bg-white backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Create New Achievement or Certificate</h2>
                    <button onClick={onClose} className="text-black cursor-pointer hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="h-[2px] w-24 bg-gray-200 mb-2" />

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

                        {imagePreviews.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {imagePreviews.map((src, index) => (
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
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 hover:cursor-pointer"
                        onClick={handleAddAchievement}
                    >
                        Create Achievement or Certificate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCertificateDialog;
