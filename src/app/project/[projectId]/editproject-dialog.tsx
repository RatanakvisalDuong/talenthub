"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import TextInput from "@/components/textinput/textInput";
import Image from "next/image";
import { useRef, useState, useMemo, useEffect } from "react";
import { allLanguages } from "@/dummydata/programmingLanguages";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useRouter } from "next/navigation";
import TextEditor from "@/app/yourportfolio/text-editor";
import { Project } from "@/app/type/project";
import { useSession } from "next-auth/react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "lucide-react";
import RemoveImageDialog from "./removeimage-dialog";


const EditProjectDialog = ({ isOpen, onClose, onClick, projectData }: { isOpen: boolean; onClose: () => void; onClick: () => void; projectData: Project }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [existingFilesUrl, setExistingFilesUrl] = useState<string>("");
    const [projectFiles, setProjectFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<Array<{ id: number, url: string }>>([]);
    const [languageInput, setLanguageInput] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [editorContent, setEditorContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [link, setLink] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [removeImageDialog, setRemoveImageDialog] = useState(false);

    const [removingImageIds, setRemovingImageIds] = useState<number[]>([]);
    const [selectedImageToRemove, setSelectedImageToRemove] = useState<number | null>(null);
    const [isRemoved, setIsRemoved] = useState(false);

    const filteredSuggestions = allLanguages.filter(
        (lang) =>
            lang.name.toLowerCase().includes(languageInput.toLowerCase()) &&
            !selectedLanguages.includes(lang.name)
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        setProjectFiles(newFiles);
    };

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

    const handleDeleteProject = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}delete_project/${projectData.project_id}`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            if (response.status === 200) {
                setLoading(false);
                onClick();
                router.refresh();
                router.push("/yourportfolio");
            }
        } catch (error) {
            setLoading(false);
        }
    };

    const fileToURL = useMemo(() => {
        return imageFiles.map((file) => URL.createObjectURL(file));
    }, [imageFiles]);

    useEffect(() => {
        setLoading(true);
        if (projectData) {
            setEditorContent(projectData.instruction || "");
            setTitle(projectData.title || "");
            setDescription(projectData.description || "");
            setLink(projectData.link || "");
            setExistingFilesUrl(projectData.file || "");

            if (projectData.images && Array.isArray(projectData.images)) {
                setExistingImages(projectData.images);
            }

            if (projectData.programming_languages && Array.isArray(projectData.programming_languages)) {
                const languages = projectData.programming_languages.map(lang =>
                    typeof lang === 'object' && lang.name ? lang.name :
                        typeof lang === 'string' ? lang : ''
                ).filter(Boolean);
                setSelectedLanguages(languages);
            }
            setLoading(false);
        }
    }, [projectData]);

    if (!isOpen) return null;

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFiles = Array.from(files);
        const combined = [...imageFiles, ...newFiles].slice(0, 6 - existingImages.length);
        setImageFiles(combined);
    };

    const handleRemoveExistingImage = (id: number) => {
        setSelectedImageToRemove(id);
        setRemoveImageDialog(true);
    };
    
    var updatedRemovingIds = [...removingImageIds];

    const handleConfirmImageRemoval = () => {
        if (selectedImageToRemove === null) return;
        
        const imageIdToRemove = selectedImageToRemove;
        
        updatedRemovingIds = [...removingImageIds, imageIdToRemove];
        setRemovingImageIds(updatedRemovingIds);
        
        setExistingImages(existingImages.filter(img => img.id !== imageIdToRemove));

        setRemoveImageDialog(false);
        setSelectedImageToRemove(null);
      };

    const handleRemoveNewImage = (index: number) => {
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    };

    const handleSaveChanges = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('project_id', projectData.project_id.toString());
            formData.append('title', title);
            formData.append('description', description);
            formData.append('instruction', editorContent || "");
            formData.append('link', link);

            selectedLanguages.forEach((lang, index) => {
                formData.append(`programming_languages[${index}]`, lang);
            });

            existingImages.forEach((img, index) => {
                formData.append(`existing_images[${index}]`, img.id.toString());
            });

            imageFiles.forEach((file, index) => {
                formData.append(`new_images[${index}]`, file);
            });

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}update_project`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                setLoading(false);
                onClick();
                router.refresh();
            }
        } catch (error) {
            // console.error("Error updating project:", error);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className={`bg-white rounded-md p-6 w-[850px] max-w-full shadow-lg h-[650px] overflow-y-auto z-50 relative ${showDeleteConfirmation || removeImageDialog ? "blur-sm" : ""}`}>
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Update Project</h2>
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
                            id="title"
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
                            value={editorContent}
                            onChange={(html) => setEditorContent(html)}
                        />

                        <div className="mb-2 relative">
                            <label htmlFor="language" className="block text-sm font-medium text-black">
                                Programming Language / Tools
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
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Eg.https://github.com/RVisalD/TalentHub"
                        />
                        <div className="mb-4">
                            <label htmlFor="fileUpload" className="block text-sm font-medium text-black">
                                Project Files
                            </label>
                            {existingFilesUrl ? (
                                <div className="flex items-center gap-4">
                                    <div
                                        className="h-10 w-max bg-white rounded-md flex items-center justify-center text-black shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group px-4 py-2"
                                        onClick={() => window.open(existingFilesUrl, "_blank")}
                                    >
                                        <ArrowDownTrayIcon className="h-5 w-5" /><span className="ml-2"> Download File</span>
                                    </div>
                                    <button
                                        onClick={() => setExistingFilesUrl("")}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        id="fileUpload"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
                                        multiple
                                        onChange={(e) => {
                                            handleFileChange(e);
                                            setProjectFiles(Array.from(e.target.files || []));
                                        }}
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Upload project-related files (documents, source code, etc.)</p>
                                </>
                            )}
                        </div>

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

                        <div className="flex flex-wrap gap-2 mt-2">
                            {existingImages.map((image) => (

                                <div key={`existing-${image.id}`} className="relative">
                                    <Image
                                        src={image.url}
                                        alt="Project image"
                                        width={96}
                                        height={96}
                                        className="object-cover rounded shadow"
                                        unoptimized
                                    />
                                    {/* {existingImages.length + imageFiles.length > 1 && ( */}
                                    <div
                                        onClick={() => handleRemoveExistingImage(image.id)}
                                        className="absolute top-0 right-0 text-red-500 p-1 rounded-full"
                                    >
                                        <i className="fas fa-times"></i>
                                    </div>
                                    {/* )} */}
                                    <p>
                                    </p>
                                </div>
                            ))}

                            {fileToURL.map((src, index) => (
                                <div key={`new-${index}`} className="relative group">
                                    <Image
                                        src={src}
                                        alt={`New upload ${index + 1}`}
                                        width={96}
                                        height={96}
                                        className="object-cover rounded shadow"
                                        unoptimized
                                    />
                                    {existingImages.length + imageFiles.length > 1 && (
                                        <div
                                            onClick={() => handleRemoveNewImage(index)}
                                            className="absolute top-0 right-0 text-red-500 p-1 rounded-full"
                                        >
                                            <i className="fas fa-times"></i>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <button
                        type="button"
                        className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 hover:cursor-pointer"
                        onClick={() => setShowDeleteConfirmation(true)}
                        disabled={loading}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={handleSaveChanges}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {removeImageDialog && (
                <RemoveImageDialog
                    onClose={() => setRemoveImageDialog(false)}
                    onConfirm={() => {
                        // setExistingImages(existingImages.filter(img => img.id !== existingImages[0].id));
                        handleConfirmImageRemoval()
                    }}
                />
            )}

            {showDeleteConfirmation && (
                <div className="fixed inset-0 z-60 flex items-center justify-center">
                    <div className="bg-white rounded-md shadow-lg p-6 w-[400px] text-center">
                        <p className="text-lg font-semibold mb-4 text-red-600">Confirm Delete</p>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 hover:cursor-pointer"
                                onClick={handleDeleteProject}
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Yes, Delete"}
                            </button>
                            <button
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 hover:cursor-pointer"
                                onClick={() => setShowDeleteConfirmation(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProjectDialog;