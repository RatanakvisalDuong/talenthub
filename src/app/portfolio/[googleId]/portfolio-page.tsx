"use client"

import { Achievement } from "@/app/type/achievement";
import { Portfolio } from "@/app/type/portfolio";
import AchievementCard from "@/components/achievementCard/achievementCard";
import EducationCard from "@/components/educationCard/educationCard";
import ExperienceCard from "@/components/experienceCard/experienceCard";
import ProjectCard from "@/components/projectCard/projectCard";
import SkillCard from "@/components/skillCard/skillCard";
import WorkingStatusBar from "@/components/workingStatus/workingStatusBar";
import { majors } from "@/dummydata/major";
import { ShareIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import { useState } from 'react';
import CertificateDialog from "@/components/achievementDialog/achievementDialog";
import ParticlesBackground from "@/components/background/background";




export default function PortfolioPageComponent({ portfolio }: { portfolio: Portfolio }) {
    const [expandedExperience, setExpandedExperience] = useState(false);
    const [expandedSkill, setExpandedSkill] = useState(false);
    const [expandedProject, setExpandedProject] = useState(false);
    const [expandedEducation, setExpandedEducation] = useState(false);
    const [dropdownExperienceOpen, setDropdownExperienceOpen] = useState<{ [key: number]: boolean }>({});
    const [dropdownSkillOpen, setDropdownSkillOpen] = useState<{ [key: number]: boolean }>({});
    const [openAchivementDialog, setOpenAchivementDialog] = useState(false);
    const [singleAchievementData, setSingleAchievementData] = useState<Achievement | null>(null);
    const [viewCertificateDialog, setViewCertificateDialog] = useState(false);

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

    const toggleExpandedEducation = () => {
        setExpandedEducation(!expandedEducation);
    }

    const getMajorName = () => {
        const majorObj = majors.find((item) => item.id === portfolio.portfolio.major);
        return majorObj ? majorObj.name : 'N/A';
    };

    const toggleSharePortfolio = () => {
        displaySuccessMessage("Portfolio link copied to clipboard!");
        navigator.clipboard.writeText(`http://localhost:3000/portfolio/${portfolio.portfolio.google_id}`);
    }

    const displaySuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 4000);
    };

    const handleOpenAchivementDialog = (achievement: Achievement) => {
        setSingleAchievementData(achievement);
        setOpenAchivementDialog(!openAchivementDialog);
    };

    return (
        <div className=" w-screen h-screen overflow-hidden fixed">
            <ParticlesBackground />
            <div className={`max-w-8xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between ${openAchivementDialog ? 'blur-sm' : ''} `}>
                {successMessage && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50 mt-18">
                        {successMessage}
                    </div>
                )}
                <div className="flex justify-between w-full">
                    <div className="h-[87vh] w-[28%] flex flex-col justify-between overflow-y-auto">
                        <div className={`${expandedProject ? 'h-auto' : 'h-[32%]'}  bg-indigo-500/20 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-lg shadow-md p-4 relative`}>
                            <p className="text-white font-bold text-lg">Projects</p>
                            <div className="w-25 bg-[#dfdfdf] h-[2px] mt-1"></div>
                            {portfolio.projects.filter(project => project.project_visibility_status === 0).length === 0 ? (
                                <p className="text-[#808080] text-md mt-4 justify-center items-center flex">No project available</p>
                            ) : (
                                <>
                                    {portfolio.projects
                                        .filter(project => project.project_visibility_status === 0)
                                        .slice(0, expandedProject ? portfolio.projects.filter(p => p.project_visibility_status === 0).length : 2)
                                        .map((project) => (
                                            <ProjectCard
                                                key={project.project_id}
                                                project={project}
                                            />
                                        ))}
                                    {portfolio.projects.filter(project => project.project_visibility_status === 0).length > 2 && (
                                        <div className={`h-40px ${portfolio.projects.length > 2 ? 'block' : 'hidden'}`}>
                                            <button
                                                onClick={toggleDropdownProject}
                                                className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold cursor-pointer"
                                            >
                                                {expandedProject ? 'See Less' : 'See More'}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className={`h-[65%]  bg-indigo-500/20 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-lg shadow-md p-4 ${expandedProject ? 'mt-10' : 'mt-0'} overflow-y-auto`}>
                            <p className="text-white font-bold text-lg">Achievements & Certifications</p>
                            <div className="w-70 bg-[#dfdfdf] h-[2px] mt-1"></div>
                            {portfolio.achievements.length === 0 ? (
                                <p className="text-[#808080] text-md mt-4 justify-center items-center flex">No achievement & certificate available</p>
                            ) : (
                                portfolio.achievements.map((achievement) => (
                                    <AchievementCard key={achievement.id} achievement={achievement} onClick={() => { handleOpenAchivementDialog(achievement) }} />
                                ))
                            )}
                        </div>
                    </div>
                    <div className="h-[87vh] w-[70%] overflow-y-auto pr-6 overflow-x-hidden">
                        <div className="flex justify-between h-[35%]">
                            <div className="w-[68%]  bg-indigo-500/20 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-lg shadow-md p-4 overflow-y-auto">
                                <div className="flex items-center justify-start h-full">
                                    <div className="w-[40%] relative flex items-center justify-center">
                                        <div className="absolute top-0 right-0 z-10 -translate-y-1/2">
                                            {portfolio.portfolio.role_id === 1 ? (
                                                <WorkingStatusBar status={portfolio.portfolio.working_status} />
                                            ) :
                                                <div
                                                    className="h-6 flex justify-center items-center text-white text-[12px] rounded-md bg-[#5086ed] p-2"
                                                >
                                                    Endorser
                                                </div>
                                            }

                                        </div>
                                        <div className="h-[90%] w-[90%] rounded-md overflow-hidden mx-auto flex items-center justify-center">
                                            <Image
                                                src={portfolio.portfolio.photo || "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg?crop=0.66667xw:1xh;center,top&resize=1200:*"}
                                                alt="placeholder"
                                                width={200}
                                                height={200}
                                                className=" aspect-square object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="justify-start w-[60%] h-full items-start ml-4 mt-4">
                                        <p className="text-white font-bold text-lg ">{portfolio.portfolio.user_name}</p>
                                        <div className="w-20 bg-[#dfdfdf] h-[2px] mt-1">
                                        </div>
                                        <div className="text-white mt-2 text-sm flex">
                                            <span className="font-bold mr-2">Email:</span> <p className="text-white">{portfolio.portfolio.email}</p>
                                        </div>
                                        <div className="text-white mt-2 text-sm flex">
                                            <span className="font-bold mr-2">Contact:</span>  <p className="text-white">{portfolio.portfolio.phone_number ? portfolio.portfolio.phone_number : 'N/A'}</p>
                                        </div>
                                        {portfolio.portfolio.role_id === 1 ?
                                            (<div className="text-white mt-2 text-sm flex">
                                                <span className="font-bold mr-2">Major:</span><p className="text-white">{getMajorName()}</p>
                                            </div>)
                                            : <div></div>}
                                        <button className="mt-4 rounded-sm text-white px-4 py-2 bg-blue-800 flex items-center font-bold cursor-pointer hover:transform hover:scale-105" onClick={toggleSharePortfolio}><ShareIcon className="w-5 h-5 mr-2" /> Share Portfolio</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[30%]  rounded-2xl shadow-lg p-6 overflow-y-auto  bg-indigo-500/20 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                <p className="text-white font-semibold text-xl mb-4 border-b pb-2 border-gray-300">
                                    About Me
                                </p>
                                <p className="text-white mt-2 text-sm leading-relaxed text-justify">
                                    {portfolio.portfolio.about ? portfolio.portfolio.about : 'No description available'}
                                </p>
                            </div>
                        </div>
                        <div className={`w-full ${expandedExperience ? 'h-auto' : 'h-max'}  bg-indigo-500/20 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-lg shadow-lg p-6 mt-8 mr-3`}>
                            <p className="text-white font-bold text-xl mb-2">Experience</p>
                            <div className="h-[2px] bg-gray-300 w-40 mt-2 mb-2"></div>

                            {portfolio.experiences.length === 0 ? (
                                <p className="justify-center items-center flex text-[#808080]">No experience available</p>
                            ) : (
                                portfolio.experiences.slice(0, expandedExperience ? portfolio.experiences.length : 2).map((experience, index) => (
                                    <ExperienceCard key={experience.id}
                                        experience={experience}
                                        index={index}
                                        dropdownOpen={dropdownExperienceOpen}
                                        toggleDropdown={toggleExperienceDropdown}
                                        owner={false}
                                        openEditExperienceDialog={() => { }}
                                    />
                                ))
                            )}

                            <div className={`h-40px ${portfolio.experiences.length > 2 ? 'block' : 'hidden'}`}>
                                <button
                                    onClick={toggleExpandedExperience}
                                    className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold cursor-pointer"
                                >
                                    {expandedExperience ? 'See Less' : 'See More'}
                                </button>
                            </div>

                        </div>

                        <div className={`w-full ${expandedSkill ? 'h-auto' : 'h-max'}  bg-indigo-500/20 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-lg shadow-lg p-6 mt-8 mr-3`}>
                            <p className="text-white font-bold text-xl mb-2">Skill</p>
                            <div className="h-[2px] bg-gray-300 w-40 mt-2 mb-2"></div>

                            {portfolio.skills.length === 0 ? (
                                <p className="justify-center items-center flex text-[#808080]">No skill available</p>
                            ) : (
                                portfolio.skills.slice(0, expandedSkill ? portfolio.skills.length : 2).map((skill, index) => (
                                    <SkillCard
                                        key={`skill-${skill.id || index}`}
                                        skill={skill}
                                        index={index}
                                        dropdownOpen={dropdownSkillOpen}
                                        toggleDropdown={toggleDropdownSkill}
                                        owner={false}
                                        openEditSkillDialog={() => { }}
                                    />
                                ))
                            )}
                            <div className={`h-40px ${portfolio.skills.length > 2 ? 'block' : 'hidden'}`}>
                                <button
                                    onClick={toggleExpandedSkill}
                                    className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold cursor-pointer"
                                >
                                    {expandedSkill ? 'See Less' : 'See More'}
                                </button>
                            </div>
                        </div>
                        <div className={`w-full ${expandedEducation ? 'h-auto' : 'h-max'}  bg-indigo-500/20 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-lg shadow-lg p-6 mt-8 mr-3`}>
                            <p className="text-white font-bold text-xl mb-2">Education</p>
                            <div className="h-[2px] bg-gray-300 w-40 mt-2 mb-2"></div>

                            {portfolio.education.length === 0 ? (
                                <p className="justify-center items-center flex text-[#808080]">No skill available</p>
                            ) : (
                                portfolio.education.slice(0, expandedEducation ? portfolio.education.length : 2).map((education, index) => (
                                    <EducationCard
                                        key={education.id}
                                        education={education}
                                        index={index}
                                        owner={false}
                                        openEditSkillDialog={() => { }}
                                    />
                                ))
                            )}
                            <div className={`h-40px ${portfolio.education.length > 2 ? 'block' : 'hidden'}`}>
                                <button
                                    onClick={toggleExpandedEducation}
                                    className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold cursor-pointer"
                                >
                                    {expandedEducation ? 'See Less' : 'See More'}
                                </button>
                            </div>
                        </div>
                        <div className="h-[20px]">

                        </div>
                    </div>
                </div>
            </div>

            {openAchivementDialog && (
                <CertificateDialog
                    owner={true}
                    achievement={singleAchievementData}
                    onClose={() => handleOpenAchivementDialog(singleAchievementData!)}
                    onEdit={() => { }}
                    ableToUpdate={false}
                />
            )}
        </div>
    );
}