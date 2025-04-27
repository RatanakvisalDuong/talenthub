"use client"

import React, { useState } from 'react';

import BigTextInput from "../../components/bigtextinput/bigtextinput";
import TextInput from "../../components/textinput/textInput";
import SelectMonthInput from '@/components/selectMonthInput/selectMonthInput';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Education } from '../type/education';
import { useRouter } from 'next/navigation';

const AddEducationDialog = ({ isOpen, onClose, onClick, portfolioId, setSuccessMessage, setEducationData }: { isOpen: boolean; onClose: () => void; onClick: () => void; portfolioId: number;setSuccessMessage: (message: string) => void; setEducationData: React.Dispatch<React.SetStateAction<Education[]>>;}) => {

    const { data: session} = useSession();
    const router = useRouter();

    const [isPresent, setIsPresent] = useState(false);
    const [selectedStartMonth, setSelectedStartMonth] = useState<string>("");
    const [selectedEndMonth, setSelectedEndMonth] = useState<string>("");
    const [educationCenter, setEducationCenter] = useState<string>("");
    const [fieldOfStudy, setFieldOfStudy] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startYear, setStartYear] = useState<string>("");
    const [endYear, setEndYear] = useState<string>("");


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSelectStartMonthChange = (value: string | null) => {
        setSelectedStartMonth(value ? value : "");
    };

    const handleSelectEndMonthChange = (value: string | null) => {
        setSelectedEndMonth(value ? value : "");
    }

    const handleAddEducation = async () => {
        try {
            if (
                educationCenter === "" ||
                fieldOfStudy === "" ||
                description === "" ||
                selectedStartMonth === "" ||
                startYear === "" ||
                (!isPresent && (selectedEndMonth === "" || endYear === ""))
            ) {
                setError("Please fill in all required fields.");
                return;
            }
            else {
                setError(null);
            }
            setLoading(true);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}create_education`,
                {
                    portfolio_id: portfolioId,
                    education_center: educationCenter,
                    field_of_study: fieldOfStudy,
                    description: description,
                    start_year: startYear,
                    end_year: isPresent ? null : endYear,
                    start_month: selectedStartMonth,
                    end_month: isPresent ? null : selectedEndMonth,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response)

            if (response.status === 200) {
                const education: Education = {
                    id: response.data.education.id,
                    portfolio_id: portfolioId,
                    education_center: educationCenter,
                    field_of_study: fieldOfStudy,
                    description: description,
                    start_year: startYear,
                    end_year: isPresent ? null : endYear,
                    start_month: selectedStartMonth,
                    end_month: isPresent ? null : selectedEndMonth,
                };
                router.refresh();
                setEducationData((prev) => [...prev, education]);
                setSuccessMessage("Education created successfully!");
                setLoading(false);
                onClose();
            }
        } catch (error) {
            console.error("Error creating education:", error);
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 w-[700px] max-w-full shadow-lg overflow-y-auto z-50 relative">
            {loading && (
                    <div className="absolute inset-0 bg-white backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Create New Education</h2>
                    <button onClick={onClose} className="text-black cursor-pointer hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="h-[2px] w-24 bg-gray-200 mb-2" />

                <div className="flex gap-x-6">
                    <form className="w-full">

                        <TextInput
                            id="educationCenter"
                            label="Education Center"
                            required
                            placeholder="Eg.Paragon International University"
                            value={educationCenter}
                            onChange={(e) => setEducationCenter(e.target.value)}
                        />

                        <TextInput
                            id="fieldOfStudy"
                            label="Field of Study"
                            required
                            placeholder="Eg.Computer Science"
                            value={fieldOfStudy}
                            onChange={(e) => setFieldOfStudy(e.target.value)}
                        />

                        <div className="flex justify-between gap-2">
                            <div className="mb-2 w-1/2">
                                <SelectMonthInput
                                    label="Start Month"
                                    id="startMonth"
                                    required={true}
                                    onChange={handleSelectStartMonthChange}
                                    value={selectedStartMonth}
                                />
                            </div>
                            <div className="mb-2 w-1/2">
                                <label htmlFor="startYear" className="block text-sm font-medium text-black">
                                    Start Year<span className="text-red-400 ml-2">*</span>
                                </label>
                                <select
                                    id="startYear"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                    onChange={(e) => setStartYear(e.target.value)}
                                    defaultValue={""}
                                >
                                    <option value="" disabled>Select Year</option>
                                    {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-2 w-full flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="present"
                                checked={isPresent}
                                onChange={(e) => setIsPresent(e.target.checked)}
                                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <label htmlFor="present" className="text-sm font-medium text-black">
                                Present
                            </label>
                        </div>
                        {!isPresent && (
                            <div className="flex justify-between gap-2">
                                <div className="mb-2 w-1/2">
                                    <SelectMonthInput
                                        label="End Month"
                                        id="endMonth"
                                        required={true}
                                        onChange={handleSelectEndMonthChange}
                                        value={selectedEndMonth}
                                    />
                                </div>
                                <div className="mb-2 w-1/2">
                                    <label htmlFor="endYear" className="block text-sm font-medium text-black">
                                        End Year<span className="text-red-400 ml-2">*</span>
                                    </label>
                                    <select
                                        id="endYear"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                        onChange={(e) => setEndYear(e.target.value)}
                                        defaultValue={""}
                                    >
                                        <option value="" disabled>Select Year</option>
                                        {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        )}
                        <BigTextInput
                            id="description"
                            label="Education Description"
                            required
                            placeholder="Eg.I am a student at Paragon International University, majoring in Computer Science. I have learned various programming languages and software development methodologies."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </form>
                </div>
                {error && (
                    <div className="text-red-500 text-sm ">
                        {error}
                    </div>
                )}
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 hover:cursor-pointer"
                        onClick={handleAddEducation}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Education"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddEducationDialog;
