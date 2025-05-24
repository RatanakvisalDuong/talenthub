"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import EndorserInput from "@/components/endorsementInput/endorsementInput";
import SelectMonthInput from "@/components/selectMonthInput/selectMonthInput";
import TextInput from "@/components/textinput/textInput";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CompanyInput from "@/components/companyInput/companyInput";
import { Experience } from "../type/experience";
import { Endorser } from "../type/endorser";
import { useRouter } from "next/navigation";

const EditExperienceDialog = ({
    isOpen,
    onClose,
    handleExperienceUpdate,
    setSuccessMessage,
    existingExperience,
    endorser
}: {
    isOpen: boolean;
    onClose: () => void;
    handleExperienceUpdate: React.Dispatch<React.SetStateAction<Experience[]>>
    setSuccessMessage: (message: string) => void;
    existingExperience: Experience | null;
    endorser: Endorser[] | [];
}) => {
    const session = useSession();
    const router = useRouter();

    const [jobTitle, setJobTitle] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");
    const [startYear, setStartYear] = useState<string>("");
    const [endYear, setEndYear] = useState<string>("");
    const [employmentType, setEmploymentType] = useState<string>("");

    const [isPresent, setIsPresent] = useState(false);
    const [selectedStartMonth, setSelectedStartMonth] = useState<string>("");
    const [selectedEndMonth, setSelectedEndMonth] = useState<string>("");
    const [endorsers, setEndorsers] = useState<string[]>([]);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (existingExperience) {
            setJobTitle(existingExperience.work_title);
            setCompanyName(existingExperience.company_name);
            setJobDescription(existingExperience.description);
            setStartYear(existingExperience.start_year);
            setEndYear(existingExperience.end_year ? existingExperience.end_year : "");
            setEmploymentType(existingExperience.employment_type);
            setSelectedStartMonth(existingExperience.start_month);
            setSelectedEndMonth(existingExperience.end_month ? existingExperience.end_month : "");
            setEndorsers(existingExperience.endorsers ? existingExperience.endorsers.map(e => e.email) : []);
        }
    }, [existingExperience]);  // Ensure this runs when existingExperience changes

    const handleCompanyNameChange = (newCompany: string) => {
        setCompanyName(newCompany);
    };

    const handleEndorserChange = (endorsers: string[]) => {
        setEndorsers(endorsers);
    };

    const handleSelectStartMonthChange = (value: string | null) => {
        setSelectedStartMonth(value ? value : "");
    };

    const handleSelectEndMonthChange = (value: string | null) => {
        setSelectedEndMonth(value ? value : "");
    };

    const handleUpdateExperience = async () => {
        setLoading(true);
        if (!jobTitle || !companyName || !jobDescription || !startYear || !selectedStartMonth || !employmentType || (!isPresent && (selectedEndMonth === "" || endYear === ""))) {
            setError("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const startMonthIndex = months.indexOf(selectedStartMonth);
        const endMonthIndex = months.indexOf(selectedEndMonth);

        if (!isPresent) {
            if (parseInt(startYear) > parseInt(endYear)) {
                setError("Start year cannot be greater than end year.");
                setLoading(false);
                return;
            }
            if (parseInt(startYear) === parseInt(endYear) && startMonthIndex > endMonthIndex) {
                setError("Start month cannot be greater than end month in the same year.");
                setLoading(false);
                return;
            }
        }

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}update_experience/${existingExperience?.id}`,
                {
                    portfolio_id: existingExperience?.portfolio_id,
                    id: existingExperience?.id,
                    company_name: companyName,
                    work_title: jobTitle,
                    employment_type: employmentType,
                    description: jobDescription,
                    start_month: selectedStartMonth,
                    start_year: startYear,
                    end_month: isPresent ? null : selectedEndMonth,
                    end_year: isPresent ? null : endYear,
                    endorsers: endorsers,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.data?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status == 200) {

                const updatedExperience: Experience = {
                    id: existingExperience?.id || 0,
                    portfolio_id: existingExperience?.portfolio_id || 0,
                    company_name: companyName,
                    work_title: jobTitle,
                    employment_type: employmentType,
                    description: jobDescription,
                    start_month: selectedStartMonth,
                    start_year: startYear,
                    end_month: isPresent ? null : selectedEndMonth,
                    end_year: isPresent ? null : endYear,
                    endorsers: response.data.endorsers,
                }
                router.refresh();

                handleExperienceUpdate((prev) =>
                    prev.map((experience) => (experience.id === existingExperience?.id ? updatedExperience : experience))
                );

                setSuccessMessage("Experience updated successfully");
                setLoading(false);
                onClose();
            }
        } catch (error) {
            console.error("Error updating experience:", error);
            setLoading(false);
            setError("Failed to update experience. Please try again.");
        }
    };

    const handleDeleteExperience = async () => {
        setDeleteLoading(true); // Show loading state for deletion

        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}delete_experience/${existingExperience?.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${session?.data?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.message === 'Experience and related data deleted successfully.') {
                router.refresh();
                handleExperienceUpdate((prev) => prev.filter((s) => s.id !== existingExperience?.id));
                setSuccessMessage("Experience deleted successfully!");
                setShowDeleteConfirmation(false);
                setDeleteLoading(false);
                onClose();
            }
        } catch (error) {
            setDeleteLoading(false);
            console.error("Error deleting experience:", error);
            setError("Failed to delete experience. Please try again.");
        }
    };

    useEffect(() => {
        if (existingExperience?.end_month === null && existingExperience?.end_year === null) {
            setIsPresent(true);
        }
    }, [existingExperience]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {loading ? (
                <div className={`bg-white rounded-xl p-6 w-[700px] h-[650px] max-w-full shadow-lg overflow-y-auto z-50 relative flex items-center justify-center`}>
                    <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
            ) : <div>
                <div className={`bg-white rounded-xl p-6 w-[700px] h-[650px] max-w-full shadow-lg overflow-y-auto z-50 relative ${showDeleteConfirmation ? "blur-sm" : ""}`}>
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-black">Update Experience</h2>
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
                                id="title"
                                label="Job Title"
                                required
                                placeholder="Eg. Penetration Tester"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                            />

                            <CompanyInput inputValue={companyName} onInputChange={handleCompanyNameChange} />

                            <div className="mb-2">
                                <label htmlFor="jobTitle" className="block text-sm font-medium text-black">
                                    Employment Type<span className="text-red-400 ml-2">*</span>
                                </label>
                                <select
                                    id="jobTitle"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                    value={employmentType}
                                    onChange={(e) => setEmploymentType(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select Employment Type
                                    </option>
                                    <option value="Internship">Internship</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                            </div>

                            <BigTextInput
                                id="description"
                                label="Description"
                                required
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Eg. Perform penetration testing on various systems and networks to identify vulnerabilities and recommend security improvements."
                                value={jobDescription}
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
                                        value={startYear}
                                        onChange={(e) => setStartYear(e.target.value)}
                                    >
                                        <option value="" disabled>Select Year</option>
                                        {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {/* Present Checkbox */}
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

                            {/* End Month */}
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
                                            value={endYear}
                                            onChange={(e) => setEndYear(e.target.value)}
                                        >
                                            <option value="" disabled>Select Year</option>
                                            {Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            <EndorserInput onEndorserChange={handleEndorserChange} existingEndorsers={endorsers} />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </form>
                    </div>
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
                            type="submit"
                            className="ml-auto text-white bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 hover:cursor-pointer"
                            onClick={handleUpdateExperience}
                        >
                            Update Experience
                        </button>
                    </div>


                </div>
                {showDeleteConfirmation && (
                    <div className="fixed inset-0 z-60 flex items-center justify-center">
                        <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] text-center">
                            <p className="text-lg font-semibold mb-4 text-red-600">Confirm Delete</p>
                            <p className="text-gray-700 mb-6">Are you sure you want to delete this experience entry? This action cannot be undone.</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer"
                                    onClick={() => setShowDeleteConfirmation(false)}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 hover:cursor-pointer"
                                    onClick={handleDeleteExperience}
                                    disabled={loading}
                                >
                                    {loading ? "Deleting..." : "Yes, Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}</div>}

        </div>
    );
};

export default EditExperienceDialog;
