'use client'

import Appbar from "@/components/appbar/appbar";
import { useState, useEffect } from "react";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function ProjectPage() {
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    // Sample data for slides - replace with your project images
    const slides = [
        {
            id: 1,
            image: "/certificate.png",
        },
        {
            id: 2,
            image: "/certificate.png",
        },
        {
            id: 3,
            image: "/certificate.png",
        },
        {
            id: 4,
            image: "/certificate.png",
        }
    ];

    // Create pairs of slides for side-by-side display
    const slidePairs = [];
    for (let i = 0; i < slides.length; i += 2) {
        if (i + 1 < slides.length) {
            slidePairs.push([slides[i], slides[i + 1]]);
        } else {
            slidePairs.push([slides[i]]);
        }
    }

    // Function to move to the next slide pair
    const nextSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentSlide((prev) => (prev === slidePairs.length - 1 ? 0 : prev + 1));
            setTimeout(() => {
                setIsTransitioning(false);
            }, 300);
        }
    };

    // Function to move to the previous slide pair
    const prevSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentSlide((prev) => (prev === 0 ? slidePairs.length - 1 : prev - 1));
            setTimeout(() => {
                setIsTransitioning(false);
            }, 300);
        }
    };

    // Auto-play functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    // Go to specific slide pair
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="bg-[#E8E8E8] w-screen h-screen overflow-hidden fixed">
            <Appbar />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between">
                <div className="flex justify-between w-full">
                    <div className="h-[88vh] w-[73%] flex flex-col justify-between overflow-y-auto">
                        <div className="h-full w-full bg-[#F5F5F5] p-4">
                            <div className="w-full flex justify-between items-center mb-4">
                                <p className="text-xl font-bold text-black">
                                    TalentHub Project
                                </p>
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
                                    <button
                                        className="text-sm text-white hover:underline cursor-pointer py-2 px-4 bg-[#ffc107] rounded-md items-center justify-center"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                            
                            <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
                                <div 
                                    className="flex h-full transition-transform duration-1000 ease-in-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {slidePairs.map((pair, pairIndex) => (
                                        <div key={pairIndex} className="w-full h-full flex-shrink-0 flex gap-2">
                                            {pair.map((slide) => (
                                                <div key={slide.id} className="w-1/2 h-full">
                                                    <div className="relative w-full h-full">
                                                        <Image src={slide.image} alt={slide.image} width={100} height={100} className="top-0 left-0 w-full h-full" />
                                                    </div>
                                                </div>
                                            ))}
                                            {pair.length === 1 && (
                                                <div className="w-1/2 h-full bg-gray-100"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={prevSlide}
                                    className="absolute top-1/2 left-2 transform -translate-y-1/2 p-1 text-gray-800 hover:bg-opacity-60 transition-all focus:outline-none hover:cursor-pointer"
                                >
                                    <ArrowLeftCircleIcon className="h-10 w-10" />
                                </button>
                                
                                <button 
                                    onClick={nextSlide}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 text-gray-800 hover:bg-opacity-60 transition-all focus:outline-none hover:cursor-pointer"
                                >
                                    <ArrowRightCircleIcon className="h-10 w-10 " />
                                </button>

                                <div className="absolute bottom-3 left-0 right-0 z-10">
                                    <div className="flex justify-center gap-1">
                                        {slidePairs.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToSlide(index)}
                                                className={`h-2 transition-all ${
                                                    currentSlide === index ? 'bg-[#5086ed] w-4 rounded-md' : 'bg-white bg-opacity-50 w-2 rounded-full'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
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