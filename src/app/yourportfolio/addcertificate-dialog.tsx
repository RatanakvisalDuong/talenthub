"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import TextInput from "@/components/textinput/textInput";
import Image from "next/image";
import { useRef, useState, useMemo } from "react";
import TextEditor from "./text-editor";
import { allLanguages } from "@/dummydata/programmingLanguages";
import EndorserInput from "@/components/endorsementInput/endorsementInput";
import SelectMonthInput from "@/components/selectMonthInput/selectMonthInput";

const AddCertificateDialog = ({ isOpen, onClose, onClick }: { isOpen: boolean; onClose: () => void; onClick: () => void }) => {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [languageInput, setLanguageInput] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectIssuedMonth, setSelectIssuedMonth] = useState<string>("");

    const handleEndorserChange = (endorsers: string[]) => {
    };

    const filteredSuggestions = allLanguages.filter(
        (lang) =>
            lang.name.toLowerCase().includes(languageInput.toLowerCase()) &&
            !selectedLanguages.includes(lang.name)
    );

    const handleSelectLanguage = (lang: string) => {
        if (!selectedLanguages.includes(lang)) {
            setSelectedLanguages([...selectedLanguages, lang]);
        }
        setLanguageInput("");
    };


    const handleRemoveLanguage = (lang: string) => {
        setSelectedLanguages(selectedLanguages.filter((l) => l !== lang));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && languageInput.trim()) {
            e.preventDefault();

            const newLang = languageInput.trim();

            if (!selectedLanguages.includes(newLang)) {
                setSelectedLanguages((prev) => [...prev, newLang]);
            }

            setLanguageInput("");
        }
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

        const combined = [...imageFiles, ...newFiles].slice(0, 1);
        setImageFiles(combined);
    };

    const handleRemoveImage = (index: number) => {
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    };

    const handleSelectMonthMonthChange = (value: string | null) => {
        setSelectIssuedMonth(value ? value : "");
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 w-[850px] max-w-full shadow-lg h-max overflow-y-auto">
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
                            placeholder="Eg.Certificate of Completion in Web Development"
                        />

                        <TextInput
                            id="link"
                            label="Issued by Organization"
                            required
                            placeholder="Eg.Coursera, Udemy, etc."
                        />

                        {/* <BigTextInput
                            id="description"
                            label="Project Description"
                            required
                            placeholder="Eg.A portfolio platform for ParagonIU students"
                        /> */}

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
                            placeholder="Eg.I completed a course on Web Development, covering HTML, CSS, and JavaScript."
                        />

                        {/* <EndorserInput onEndorserChange={handleEndorserChange} existingEndorsers={Endoser}/> */}
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
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={onClick}
                    >
                        Create Certificate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCertificateDialog;
