'use client';

import { UserPlus, Code, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ArrowDownTrayIcon, LinkIcon } from "@heroicons/react/24/solid";
import TextEditor from "@/app/yourportfolio/text-editor";
import Link from "next/link";
import { useSession } from "next-auth/react";
import EditProjectDialog from "./editproject-dialog";
import AddCollaboratorDialog from "./addcollaborator-dialog";
import AddEndorserDialog from "./addendorser-dialog";
import { Endorser } from "@/app/type/endorser";
import RemoveCollaboratorDialog from "./removecollaborator-dialog";
import RemoveEndorserDialog from "./removeendorser-dialog";
import axios from "axios";

interface ProjectPageComponentProps {
    projectData: any;
}

export default function ProjectPageComponent({ projectData }: ProjectPageComponentProps) {
    const { data: session } = useSession();
    const userId = session?.googleId;

    const [isPublic, setIsPublic] = useState<boolean>(projectData?.project_visibility_status === 1);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [editorContent, setEditorContent] = useState<string>();
    const [endorsersers, setEndorsers] = useState<Endorser[]>([]);

    const [updateProjectDialog, setUpdateProjectDialog] = useState(false);
    const [addCollaboratorDialog, setAddCollaboratorDialog] = useState(false);
    const [addEndorserDialog, setAddEndorserDialog] = useState(false);
    const [confirmRemoveCollaboratorDialog, setConfirmRemoveCollaboratorDialog] = useState(false);
    const [confirmRemoveEndorserDialog, setConfirmRemoveEndorserDialog] = useState(false);
    const [removeCollaboratorId, setRemoveCollaboratorId] = useState<string | null>(null);
    const [removeEndorserId, setRemoveEndorserId] = useState<string | null>(null);


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

    // const handleRemoveEndorser = (googleId: string) => {

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

            console.log("Visibility response:", response);

            if (response.status === 200) {
                displaySuccessMessage(`Project visibility changed to ${isChecked ? 'private' : 'public'}`);
            } else {
                // Revert state if there was an error
                setIsPublic(!isChecked);
                displaySuccessMessage("Failed to update project visibility");
            }
        } catch (error) {
            console.error("Error updating project visibility:", error);
            // Revert state if there was an error
            setIsPublic(!isChecked);
            displaySuccessMessage("Failed to update project visibility");
        }
    };

    return (
        <div className="bg-[#E8E8E8] w-screen h-screen overflow-hidden fixed">
            <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between ${updateProjectDialog || addCollaboratorDialog || addEndorserDialog || confirmRemoveCollaboratorDialog || confirmRemoveEndorserDialog ? "blur-md" : ""}`}>
                {successMessage && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50 mt-18">
                        {successMessage}
                    </div>
                )}
                <div className="flex justify-between w-full">
                    <div className="h-[88vh] w-[73%]">
                        <div className="h-full w-full bg-white p-4 overflow-y-auto rounded-lg shadow-md">
                            <div className="w-full flex justify-between items-center mb-4">
                                <p className="text-xl font-bold text-black">{projectData.title}</p>
                                {projectData.google_id == userId ? (
                                    <div className="flex items-center justify-center">
                                        <div className="flex h-[30px] items-center justify-center mr-4">
                                            <p className="text-black font-bold text-md mr-2">
                                                {!isPublic ? "Public" : "Private"}
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
                                        <button
                                            className="text-sm text-white hover:underline hover:brightness-110 cursor-pointer py-2 px-4 bg-[#ffc107] rounded-md items-center justify-center transition-all duration-200"
                                            onClick={toggleUpdateProject}
                                        >
                                            Update
                                        </button>

                                    </div>
                                ) :
                                    <div></div>
                                }
                            </div>

                            <div className="w-full h-60 bg-white rounded-lg mx-auto flex justify-center items-center shadow-md">
                                <button onClick={prevSlide} className="text-gray-800 hover:bg-opacity-60 transition-all focus:outline-none hover:cursor-pointer">
                                    <ArrowLeftCircleIcon className="h-10 w-10" />
                                </button>
                                <div className="relative w-[85%] overflow-hidden shadow-md mx-auto">
                                    <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                        {slidePairs.map((pair, pairIndex) => (
                                            <div key={pairIndex} className="w-full flex-shrink-0 flex gap-2">
                                                {pair.length === 2 ? pair.map(slide => (
                                                    <div key={slide.id} className="w-1/2">
                                                        <div className="relative aspect-[16/9] overflow-hidden">
                                                            <Image
                                                                src={slide.url}
                                                                alt={`Project slide ${slide.id}`}
                                                                fill
                                                                sizes="(max-width: 768px) 100vw, 500px"
                                                                className="object-cover"
                                                                priority={pairIndex === currentSlide}
                                                            />
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className="w-full flex justify-center">
                                                        <div className="w-1/2">
                                                            <div className="relative aspect-[16/9] overflow-hidden">
                                                                <Image
                                                                    src={pair[0].url}
                                                                    alt={`Project slide ${pair[0].id}`}
                                                                    fill
                                                                    sizes="(max-width: 768px) 100vw, 500px"
                                                                    className="object-cover"
                                                                    priority={pairIndex === currentSlide}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute bottom-3 left-0 right-0 z-10">
                                        <div className="flex justify-center gap-1">
                                            {slidePairs.map((_, index) => (
                                                <button key={index} onClick={() => goToSlide(index)} className={`h-2 transition-all ${currentSlide === index ? 'bg-[#5086ed] w-4 rounded-md' : 'bg-white bg-opacity-50 w-2 rounded-full'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={nextSlide} className="text-gray-800 hover:bg-opacity-60 transition-all focus:outline-none hover:cursor-pointer">
                                    <ArrowRightCircleIcon className="h-10 w-10" />
                                </button>
                            </div>

                            <div className="w-full mt-4 flex justify-end">
                                <Link className="h-10 w-max bg-white rounded-md flex items-center justify-center text-black px-4 shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group mr-4" href={projectData?.link || "#"} target="_blank" rel="noopener noreferrer">
                                    <LinkIcon className="h-5 w-5" /> Link
                                </Link>
                                {projectData.file && (
                                    <Link className="h-10 w-max bg-white rounded-md flex items-center justify-center text-black px-4 shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group" href={projectData.file}>
                                        <ArrowDownTrayIcon className="h-5 w-5" /> Download
                                    </Link>
                                )}

                            </div>

                            <div className="w-full bg-white h-max mt-4 mb-4 rounded-lg shadow-md p-6">
                                <h1 className="text-black text-xl font-bold">Project Description</h1>
                                <div className="h-[2px] bg-gray-300 w-64 mt-2 mb-2"></div>
                                <div className="space-y-4">
                                    <p className="text-gray-700 mt-1 text-sm">{projectData?.description || "No description available."}</p>
                                </div>
                            </div>

                            <div className="w-full bg-white h-max mt-4 mb-4 rounded-lg shadow-md p-6">
                                <h1 className="text-black text-xl font-bold">Project Instruction</h1>
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

                    <div className="h-[88vh] w-[26%] overflow-y-auto">
                        <div className="h-max w-full bg-white rounded-lg shadow-md p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-black ">
                                    Project Owner
                                </p>

                            </div>
                            <Link className="bg-white text-black shadow-md rounded-lg px-4 py-3 flex items-center space-x-3 mt-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group" href={`/portfolio/${projectData.google_id}`}>
                                <Image src={projectData.owner_photo} alt="" width={34} height={34} className="rounded-full w-12 h-12 object-cover" />
                                <p className="text-sm font-medium ml-2">{projectData.owner_name}</p>
                            </Link>

                        </div>
                        <div className="h-max w-full bg-white rounded-lg shadow-md p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-black ">
                                    Endorsers
                                </p>
                                {projectData.google_id == session?.googleId && <div className="bg-white text-black shadow-md rounded-lg p-2 flex items-center space-x-2 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group" onClick={() => { toggleAddEndorser() }}>
                                    <UserPlus className="w-4 h-4" />
                                    <p className="text-sm">Add Endorser</p>
                                </div>
                                }

                            </div>
                            {projectData.endorsers.filter((endorser: any) => endorser.endorsement_status === 2).length > 0 ? (
                                projectData.endorsers
                                    .filter((endorser: any) => endorser.endorsement_status === 2)
                                    .map((endorser: any, index: number) => (
                                        <div key={index} className="bg-white text-black shadow-md rounded-lg px-4 py-3 flex items-center space-x-3 mt-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group justify-between">
                                            <Link className="flex items-center" href={`/portfolio/${endorser.google_id}`}>
                                                <Image src={endorser.photo} alt="" width={34} height={34} className="rounded-full w-12 h-12 object-cover" />
                                                <div className="text-sm font-medium ml-1">{endorser.name}</div>
                                            </Link>
                                            {session?.googleId == projectData.google_id && (<XIcon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-300" onClick={() => { toggleRemoveEndorserDialog(endorser.google_id) }} />)}
                                        </div>
                                    ))
                            ) : <div className="text-gray-700 w-full flex justify-center items-center mt-4">
                                <p className="text-sm font-medium">No endorsers available.</p>
                            </div>
                            }

                        </div>
                        <div className="h-max w-full bg-white rounded-lg shadow-md p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-black ">
                                    Collaborators
                                </p>
                                {projectData.google_id == session?.googleId && <div className="bg-white text-black shadow-md rounded-lg p-2 flex items-center space-x-2 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group" onClick={() => { toggleAddCollaborator() }}>
                                    <UserPlus className="w-4 h-4" />
                                    <p className="text-sm">Add Collaborator</p>
                                </div>
                                }
                            </div>
                            {projectData.collaborators.filter((collaborator: any) => collaborator.collaboration_status === 2).length > 0 ? (
                                projectData.collaborators
                                    .filter((collaborator: any) => collaborator.collaboration_status === 2)
                                    .map((collaborator: any, index: number) => (
                                        <div className="bg-white text-black shadow-md rounded-lg px-4 py-3 flex  items-center space-x-3 mt-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group justify-between" key={index}>
                                            <Link className="flex items-center" href={`/portfolio/${collaborator.google_id}`} >
                                                <Image src={collaborator.photo} alt="" width={34} height={34} className="rounded-full w-12 h-12 object-cover" />
                                                <div className="text-sm font-medium ml-1">{collaborator.name}</div>
                                            </Link>
                                            {session?.googleId == projectData.google_id && (<XIcon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-300" onClick={() => { toggleRemoveCollabDialog(collaborator.google_id) }} />)}
                                        </div>
                                    ))
                            ) :
                                <div className="text-gray-700 w-full flex justify-center items-center mt-4">
                                    <p className="text-sm font-medium">No collaborators available.</p>
                                </div>
                            }
                        </div>
                        <div className="h-max w-full bg-white rounded-lg shadow-md p-4 mb-4">
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-black ">
                                    Programming Languages
                                </p>
                            </div>
                            {projectData?.programming_languages?.length > 0 ? (
                                projectData.programming_languages.map((language: any, index: number) => (
                                    <div key={index} className="bg-white text-black shadow-md rounded-lg px-4 py-3 flex items-center space-x-3 mt-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out group">
                                        <Code className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                        <p className="text-sm font-medium">{language.name}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-700 w-full flex justify-center items-center mt-4">
                                    <p className="text-sm font-medium">No programming languages available.</p>
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
        </div>
    );
}