"use client";

import TextInput from "@/components/textinput/textInput";

// import Image from "next/image";
// import { useRef, useState, useMemo } from "react";

const AddExperienceDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    // const [imageFiles, setImageFiles] = useState<File[]>([]);
    // const fileInputRef = useRef<HTMLInputElement>(null);
  
    // const imagePreviews = useMemo(() => {
    //   return imageFiles.map((file) => URL.createObjectURL(file));
    // }, [imageFiles]);
  
    if (!isOpen) return null;
  
    // const handleImageClick = () => {
    //   fileInputRef.current?.click();
    // };
  
    // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const files = event.target.files;
    //   if (!files) return;
  
    //   const newFiles = Array.from(files);
  
    //   const combined = [...imageFiles, ...newFiles].slice(0, 6);
    //   setImageFiles(combined);
    // };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 w-[700px] max-w-full shadow-lg h-[600px] overflow-y-auto">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Add New Experience</h2>
                    <button onClick={onClose} className="text-black">
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
                            placeholder="Enter your job title"
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

                        {/* <div className="mb-1">
                            <label htmlFor="description" className="block text-sm font-medium text-black">
                                Project Description<span className="text-red-400 ml-2">*</span>
                            </label>
                            <textarea
                                id="description"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black h-20 text-sm resize-none"
                                placeholder="Project Description"
                            />
                        </div> */}

                        <div className="flex justify-between gap-2">
                            <div className="mb-2 w-1/2">
                                <label htmlFor="language" className="block text-sm font-medium text-black">
                                    Start Month<span className="text-red-400 ml-2">*</span>
                                </label>
                                <select
                                id="jobTitle"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                            >
                                <option value="" disabled>
                                    Select Month
                                </option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                            </div>
                            <div className="mb-2 w-1/2">
                                <label htmlFor="language" className="block text-sm font-medium text-black">
                                    Start Year<span className="text-red-400 ml-2">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="language"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                    placeholder="Java, Python, C++"
                                />
                            </div>
                        </div>

                        

                        {/* <div className="mb-2">
                            <label htmlFor="link" className="block text-sm font-medium text-black">
                                Project Link<span className="text-red-400 ml-2">*</span>
                            </label>
                            <input
                                type="text"
                                id="link"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                placeholder="https://github.com/yourname/project"
                            />
                        </div> */}

                        <TextInput
                            id="link"
                            label="Project Link"
                            required
                            placeholder="Enter project link"
                        />

                        <div className="mb-2">
                            <label htmlFor="link" className="block text-sm font-medium text-black">
                                Project File
                            </label>
                            <input
                                type="file"
                                id="file"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                placeholder="Choose File"
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="link" className="block text-sm font-medium text-black">
                                Endorser
                            </label>
                            <input
                                type="text"
                                id="link"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                placeholder="Enter Endorser Email"
                            />
                        </div>

                    </form>

                    {/* Right side: Multiple Image Upload */}
                    {/* <div className="w-1/2">
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
                                    <Image
                                        key={index}
                                        src={src}
                                        alt={`Selected ${index + 1}`}
                                        width={96}
                                        height={96}
                                        className="object-cover rounded shadow"
                                        unoptimized
                                    />
                                ))}
                            </div>
                        )}
                    </div> */}
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Add Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddExperienceDialog;
