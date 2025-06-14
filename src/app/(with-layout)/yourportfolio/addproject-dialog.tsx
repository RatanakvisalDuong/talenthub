"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import TextInput from "@/components/textinput/textInput";
import Image from "next/image";
import { useRef, useState, useMemo } from "react";
import TextEditor from "./text-editor";
import { allLanguages } from "@/dummydata/programmingLanguages";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Project } from "../../type/project";

const AddProjectDialog = ({ isOpen, onClose, onClick, portfolioId, setSuccessMessage, setProjectdata }: { isOpen: boolean; onClose: () => void; onClick: () => void; portfolioId: number; setSuccessMessage: (message: string) => void; setProjectdata: React.Dispatch<React.SetStateAction<Project[]>>; }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [projectLink, setProjectLink] = useState<string>("");
    const [projectFile, setProjectFile] = useState<File | null>(null);
    const [projectInstruction, setProjectInstruction] = useState<string>("");

    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const projectFileInputRef = useRef<HTMLInputElement>(null);
    const [languageInput, setLanguageInput] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleProjectFileClick = () => {
        projectFileInputRef.current?.click();
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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        // Only take the first file
        setProjectFile(files[0]);
    };

    const handleRemoveProjectFile = () => {
        setProjectFile(null);
        // Reset the file input
        if (projectFileInputRef.current) {
            projectFileInputRef.current.value = '';
        }
    };

    const handleAddProject = async () => {
        var images: any[] = [];
        if (title === "" || description === "") {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("portfolio_id", portfolioId.toString());
        formData.append("title", title);
        formData.append("description", description);
        formData.append("link", projectLink);
        formData.append("instruction", projectInstruction.toString());
        if (projectFile) {
            formData.append("file", projectFile);
        }

        if (imageFiles.length > 0) {
            for (let i = 0; i < imageFiles.length; i++) {
                formData.append(`image[]`, imageFiles[i]);
            }
        }
        if (selectedLanguages.length > 0) {
            for (let i = 0; i < selectedLanguages.length; i++) {
                formData.append(`programming_languages[]`, selectedLanguages[i].toString());
            }
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}create_project`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                },
            );

            if (response.status === 200) {
                const project: Project = {
                    project_id: response.data.project.project_id,
                    portfolio_id: portfolioId,
                    title: title,
                    description: description,
                    instruction: projectInstruction,
                    link: projectLink,
                    owner_name: session?.user?.name || "",
                    owner_photo: session?.user?.image || "",
                    images: images,
                    file: response.data.file_url || "",
                    programming_languages: selectedLanguages.map((lang) => ({
                        id: response.data.programming_language_id,
                        name: lang,
                    })),
                    project_visibility_status: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };
                setProjectdata((prevProjects) => [...prevProjects, project]);
                setLoading(false);
                onClose();
                router.refresh();

                setSuccessMessage("Project added successfully!");
            }
        }
        catch (error) {
            console.error("Error uploading files:", error);
            setLoading(false);
            setError("Failed to upload files. Please try again.");
            return;
        }
    }

    return (
        <div className="fixed inset-0 flex z-50 items-center justify-center">
            {loading ? (
                <div className={`bg-white rounded-xl p-6 w-[800px] max-w-full shadow-lg h-[650px] relative overflow-y-auto flex justify-center items-center`}>
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500"></div>
                </div>
            ) : <div className={`bg-white rounded-xl p-6 w-[850px] max-w-full shadow-lg h-[600px]  relative overflow-y-auto`}>
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Eg.TalentHub"
                        />

                        <BigTextInput
                            id="description"
                            label="Project Description"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Eg.A portfolio platform for ParagonIU students"
                        />

                        <TextEditor
                            id="myEditor"
                            label="Project Instruction"
                            value={projectInstruction}
                            onChange={(html) => setProjectInstruction(html)}
                        />

                        <div className="mb-2 relative">
                            <label htmlFor="language" className="block text-sm font-medium text-black">
                                Tools
                            </label>
                            <input
                                type="text"
                                id="language"
                                value={languageInput}
                                onChange={(e) => setLanguageInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                placeholder="Eg.Python, Javascript, C++, Godot, Press Enter to add new tool"
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
                                            className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs flex items-center gap-1"
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
                            value={projectLink}
                            onChange={(e) => setProjectLink(e.target.value)}
                            placeholder="Eg.https://github.com/RVisalD/TalentHub"
                        />

                        <div className="mb-4">
                            <label htmlFor="fileUpload" className="block text-sm font-medium text-black mb-1">
                                Project File
                            </label>
                            <button
                                type="button"
                                onClick={handleProjectFileClick}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm hover:bg-gray-50 text-left"
                            >
                                {projectFile ? "1 file selected" : "Click to upload project file"}
                            </button>
                            <input
                                type="file"
                                ref={projectFileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <p className="mt-1 text-xs text-gray-500">Upload a single project-related file (document, source code, etc.)</p>

                            {/* Display uploaded file */}
                            {projectFile && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span className="text-sm text-gray-700 truncate max-w-xs">{projectFile.name}</span>
                                            <span className="text-xs text-gray-500">({(projectFile.size / 1024).toFixed(1)} KB)</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleRemoveProjectFile}
                                            className="text-red-500 hover:text-red-700 p-1"
                                            title="Remove file"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

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
                                            width={96}
                                            height={96}
                                            className="object-cover rounded shadow"
                                            unoptimized
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                            title="Remove image"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 hover:cursor-pointer "
                        onClick={handleAddProject}
                    >
                        Create Project
                    </button>
                </div>
            </div>
            }
        </div>
    );
};

export default AddProjectDialog;