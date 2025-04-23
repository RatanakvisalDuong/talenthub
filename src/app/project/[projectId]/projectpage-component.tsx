'use client';

// import QuillDisplay from "./quill-context";
import Appbar from "@/components/appbar/appbar";
import { useState, useEffect } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ArrowDownTrayIcon, LinkIcon } from "@heroicons/react/24/solid";
import TextEditor from "@/app/yourportfolio/text-editor";

interface ProjectPageComponentProps {
    projectData: any;
}

export default function ProjectPageComponent({ projectData }: ProjectPageComponentProps) {
    const [isPublic, setIsPublic] = useState<boolean>(projectData?.project_visibility_status === 1);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [editorContent, setEditorContent] = useState<string>();

    const slides = [
        { id: 1, image: "/project.png" },
        { id: 2, image: "/project2.png" },
        { id: 3, image: "/project3.png" },
        { id: 4, image: "/project4.png" },
        { id: 5, image: "/project4.png" }
    ];

    const slidePairs = [];
    for (let i = 0; i < slides.length; i += 2) {
        if (i + 1 < slides.length) slidePairs.push([slides[i], slides[i + 1]]);
        else slidePairs.push([slides[i]]);
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

    return (
        <div className="bg-[#E8E8E8] w-screen h-screen overflow-hidden fixed">
            <Appbar />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between ">
                <div className="flex justify-between w-full">
                    <div className="h-[88vh] w-[73%]">
                        <div className="h-full w-full bg-white p-4 overflow-y-auto rounded-lg shadow-md">
                            <div className="w-full flex justify-between items-center mb-4">
                                <p className="text-xl font-bold text-black">TalentHub Project</p>
                                <div className="flex items-center justify-center">
                                    <div className="flex h-[30px] items-center justify-center mr-4">
                                        <p className="text-black font-bold text-md mr-2">
                                            {!isPublic ? "Public" : "Private"}
                                        </p>
                                        <label className="relative inline-flex cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={isPublic}
                                                onChange={(e) => setIsPublic(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5086ed]"></div>
                                        </label>
                                    </div>
                                    <button className="text-sm text-white hover:underline cursor-pointer py-2 px-4 bg-[#ffc107] rounded-md items-center justify-center">
                                        Update
                                    </button>
                                </div>
                            </div>

                            {/* Carousel */}
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
                                                        <div className="relative">
                                                            <Image src={slide.image} alt={`Project slide ${slide.id}`} width={500} height={300} className="w-full h-auto" priority={pairIndex === currentSlide} />
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className="w-full flex justify-center">
                                                        <div className="w-1/2">
                                                            <div className="relative">
                                                                <Image src={pair[0].image} alt={`Project slide ${pair[0].id}`} width={500} height={300} className="w-full h-auto" priority={pairIndex === currentSlide} />
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
                                <div className="h-10 w-max bg-white rounded-md flex items-center justify-center text-black px-4 shadow-md hover:cursor-pointer gap-2 hover:bg-[#5086ed] hover:text-white transition-all mr-4">
                                    <LinkIcon className="h-5 w-5" /> Link
                                </div>
                                <div className="h-10 w-max bg-white rounded-md flex items-center justify-center text-black px-4 shadow-md hover:cursor-pointer gap-2 hover:bg-[#5086ed] hover:text-white transition-all">
                                    <ArrowDownTrayIcon className="h-5 w-5" /> Download
                                </div>
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
                                        {/* <QuillDisplay content={projectData?.instruction || ""}/> */}
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

                    <div className="h-[88vh] w-[26%] flex flex-col justify-between overflow-y-auto bg-black">
                        {/* Sidebar content */}
                    </div>
                </div>
            </div>
        </div>
    );
}
