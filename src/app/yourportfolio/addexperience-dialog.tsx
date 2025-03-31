"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import EndorserInput from "@/components/endorsementInput/endorsementInput";
import SelectMonthInput from "@/components/selectMonthInput/selectMonthInput";
import TextInput from "@/components/textinput/textInput";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";

const AddExperienceDialog = ({ isOpen, onClose, onClick }: { isOpen: boolean; onClose: () => void; onClick: () => void }) => {
    
    const session = useSession();

    const [isPresent, setIsPresent] = useState(false);
    const [selectedStartMonth, setSelectedStartMonth] = useState<string>("");
    const [selectedEndMonth, setSelectedEndMonth] = useState<string>("");

    const handleEndorserChange = (endorsers: string[]) => {
        console.log("Updated endorsers:", endorsers);
    };

    const handleSelectStartMonthChange = (value: string | null) => {
        setSelectedStartMonth(value ? value : "");
    };

    const handleSelectEndMonthChange = (value: string | null) => {
        setSelectedEndMonth(value ? value : "");
    }

    const handleAddExperience = async ()=>{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}create_experience`, {
            title: "Software Engineer",
            description: "Developed and maintained web applications.",
            start_month: selectedStartMonth,
            start_year: 2023,
            end_month: isPresent ? null : selectedEndMonth,
            end_year: isPresent ? null : 2024,
            is_present: isPresent,
            portfolio_id: 1,
            endorser: ["John Doe", "Jane Smith"]
        }, {
            headers: {
                Authorization: `Bearer ${session?.data?.accessToken}`,
                "Content-Type": "application/json",
            },
        });
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 w-[700px] max-w-full shadow-lg h-[600px] overflow-y-auto">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Add New Experience</h2>
                    <button onClick={onClose} className="text-black cursor-pointer hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="h-[2px] w-24 bg-gray-200 mb-2" />

                <div className="flex gap-x-6">
                    {/* Left side: Form */}
                    <form className="w-full">

                        <TextInput
                            id="title"
                            label="Job Title"
                            required
                            placeholder="Eg. Penetration Tester"
                        />

                        <div className="mb-2">
                            <label htmlFor="jobTitle" className="block text-sm font-medium text-black">
                                Employment Type<span className="text-red-400 ml-2">*</span>
                            </label>
                            <select
                                id="jobTitle"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
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
                            placeholder="Eg. Perform penetration testing on various systems and networks to identify vulnerabilities and recommend security improvements."
                        />

                        <div className="flex justify-between gap-2">
                            <div className="mb-2 w-1/2">
                                <SelectMonthInput
                                    label="Start Month"
                                    id="startMonth"
                                    required={true}
                                    onChange={handleSelectStartMonthChange}
                                />
                            </div>
                            <div className="mb-2 w-1/2">
                                <label htmlFor="startYear" className="block text-sm font-medium text-black">
                                    Start Year<span className="text-red-400 ml-2">*</span>
                                </label>
                                <select
                                    id="startYear"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                    defaultValue={""}
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
                                />
                            </div>
                            <div className="mb-2 w-1/2">
                                <label htmlFor="endYear" className="block text-sm font-medium text-black">
                                    End Year<span className="text-red-400 ml-2">*</span>
                                </label>
                                <select
                                    id="endYear"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
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

                        <EndorserInput onEndorserChange={handleEndorserChange} />

                    </form>
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={onClick}
                    >
                        Add Experience
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddExperienceDialog;
