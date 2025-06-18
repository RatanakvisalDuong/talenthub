'use client';

import { UserPlus, Code, XIcon, ChevronRight, ChevronLeft, Globe, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDownTrayIcon, LinkIcon } from "@heroicons/react/24/solid";
import TextEditor from "../../yourportfolio/text-editor";
import Link from "next/link";
import { useSession } from "next-auth/react";
import EditProjectDialog from "./editproject-dialog";
import AddCollaboratorDialog from "./addcollaborator-dialog";
import AddEndorserDialog from "./addendorser-dialog";
import RemoveCollaboratorDialog from "./removecollaborator-dialog";
import RemoveEndorserDialog from "./removeendorser-dialog";
import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import ApiDialog from "@/components/apiDialog/page";

interface ProjectPageComponentProps {
    projectData: any;
    onEndorserRemoved?: () => void;
}

export default function ProjectPageComponent({ projectData, onEndorserRemoved }: ProjectPageComponentProps) {
    const { data: session } = useSession();
    const userId = session?.googleId;
    const isOwner = projectData.google_id === userId;

    const [isPublic, setIsPublic] = useState<boolean>(projectData?.project_visibility_status === 1);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [editorContent, setEditorContent] = useState<string>();

    const [updateProjectDialog, setUpdateProjectDialog] = useState(false);
    const [addCollaboratorDialog, setAddCollaboratorDialog] = useState(false);
    const [addEndorserDialog, setAddEndorserDialog] = useState(false);
    const [confirmRemoveCollaboratorDialog, setConfirmRemoveCollaboratorDialog] = useState(false);
    const [confirmRemoveEndorserDialog, setConfirmRemoveEndorserDialog] = useState(false);
    const [removeCollaboratorId, setRemoveCollaboratorId] = useState<string | null>(null);
    const [removeEndorserId, setRemoveEndorserId] = useState<string | null>(null);

    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [selectedEndorser, setSelectedEndorser] = useState<any>(null);
    const [toggleDropdownData, setToggleDropdownData] = useState<{ [key: string]: boolean }>({});

    const slidePairs = [];
    for (let i = 0; i < projectData.images.length; i += 2) {
        if (i + 1 < projectData.images.length) slidePairs.push([projectData.images[i], projectData.images[i + 1]]);
        else slidePairs.push([projectData.images[i]]);
    }

    const nextSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentSlide((prev) => (prev === slidePairs.length - 1 ? 0 : prev + 1));
            setTimeout(() => setIsTransitioning(false), 300);
        }
    };

    const prevSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentSlide((prev) => (prev === 0 ? slidePairs.length - 1 : prev - 1));
            setTimeout(() => setIsTransitioning(false), 300);
        }
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index: number) => setCurrentSlide(index);

    const toggleUpdateProject = () => {
        setUpdateProjectDialog(!updateProjectDialog);
    }
    const toggleAddCollaborator = () => {
        setAddCollaboratorDialog(!addCollaboratorDialog);
    }
    const toggleAddEndorser = () => {
        setAddEndorserDialog(!addEndorserDialog);
    }

    const toggleRemoveCollabDialog = (collaboratorId: string) => {
        setRemoveCollaboratorId(collaboratorId);
        setConfirmRemoveCollaboratorDialog(!confirmRemoveCollaboratorDialog);
    }

    const toggleRemoveEndorserDialog = (endorserId: string) => {
        setRemoveEndorserId(endorserId);
        setConfirmRemoveEndorserDialog(!confirmRemoveEndorserDialog);
    }

    const displaySuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 4000);
    };

    const handleVisibilityToggle = async (isChecked: boolean) => {
        try {
            setIsPublic(isChecked);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}update_project_visibility/${projectData.project_id}`,
                {
                    visibility_status: isChecked ? "1" : "0",
                },
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                }
            );


            if (response.status === 200) {
                displaySuccessMessage(`Project visibility changed to ${isChecked ? 'private' : 'public'}`);
            } else {
                setIsPublic(!isChecked);
                displaySuccessMessage("Failed to update project visibility");
            }
        } catch (error) {
            console.error("Error updating project visibility:", error);
            setIsPublic(!isChecked);
            displaySuccessMessage("Failed to update project visibility");
        }
    };

    const toggleDropdown = (id: number) => {
        setToggleDropdownData((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleRemoveEndorser = (endorser: any) => {
		setSelectedEndorser(endorser);
		setRemoveDialogOpen(true);
	};

	const handleRemoveSuccess = () => {
		toggleDropdown(projectData.id);
		if (onEndorserRemoved) {
			onEndorserRemoved();
		}
	};


    return (
        <div className="bg-[#E8E8E8] w-screen h-screen overflow-hidden fixed">
            <div className={`max-w-8xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between ${updateProjectDialog || addCollaboratorDialog || addEndorserDialog || confirmRemoveCollaboratorDialog || confirmRemoveEndorserDialog ? "blur-md" : ""}`}>
                {successMessage && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-md z-50 mt-18">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {successMessage}
                        </div>
                    </div>
                )}
                <div className="flex justify-between w-full">
                    <div className="h-[88vh] w-[73%]">
                        <div className="h-full w-full bg-white p-4 overflow-y-auto rounded-xl shadow-md px-8">
                            {/* Header section with title and controls */}
                            <div className="w-full flex justify-between items-center mb-4">
                                <p className="text-2xl font-bold text-black">{projectData.title}</p>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="flex items-center gap-1">
                                        {!isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                        <span className="font-medium">{!isPublic ? "Public" : "Private"}</span>
                                    </div>
                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                    <span>{projectData.collaborators?.filter((e: any) => e.collaboration_status == 2).length || 0} collaborators</span>
                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                    <span>{projectData.endorsers?.filter((e: any) => e.endorsement_status === 2).length || 0} endorsers</span>
                                </div>

                                {isOwner && (
                                    <div className="flex items-center justify-center">
                                        {/* Visibility toggle */}
                                        <div className="flex h-[30px] items-center justify-center mr-4">
                                            <p className="text-black font-bold text-md mr-2">
                                                Private
                                            </p>
                                            <label className="relative inline-flex cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={isPublic}
                                                    onChange={(e) => handleVisibilityToggle(e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5086ed]"></div>
                                            </label>
                                        </div>

                                        {/* Update button */}
                                        <button
                                            className="flex text-sm text-white hover:underline hover:brightness-110 cursor-pointer py-2 px-4 bg-[#ffc107] rounded-xl items-center justify-center transition-all duration-200"
                                            onClick={toggleUpdateProject}
                                        >
                                            <PencilSquareIcon className="w-5 h-5 mr-2" />
                                            Update
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Image slideshow */}
                            <div className="w-full h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl mx-auto flex justify-center items-center shadow-xl border border-white/20 backdrop-blur-sm">
                                {/* Previous slide control */}
                                <button
                                    onClick={prevSlide}
                                    className="group text-slate-600 hover:text-slate-800 transition-all duration-300 focus:outline-none hover:scale-110 p-2 rounded-full hover:bg-white/50 backdrop-blur-sm"
                                >
                                    <ChevronLeft className="h-8 w-8 drop-shadow-sm" />
                                </button>

                                {/* Slideshow container */}
                                <div className="relative w-[85%] overflow-hidden rounded-xl mx-auto h-58 bg-white/30 backdrop-blur-sm border border-white/30 shadow-inner">
                                    {projectData.images && projectData.images.length > 0 ? (
                                        <>
                                            <div
                                                className="flex transition-transform duration-700 ease-out h-full"
                                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                            >
                                                {slidePairs.map((pair, pairIndex) => (
                                                    <div key={pairIndex} className="w-full flex-shrink-0 flex gap-3 p-3 h-full">
                                                        {pair.length === 2 ? (
                                                            pair.map(slide => (
                                                                <div key={slide.id} className="w-1/2 group">
                                                                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-lg border border-white/30 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
                                                                        <img
                                                                            src={slide.url}
                                                                            alt={`Project slide ${slide.id}`}
                                                                            className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
                                                                        />
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="w-full flex justify-center">
                                                                <div className="w-1/2 group">
                                                                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-lg border border-white/30 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
                                                                        <img
                                                                            src={pair[0].url}
                                                                            alt={`Project slide ${pair[0].id}`}
                                                                            className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
                                                                        />
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Slide indicators */}
                                            <div className="absolute bottom-4 left-0 right-0 z-10">
                                                <div className="flex justify-center gap-2">
                                                    {slidePairs.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => goToSlide(index)}
                                                            className={`h-2.5 transition-all duration-300 ease-out hover:scale-110 ${currentSlide === index
                                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 w-8 rounded-full shadow-lg shadow-blue-500/30'
                                                                : 'bg-white/60 hover:bg-white/80 w-2.5 rounded-full backdrop-blur-sm border border-white/30 shadow-sm'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="flex items-center justify-center mb-4">
                                                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mr-3">
                                                        <i className="fa-regular fa-image text-3xl text-slate-400"></i>
                                                    </div>
                                                </div>
                                                <p className="text-slate-500 font-medium">No images available</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Next slide control */}
                                <button
                                    onClick={nextSlide}
                                    className="group text-slate-600 hover:text-slate-800 transition-all duration-300 focus:outline-none hover:scale-110 p-2 rounded-full hover:bg-white/50 backdrop-blur-sm"
                                >
                                    <ChevronRight className="h-8 w-8 drop-shadow-sm" />
                                </button>
                            </div>

                            <div className="w-full mt-4 flex justify-end">
                                {projectData?.link && (
                                    <Link
                                        className="h-10 w-max bg-white rounded-xl flex items-center justify-center text-black px-4 shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group mr-4 border border-gray-200"
                                        href={projectData.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <LinkIcon className="h-5 w-5 mr-1" /> Visit Project
                                    </Link>
                                )}

                                {projectData.file && (
                                    <Link
                                        className="h-10 w-max bg-white rounded-xl flex items-center justify-center text-black px-4 shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group border border-gray-200"
                                        href={projectData.file}
                                    >
                                        <ArrowDownTrayIcon className="h-5 w-5 mr-1" /> Download
                                    </Link>
                                )}
                            </div>

                            <div className="w-full bg-white h-max mt-4 mb-4 rounded-xl shadow-md p-6 border border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <i className="fa-solid fa-file-lines text-white text-sm" />
                                    </div>
                                    <h1 className="text-black text-[16px] ml-2">Project Description</h1>
                                </div>
                                <div className="h-[2px] bg-gray-300 w-64 mt-2 mb-2"></div>
                                <div className="space-y-4">
                                    <p className="text-gray-700 mt-1 text-[14px]">
                                        {projectData?.description || "No description available."}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full bg-white h-max mt-4 mb-4 rounded-xl shadow-md p-6 border border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                                        <i className="fa-solid fa-clipboard-list text-white text-sm" />
                                    </div>
                                    <h1 className="text-black text-[16px] ml-2">Project Instruction</h1>
                                </div>
                                <div className="h-[2px] bg-gray-300 w-64 mt-2 mb-2"></div>
                                <div className="space-y-4">
                                    <div className="text-gray-700 text-sm">
                                        <TextEditor
                                            id="myEditor"
                                            label=""
                                            value={projectData?.instruction}
                                            onChange={(html) => setEditorContent(html)}
                                            readonly={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="h-2"></div>
                        </div>
                    </div>

                    <div className="h-[88vh] w-[26%] overflow-y-auto pl-1 pr-1">
                        <div className="h-max w-full bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200">
                            <div className="flex items-center">
                                <div className="h-8 w-8 flex items-center justify-center  bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                                    <i className="fa-solid fa-user w-4 h-4 text-white" />
                                </div>
                                <p className="text-black ml-2">
                                    Project Owner
                                </p>
                            </div>
                            <Link className="bg-white text-black shadow-md rounded-xl px-4 py-3 flex items-center space-x-3 mt-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group border border-gray-200" href={`/portfolio/${projectData.google_id}`}>
                                <Image src={projectData.owner_photo} alt="" width={34} height={34} className="rounded-full w-12 h-12 object-cover" />
                                <p className="text-sm font-medium ml-2">{projectData.owner_name}</p>
                            </Link>

                        </div>
                        <div className="h-max w-full bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                                        <Image src="/verified.png" alt="Verified" width={16} height={16} className="filter brightness-0 invert" />
                                    </div>
                                    <p className="text-black ml-2">
                                        Endorsers
                                    </p>
                                </div>
                                {isOwner && <div className="bg-white text-black shadow-md rounded-xl p-2 flex items-center space-x-2 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group border border-gray-200" onClick={() => { toggleAddEndorser() }}>
                                    <UserPlus className="w-4 h-4" />
                                    <p className="text-sm">Add Endorser</p>
                                </div>
                                }
                            </div>
                            {projectData.endorsers.filter((endorser: any) => endorser.endorsement_status === 2).length > 0 ? (
                                projectData.endorsers
                                    .filter((endorser: any) => endorser.endorsement_status === 2)
                                    .map((endorser: any, index: number) => (
                                        <div key={index} className="bg-white text-black shadow-md rounded-xl px-4 py-3 flex items-center space-x-3 mt-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group justify-between border border-gray-200">
                                            <Link className="flex items-center" href={`/portfolio/${endorser.google_id}`}>
                                                <Image src={endorser.photo} alt="" width={34} height={34} className="rounded-full w-12 h-12 object-cover" />
                                                <div className="text-sm font-medium ml-1">{endorser.name}</div>
                                            </Link>
                                            {session?.googleId === projectData.google_id && (<XIcon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-300" onClick={() => { toggleRemoveEndorserDialog(endorser.google_id) }} />)}
                                            {session?.googleId === endorser.google_id && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => { handleRemoveEndorser(endorser) }}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>

                                            )}
                                        </div>
                                    ))
                            ) : <div className="text-center py-2 text-slate-500">
                                <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                                    <Image src="/verified.png" alt="No endorsers" width={24} height={24} className="opacity-50" />
                                </div>
                                <p className="text-sm">No endorsers yet</p>
                            </div>
                            }

                        </div>
                        <div className="h-max w-full bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <i className="fa-solid fa-users text-white text-sm" />
                                    </div>
                                    <p className="text-black  ml-2">
                                        Collaborators
                                    </p>
                                </div>
                                {isOwner && <div className="bg-white border border-gray-200 text-black shadow-md rounded-xl p-2 flex items-center space-x-2 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group" onClick={() => { toggleAddCollaborator() }}>
                                    <UserPlus className="w-4 h-4" />
                                    <p className="text-sm">Add Collaborator</p>
                                </div>
                                }
                            </div>
                            {projectData.collaborators.filter((collaborator: any) => collaborator.collaboration_status === 2).length > 0 ? (
                                projectData.collaborators
                                    .filter((collaborator: any) => collaborator.collaboration_status === 2)
                                    .map((collaborator: any, index: number) => (
                                        <div className="bg-white border border-gray-200 text-black shadow-md rounded-xl px-4 py-3 flex  items-center space-x-3 mt-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group justify-between" key={index}>
                                            <Link className="flex items-center" href={`/portfolio/${collaborator.google_id}`} >
                                                <Image src={collaborator.photo} alt="" width={34} height={34} className="rounded-full w-12 h-12 object-cover" />
                                                <div className="text-sm font-medium ml-1">{collaborator.name}</div>
                                            </Link>
                                            {session?.googleId == projectData.google_id && (<XIcon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-300" onClick={() => { toggleRemoveCollabDialog(collaborator.google_id) }} />)}
                                        </div>
                                    ))
                            ) :
                                <div className="text-center py-4 text-slate-500">
                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                                        <i className="fa-solid fa-users text-slate-400 text-xl" />
                                    </div>
                                    <p className="text-sm">No collaborators yet</p>
                                </div>
                            }
                        </div>
                        <div className="h-max w-full bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                                    <Code className="w-4 h-4 text-white" />
                                </div>
                                <p className="text-black ml-2">
                                    Tools
                                </p>
                            </div>
                            {projectData?.programming_languages?.length > 0 ? (
                                projectData.programming_languages.map((language: any, index: number) => (
                                    <div key={index} className="bg-white border border-gray-200 text-black shadow-md rounded-xl px-4 py-3 flex items-center space-x-3 mt-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out group">
                                        <div className="w-2 h-2 bg-[#5086ed] rounded-xl"></div>
                                        <p className="text-sm font-medium">{language.name}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-slate-500">
                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                                        <Code className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <p className="text-sm">No tools yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {updateProjectDialog && (
                <EditProjectDialog
                    isOpen={updateProjectDialog}
                    onClose={toggleUpdateProject}
                    projectData={projectData}
                    onClick={toggleUpdateProject}
                    setSuccessMessage={displaySuccessMessage}
                />
            )}

            {addCollaboratorDialog && (
                <AddCollaboratorDialog
                    isOpen={addCollaboratorDialog}
                    onClose={toggleAddCollaborator}
                    onClick={toggleAddCollaborator}
                    projectId={projectData.project_id}
                />
            )}

            {addEndorserDialog && (
                <AddEndorserDialog
                    isOpen={addCollaboratorDialog}
                    onClose={toggleAddEndorser}
                    onClick={toggleAddEndorser}
                    projectId={projectData.project_id}
                />
            )}

            {confirmRemoveCollaboratorDialog && (
                <RemoveCollaboratorDialog
                    projectId={projectData.project_id}
                    collaboratorId={removeCollaboratorId ? removeCollaboratorId : ""}
                    onClose={() => setConfirmRemoveCollaboratorDialog(false)}
                />
            )}

            {confirmRemoveEndorserDialog && (
                <RemoveEndorserDialog
                    projectId={projectData.project_id}
                    endorserId={removeEndorserId ? removeEndorserId : ""}
                    onClose={() => setConfirmRemoveEndorserDialog(false)}
                />
            )}

            {removeDialogOpen && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">

					<ApiDialog
						isOpen={removeDialogOpen}
						onClose={() => setRemoveDialogOpen(false)}
						apiUrl="https://talenthub.newlinkmarketing.com/api/remove_endorsement"
						requestData={{
							"type": 4,
							"id": projectData.project_id,
						}}
						title="Remove Endorsement"
						description={`Are you sure you want to remove your endorsement?`}
						confirmButtonText="Remove"
						cancelButtonText="Cancel"
						onSuccess={handleRemoveSuccess}
					/>
				</div>
			)}
        </div>
    );
}
