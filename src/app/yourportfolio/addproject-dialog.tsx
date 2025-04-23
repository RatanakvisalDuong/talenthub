"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import TextInput from "@/components/textinput/textInput";
import Image from "next/image";
import { useRef, useState, useMemo } from "react";
import TextEditor from "./text-editor";
import { allLanguages } from "@/dummydata/programmingLanguages";
import EndorserInput from "@/components/endorsementInput/endorsementInput";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProjectDialog = ({ isOpen, onClose, onClick }: { isOpen: boolean; onClose: () => void; onClick: () => void }) => {
    const router = useRouter();
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [languageInput, setLanguageInput] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [endorsers, setEndorsers] = useState<string[]>([]);
    const [editorContent, setEditorContent] = useState<string>();

    const handleEndorserChange = () => {
        setEndorsers(endorsers);
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

        const combined = [...imageFiles, ...newFiles].slice(0, 6);
        setImageFiles(combined);
    };

    const handleRemoveImage = (index: number) => {
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    };

    const handleAddProject = async () => {
        // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}create_project`, {
        // })
        console.log(editorContent)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 w-[850px] max-w-full shadow-lg h-[650px] overflow-y-auto">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Create New Project</h2>
                    <button onClick={onClose} className="text-black cursor-pointer hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="h-[2px] w-24 bg-gray-200 mb-2" />

                <div className="flex gap-x-6">
                    {/* Left side: Form */}
                    <form className="w-3/5">
                        <TextInput
                            id="link"
                            label="Project Title"
                            required
                            placeholder="Eg.TalentHub"
                        />

                        <BigTextInput
                            id="description"
                            label="Project Description"
                            required
                            placeholder="Eg.A portfolio platform for ParagonIU students"
                        />

                        <TextEditor
                            id="myEditor"
                            label="My Editor"
                            value={editorContent}
                            onChange={(html) => setEditorContent(html)}
                        />

                        <div className="mb-2 relative">
                            <label htmlFor="language" className="block text-sm font-medium text-black">
                                Programming Language
                            </label>
                            <input
                                type="text"
                                id="language"
                                value={languageInput}
                                onChange={(e) => setLanguageInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                placeholder="Eg.Python, Javascript, C++, Press Enter to add new language"
                                autoComplete="off"
                            />

                            {/* Suggestion list */}
                            {languageInput && filteredSuggestions.length > 0 && (
                                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                                    {filteredSuggestions.map((lang, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSelectLanguage(lang.name)}
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
                                        >
                                            {lang.name}
                                        </li>
                                    ))}
                                </ul>
                            )}


                            {/* Display selected languages */}
                            {selectedLanguages.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {selectedLanguages.map((lang, index) => (
                                        <span
                                            key={index}
                                            className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center gap-1"
                                        >
                                            {lang}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveLanguage(lang)}
                                                className="text-green-600 hover:text-red-500"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <TextInput
                            id="link"
                            label="Project Link"
                            required
                            placeholder="Eg.https://github.com/RVisalD/TalentHub"
                        />

                        <div className="mb-4">
                            <label htmlFor="fileUpload" className="block text-sm font-medium text-black">
                                Project Files
                            </label>
                            <input
                                type="file"
                                id="fileUpload"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                multiple
                                onChange={(e) => {
                                    const files = e.target.files;
                                }}
                            />
                            <p className="mt-1 text-xs text-gray-500">Upload project-related files (documents, source code, etc.)</p>
                        </div>

                        <EndorserInput onEndorserChange={handleEndorserChange} existingEndorsers={endorsers} />
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
                                            width={96}
                                            height={96}
                                            className="object-cover rounded shadow"
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
                        onClick={handleAddProject}
                    >
                        Create Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProjectDialog;
