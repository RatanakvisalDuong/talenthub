"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import EndorserInput from "@/components/endorsementInput/endorsementInput";
import SelectMonthInput from "@/components/selectMonthInput/selectMonthInput";
import TextInput from "@/components/textinput/textInput";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import CompanyInput from "@/components/companyInput/companyInput";
import { Experience } from "../type/experience";

const AddExperienceDialog = ({
  isOpen,
  onClose,
  onClick,
  portfolioId,
  setExperienceData,
  setSuccessMessage,
}: {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  portfolioId: number;
  setSuccessMessage: (message: string) => void;
  setExperienceData: React.Dispatch<React.SetStateAction<Experience[]>>;
}) => {
  const session = useSession();

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleAddExperience = async () => {
    setLoading(true);

    if (!jobTitle || !companyName || !jobDescription || !startYear || !selectedStartMonth || !employmentType || (!isPresent && (selectedEndMonth === "" || endYear === ""))) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    console.log("Endorsers:", endorsers);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}create_experience`,
        {
          portfolio_id: portfolioId,
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
        const experience: Experience = {
          id: response.data.experience.id,
          portfolio_id: portfolioId,
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
          
        setExperienceData(prevExperience => [...prevExperience, experience]);

        setSuccessMessage("Experience created successfully");
        setLoading(false);
        onClose(); 
      }
    } catch (error) {
      console.error("Error creating experience:", error);
      setLoading(false);
      setError("Failed to create experience. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-md p-6 w-[700px] h-[650px] max-w-full shadow-lg overflow-y-auto z-50 relative">
        {loading && (
          <div className="absolute inset-0 bg-white backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-black">Create New Experience</h2>
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
                defaultValue={""}
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
                  defaultValue={""}
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
                    defaultValue={""}
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
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
            onClick={handleAddExperience}
          >
            Create Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExperienceDialog;
