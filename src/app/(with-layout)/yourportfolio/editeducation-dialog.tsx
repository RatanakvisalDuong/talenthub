'use client'

import React, { useEffect, useState } from 'react';
import BigTextInput from "../../../components/bigtextinput/bigtextinput";
import TextInput from "../../../components/textinput/textInput";
import SelectMonthInput from '@/components/selectMonthInput/selectMonthInput';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Education } from '../../type/education';
import { useRouter } from "next/navigation";

const EditEducationDialog = ({
    isOpen,
    onClose,
    onClick,
    portfolioId,
    setSuccessMessage,
    changeEducationData,
    existingEducationCenter,
    existingFieldOfStudy,
    existingEducationDescription,
    existingEducationId,
    exisitingSelectedStartMonth,
    exisitingSelectedStartYear,
    exisitingSelectedEndMonth,
    exisitingSelectedEndYear
}: {
    isOpen: boolean;
    onClose: () => void;
    onClick: () => void;
    portfolioId: number;
    setSuccessMessage: (message: string) => void;
    changeEducationData: React.Dispatch<React.SetStateAction<Education[]>>;
    existingEducationCenter: string;
    existingFieldOfStudy: string;
    existingEducationDescription: string;
    existingEducationId: number;
    exisitingSelectedStartMonth: string;
    exisitingSelectedStartYear: string;
    exisitingSelectedEndMonth: string;
    exisitingSelectedEndYear: string;
}) => {

    const { data: session, status } = useSession();
    const router = useRouter();

    const [educationId, setEducationId] = useState<number>(existingEducationId);
    const [isPresent, setIsPresent] = useState(false);
    const [selectedStartMonth, setSelectedStartMonth] = useState<string>(exisitingSelectedStartMonth);
    const [selectedEndMonth, setSelectedEndMonth] = useState<string>(exisitingSelectedEndMonth);
    const [educationCenter, setEducationCenter] = useState<string>(existingEducationCenter);
    const [fieldOfStudy, setFieldOfStudy] = useState<string>(existingFieldOfStudy);
    const [description, setDescription] = useState<string>(existingEducationDescription);
    const [selectedStartYear, setStartYear] = useState<string>(exisitingSelectedStartYear);
    const [selectedEndYear, setEndYear] = useState<string>(exisitingSelectedEndYear);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSelectStartMonthChange = (value: string | null) => {
        setSelectedStartMonth(value ? value : "");
    };

    const handleSelectEndMonthChange = (value: string | null) => {
        setSelectedEndMonth(value ? value : "");
    }

    useEffect(() => {
        setEducationCenter(existingEducationCenter);
        setFieldOfStudy(existingFieldOfStudy);
        setDescription(existingEducationDescription);
        setSelectedStartMonth(exisitingSelectedStartMonth);
        setStartYear(exisitingSelectedStartYear);
        setSelectedEndMonth(exisitingSelectedEndMonth);
        setEndYear(exisitingSelectedEndYear);
        setEducationId(existingEducationId);

        if (exisitingSelectedEndMonth === '' && exisitingSelectedEndYear === '') {
            setIsPresent(true);
        }

    }, [existingEducationCenter, existingFieldOfStudy, existingEducationDescription, exisitingSelectedStartMonth, exisitingSelectedStartYear, exisitingSelectedEndMonth, exisitingSelectedEndYear, existingEducationId]);

    const handleEditEducation = async () => {
        try {
            if (
                educationCenter === "" ||
                fieldOfStudy === "" ||
                description === "" ||
                selectedStartMonth === "" ||
                selectedStartYear === "" ||
                (!isPresent && (selectedEndMonth === "" || selectedEndYear === ""))
            ) {
                setError("Please fill in all required fields.");
                return;
            } else {
                setError(null);
            }

            const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            const startMonthIndex = months.indexOf(selectedStartMonth);
            const endMonthIndex = months.indexOf(selectedEndMonth);

            if (!isPresent) {
                if (parseInt(selectedStartYear) > parseInt(selectedEndYear)) {
                    setError("Start year cannot be greater than end year.");
                    setLoading(false);
                    return;
                }
                if (parseInt(selectedStartYear) === parseInt(selectedEndYear) && startMonthIndex > endMonthIndex) {
                    setError("Start month cannot be greater than end month in the same year.");
                    setLoading(false);
                    return;
                }
            }

            setLoading(true);

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}update_education/${educationId}`,
                {
                    portfolio_id: portfolioId,
                    education_center: educationCenter,
                    field_of_study: fieldOfStudy,
                    description: description,
                    start_year: selectedStartYear,
                    end_year: isPresent ? null : selectedEndYear,
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
            if (response.status === 200) {
                const education: Education = {
                    id: existingEducationId,
                    portfolio_id: portfolioId,
                    education_center: educationCenter,
                    field_of_study: fieldOfStudy,
                    description: description,
                    start_year: selectedStartYear,
                    end_year: isPresent ? null : selectedEndYear,
                    start_month: selectedStartMonth,
                    end_month: isPresent ? null : selectedEndMonth,
                };
                router.refresh();
                setSuccessMessage("Education updated successfully!");
                changeEducationData((prev) =>
                    prev.map((edu) => (edu.id === educationId ? education : edu))
                );
                setLoading(false);
                onClose();
            }
        } catch (error) {
            setLoading(false);
        }
    };

    const handleDeleteEducation = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}delete_education/${educationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                setSuccessMessage("Education deleted successfully!");
                changeEducationData((prev) => prev.filter((edu) => edu.id !== educationId));
                onClose();
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className={`bg-white rounded-xl p-6 w-[700px] max-w-full shadow-lg overflow-y-auto z-50 relative`}>
                {loading && (
                    <div className="absolute inset-0 bg-white backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Update Education</h2>
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
                            placeholder="Eg. Paragon International University"
                            value={educationCenter}
                            onChange={(e) => setEducationCenter(e.target.value)}
                        />

                        <TextInput
                            id="fieldOfStudy"
                            label="Field of Study"
                            required
                            placeholder="Eg. Computer Science"
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
                                    value={selectedStartYear}
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
                                        value={selectedEndYear}
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
                            placeholder="Eg. I am a student at Paragon International University, majoring in Computer Science."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </form>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="flex justify-between items-center mt-6">
                    <button
                        type="button"
                        className="text-white bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 hover:cursor-pointer"
                        onClick={() => setShowDeleteConfirmation(true)}
                        disabled={loading}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 hover:cursor-pointer"
                        onClick={handleEditEducation}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                </div>


            </div>
            {showDeleteConfirmation && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] text-center">
                        <p className="text-lg font-semibold mb-4 text-red-600">Confirm Delete</p>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete this education entry? This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-gray-200 text-gray-800 px-4 py-2  hover:bg-gray-300 hover:cursor-pointer rounded-xl"
                                onClick={() => setShowDeleteConfirmation(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2  hover:bg-red-700 hover:cursor-pointer rounded-xl"
                                onClick={handleDeleteEducation}
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditEducationDialog;
