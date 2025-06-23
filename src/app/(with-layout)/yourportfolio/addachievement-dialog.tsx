"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import TextInput from "@/components/textinput/textInput";
import Image from "next/image";
import axios from "axios";
import { useRef, useState, useMemo } from "react";
import EndorserInput from "@/components/endorsementInput/endorsementInput";
import SelectMonthInput from "@/components/selectMonthInput/selectMonthInput";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddCertificateDialog = ({ isOpen, onClose, onClick, portfolioId, handleUpdatedAchievement, setSuccessMessage }: { isOpen: boolean; onClose: () => void; onClick: () => void; portfolioId: number; handleUpdatedAchievement: (updatedAchievement: any) => void; setSuccessMessage: (message: string) => void; }) => {
    const router = useRouter();
    const session = useSession();
    const [imageFile, setImageFile] = useState<File | null>(null);
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

    const imagePreview = useMemo(() => {
        return imageFile ? URL.createObjectURL(imageFile) : null;
    }, [imageFile]);

    if (!isOpen) return null;

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setImageFile(files[0]);
        event.target.value = "";
    };

    const handleSelectMonthMonthChange = (value: string | null) => {
        setSelectIssuedMonth(value ? value : "");
    };

    const handleAddAchievement = async () => {
        if (title === "" || organization === "" || description === "" || selectIssuedMonth === "" || selectIssuedYear === "" || !imageFile) {
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
        formData.append('image', imageFile);

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
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl p-6 h-[650px] w-[850px] max-w-full shadow-lg overflow-y-auto z-50 relative">
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
                            id="title"
                            label="Title of Achievement or Certificate"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="Eg. Certificate of Completion in Web Development"
                        />

                        <TextInput
                            id="organization"
                            label="Issued by Organization"
                            required
                            onChange={(e) => setOrganization(e.target.value)}
                            value={organization}
                            placeholder="Eg. Coursera, Udemy, etc."
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                >
                                    <option value="" disabled>Select Year</option>
                                    {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <BigTextInput
                            id="description"
                            label="Description"
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder="Eg. I completed a course on Web Development, covering HTML, CSS, and JavaScript."
                        />

                        <EndorserInput onEndorserChange={handleEndorserChange} existingEndorsers={endorsers} />
                        {error && (
                            <div className="text-red-500 text-sm">
                                {error}
                            </div>
                        )}
                    </form>

                    {/* Right side: Single Image Upload */}
                    <div className="w-2/5">
                        <label className="block text-sm font-medium text-black mb-1">Upload Certificate Image<span className="text-red-600 ml-2">*</span></label>
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="px-4 py-2 bg-[#EFEFEF] rounded hover:bg-black mb-2 text-black w-full hover:text-white"
                        >
                            {imageFile ? "Change Image" : "Upload Image (MAX 4MB)"}
                        </button>

                        <div className="flex items-start p-1 mb-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <svg className="w-3 h-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <div className="text-xs text-yellow-500">
                                <p>Please upload your certificate.</p>
                                <p>Accepted formats: JPEG, PNG, JPG, GIF, SVG (Max 4MB)</p>
                            </div>
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />

                        {imagePreview && (
                            <div className="mt-2 relative">
                                <Image
                                    src={imagePreview}
                                    alt="Certificate Image"
                                    width={300}
                                    height={300}
                                    className="object-contain rounded shadow mx-auto"
                                    unoptimized
                                />
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