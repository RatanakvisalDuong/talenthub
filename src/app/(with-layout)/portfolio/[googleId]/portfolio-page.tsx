"use client"

import { Achievement } from "@/app/type/achievement";
import { Portfolio } from "@/app/type/portfolio";
import EducationCard from "@/components/educationCard/educationCard";
import SkillCard from "@/components/skillCard/skillCard";
import { getMajorName, majors } from "@/dummydata/major";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import CertificateDialog from "@/components/achievementDialog/achievementDialog";
import { convertPhoneNumberSpacing } from "@/utils";
import ExperienceSection from "@/components/experienceSection/experienceSection";
import ProfileSummarySection from "@/components/profileSection/profileSection";
import ProjectsSection from "@/components/projectSection/projectSection";
import AchievementsSection from "@/components/achievementSection/achievementSection";




export default function PortfolioPageComponent({ portfolio }: { portfolio: Portfolio }) {
    const [expandedExperience, setExpandedExperience] = useState(false);
    const [expandedSkill, setExpandedSkill] = useState(false);
    const [expandedEducation, setExpandedEducation] = useState(false);
    const [dropdownExperienceOpen, setDropdownExperienceOpen] = useState<{ [key: number]: boolean }>({});
    const [dropdownSkillOpen, setDropdownSkillOpen] = useState<{ [key: number]: boolean }>({});
    const [openAchivementDialog, setOpenAchivementDialog] = useState(false);
    const [singleAchievementData, setSingleAchievementData] = useState<Achievement | null>(null);

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

    const toggleExpandedSkill = () => {
        setExpandedSkill(!expandedSkill);
    }

    const toggleExpandedEducation = () => {
        setExpandedEducation(!expandedEducation);
    }

    const toggleSharePortfolio = () => {
        const currentUrl = window.location.href;
        displaySuccessMessage("Portfolio link copied to clipboard!");
        navigator.clipboard.writeText(currentUrl);
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
        <div className="bg-[#E8E8E8] w-screen h-screen overflow-hidden fixed">
            <div className={`max-w-8xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between ${openAchivementDialog ? 'blur-sm' : ''} `}>
                {successMessage && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-md z-50 mt-18">
                        {successMessage}
                    </div>
                )}
                <div className="flex justify-between w-full">
                    <div className="max-h-[87vh] w-[30%] flex flex-col justify-between overflow-y-auto">
                        <ProjectsSection portfolio={portfolio} owner={false} addProject={() => { }} />
                        <AchievementsSection
                            portfolio={portfolio}
                            owner={false}
                            handleOpenAchievementDialog={handleOpenAchivementDialog}
                            addAchievementDialog={() => { }}
                        />
                    </div>
                    <div className="h-[87vh] w-[69%] overflow-y-auto pr-6 overflow-x-hidden">
                        <ProfileSummarySection
                            owner={false}
                            portfolio={portfolio}
                            getMajorName={getMajorName(portfolio.portfolio.major)}
                            convertPhoneNumberSpacing={convertPhoneNumberSpacing}
                            toggleSharePortfolio={toggleSharePortfolio}
                            toggleEditPortfolioDialog={() => { }}
                        />

                        <ExperienceSection
                            owner={false}
                            experienceData={portfolio.experiences}
                            expandedExperience={expandedExperience}
                            toggleExpandedExperience={toggleExpandedExperience}
                            toggleAddExperienceDialog={() => { }}
                            toggleEditExperienceDialog={() => { }}
                            dropdownOpen={dropdownExperienceOpen}
                            toggleDropdown={toggleExperienceDropdown}
                        />

                        <div className={`w-full ${expandedSkill ? 'h-auto' : 'h-max'} bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-4 mr-3`}>
                            <div className="flex items-center">
                                <i className="fas fa-cogs text-blue-500 mr-2"></i>
                                <p className="text-black font-bold text-lg">Skill</p>
                            </div>
                            <div className="h-[2px] bg-gray-300 w-40 mt-2 mb-2"></div>

                            {portfolio.skills.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full">

                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                                        <i className="fa-solid fa-cog text-slate-400 text-xl" />
                                    </div>
                                    <p className="text-gray-400 text-sm">No skill available</p>
                                </div>
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
                        <div className={`w-full ${expandedEducation ? 'h-auto' : 'h-max'} bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-4 mr-3`}>
                            <div className="flex items-center">
                                <i className="fas fa-graduation-cap text-blue-500 mr-2"></i>
                                <p className="text-black font-bold text-lg">Education</p>
                            </div>
                            <div className="h-[2px] bg-gray-300 w-40 mt-2 mb-2"></div>

                            {portfolio.education.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full">

                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                                        <i className="fa-solid fa-graduation-cap text-slate-400 text-xl" />
                                    </div>
                                    <p className="text-gray-400 text-sm">No education available</p>
                                </div>
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