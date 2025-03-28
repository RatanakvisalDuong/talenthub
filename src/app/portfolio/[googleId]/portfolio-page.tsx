"use client"

import { Portfolio } from "@/app/type/portfolio";
import Appbar from "@/components/appbar/appbar";
import CertificateCard from "@/components/certificateCard/certificateCard";
import ExperienceCard from "@/components/experienceCard/experienceCard";
import ProjectCard from "@/components/projectCard/projectCard";
import SkillCard from "@/components/skillCard/skillCard";
import WorkingStatusBar from "@/components/workingStatus/workingStatusBar";
import { certificates } from "@/dummydata/certificate";
import { experiences } from "@/dummydata/experience";
import { majors } from "@/dummydata/major";
import { ShareIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import { useState } from 'react';




export default function PortfolioPageComponent({ portfolio }: { portfolio: Portfolio }) {
    const [expandedExperience, setExpandedExperience] = useState(false);
    const [expandedSkill, setExpandedSkill] = useState(false);
    const [expandedProject, setExpandedProject] = useState(false);
    const [dropdownExperienceOpen, setDropdownExperienceOpen] = useState<{ [key: number]: boolean }>({});
    const [dropdownSkillOpen, setDropdownSkillOpen] = useState<{ [key: number]: boolean }>({});

    const toggleExperienceDropdown = (experienceId: number) => {
        setDropdownExperienceOpen(prev => ({
            ...prev,
            [experienceId]: !prev[experienceId]
        }));
    };

    const toggleDropdownSkill = (skillId: number) => {
        setDropdownSkillOpen(prev => ({
            ...prev,
            [skillId]: !prev[skillId]
        }));
    };

    const toggleExpandedExperience = () => {
        setExpandedExperience(!expandedExperience);
    };

    const toggleDropdownProject = () => {
        setExpandedProject(!expandedProject);
    }

    const toggleExpandedSkill = () => {
        setExpandedSkill(!expandedSkill);
    }

    const getMajorName = () => {
        const majorObj = majors.find((item) => item.id === portfolio.portfolio.major);
        return majorObj ? majorObj.name : 'Unknown Major';
    };

    return (
        <div className="bg-[#E8E8E8] w-screen h-screen overflow-hidden">
            <Appbar />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between">
                <div className="flex justify-between w-full">
                    <div className="h-[87vh] w-[30%] flex flex-col justify-between overflow-y-auto">
                        <div className={`${expandedProject ? 'h-auto' : 'h-[30%]'} bg-white rounded-lg shadow-md p-4 relative`}>
                            <p className="text-black font-bold text-lg">Projects</p>
                            <div className="w-25 bg-[#dfdfdf] h-[2px] mt-1"></div>
                            {portfolio.projects.length === 0 ? (
                                <p className="text-black text-smdmt-4 justify-center items-center flex">No Project</p>
                            ) : (
                                <>
                                    {portfolio.projects
                                        .slice(0, expandedProject ? portfolio.projects.length : 2)
                                        .map((project) => (
                                            <ProjectCard key={project.id} project={project} />
                                        ))}

                                    {portfolio.projects.length > 2 && (
                                        <div className="h-40px">
                                            <button
                                                onClick={toggleDropdownProject}
                                                className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold"
                                            >
                                                {expandedProject ? 'See Less' : 'See More'}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className={`h-[65%] bg-white rounded-lg shadow-md p-4 ${expandedProject ? 'mt-10' : 'mt-0'} overflow-y-auto`}>
                            <p className="text-black font-bold text-lg">Achievements & Certifications</p>
                            <div className="w-70 bg-[#dfdfdf] h-[2px] mt-1"></div>
                            {certificates.map((certificate) => (
                                <CertificateCard key={certificate.id} certificate={certificate} />
                            ))}
                        </div>
                    </div>
                    <div className="h-[87vh] w-[68%] overflow-y-auto pr-6 overflow-x-hidden">
                        <div className="flex justify-between h-[35%]">
                            <div className="w-[68%] bg-white rounded-lg shadow-md p-4 overflow-y-auto">
                                <div className="flex items-center justify-start h-full">
                                    <div className="w-[40%] relative flex items-center justify-center">
                                        <div className="absolute top-0 right-0 z-10 -translate-y-1/2">
                                            <WorkingStatusBar status={2} />
                                        </div>
                                        <div className="h-[90%] w-[90%] rounded-md overflow-hidden mx-auto flex items-center justify-center">
                                            <Image
                                                src={portfolio.portfolio.photo}
                                                alt="placeholder"
                                                width={200}
                                                height={200}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="justify-start w-[60%] h-full items-start ml-4 mt-4">
                                        <p className="text-black font-bold text-lg">{portfolio.portfolio.user_name}</p>
                                        <div className="w-20 bg-[#dfdfdf] h-[2px] mt-1">
                                        </div>
                                        <p className="text-black mt-2 text-sm">
                                            <span className="font-bold mr-2">Email:</span> {portfolio.portfolio.email}
                                        </p>
                                        <p className="text-black mt-2 text-sm">
                                            <span className="font-bold mr-2">Contact:</span> {portfolio.portfolio.phone_number ? portfolio.portfolio.phone_number : 'N/A'}
                                        </p>
                                        <p className="text-black mt-2 text-sm">
                                            <span className="font-bold mr-2">Major:</span> {getMajorName()}
                                        </p>
                                        <button className="mt-4 rounded-sm text-black px-4 py-2 bg-[#C0DDEC] flex items-center font-bold cursor-pointer hover:transform hover:scale-105"><ShareIcon className="w-5 h-5 mr-2" /> Share Portfolio</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[30%] bg-white rounded-lg shadow-md p-4 overflow-y-auto">
                                <p className="text-black font-bold text-lg">About</p>
                                <p className="text-black mt-2 text-sm text-justify">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium veniam qui quae reiciendis itaque alias unde cum labore! Odio quas atque, reprehenderit laudantium voluptatum exercitationem delectus deleniti alias rerum corporis?
                                </p>
                            </div>
                        </div>
                        <div className={`w-full ${expandedExperience ? 'h-auto' : 'h-max'} bg-white rounded-lg shadow-lg p-6 mt-8 mr-3`}>
                            <p className="text-black font-bold text-xl mb-2">Experience</p>
                            <div className="h-[2px] bg-gray-300 w-40 mt-2 mb-2"></div>

                            {experiences.slice(0, expandedExperience ? experiences.length : 2).map((experience, index) => (
                                <ExperienceCard key={experience.id}
                                    experience={experience}
                                    index={index}
                                    dropdownOpen={dropdownExperienceOpen}
                                    toggleDropdown={toggleExperienceDropdown} 
                                    owner={false}/>
                            ))}
                            <div className={`h-40px ${experiences.length > 2 ? 'block' : 'hidden'}`}>
                                <button
                                    onClick={toggleExpandedExperience}
                                    className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold"
                                >
                                    {expandedExperience ? 'See Less' : 'See More'}
                                </button>
                            </div>
                        </div>

                        <div className={`w-full ${expandedSkill ? 'h-auto' : 'h-max'} bg-white rounded-lg shadow-lg p-6 mt-8 mr-3`}>
                            <p className="text-black font-bold text-xl mb-2">Skill</p>
                            <div className="h-[2px] bg-gray-300 w-40 mt-2 mb-2"></div>

                            {portfolio.skills.slice(0, expandedSkill ? portfolio.skills.length : 2).map((skill, index) => (
                                <SkillCard key={skill.id}
                                    skill={skill}
                                    index={index}
                                    dropdownOpen={dropdownSkillOpen}
                                    toggleDropdown={toggleDropdownSkill} 
                                    owner={false}
                                />
                            ))}
                            <div className={`h-40px ${portfolio.skills.length > 2 ? 'block' : 'hidden'}`}>
                                <button
                                    onClick={toggleExpandedSkill}
                                    className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold"
                                >
                                    {expandedSkill ? 'See Less' : 'See More'}
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-[40%] bg-white rounded-lg shadow-md p-4 mt-8 mr-3 overflow-y-auto">

                        </div>
                        <div className="h-[20px]">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}