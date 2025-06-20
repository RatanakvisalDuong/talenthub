// src/app/yourportfolio/yourportfolio-page.tsx

"use client"

import { getMajorName, majors } from "@/dummydata/major";
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AddProjectDialog from "./addproject-dialog";
import { Portfolio } from "../../type/portfolio";
import SkillCard from "@/components/skillCard/skillCard";
import AddSkillDialog from "./addskill-dialog";
import AddExperienceDialog from "./addexperience-dialog";
import EducationCard from "@/components/educationCard/educationCard";
import AddEducationDialog from "./addeducation-dialog";
import { Skill } from "../../type/skill";
import EditSkillDialog from "./editskill-dialog";
import AddCertificateDialog from "./addachievement-dialog";
import CertificateDialog from "@/components/achievementDialog/achievementDialog";
import EditPortfolioDialog from "./editportfolio-dialog";
import { Education } from "../../type/education";
import EditEducationDialog from "./editeducation-dialog";
import { Experience } from "../../type/experience";
import EditExperienceDialog from "./editexperience-dialog";
import { Achievement } from "../../type/achievement";
import EditCertificateDialog from "./editachievement-dialog";
import { convertPhoneNumberSpacing } from "@/utils";
import ExperienceSection from "@/components/experienceSection/experienceSection";
import ProfileSummarySection from "@/components/profileSection/profileSection";
import ProjectsSection from "@/components/projectSection/projectSection";
import AchievementsSection from "@/components/achievementSection/achievementSection";

export default function YourPortfolioPageComponent({ portfolio }: { portfolio: Portfolio }) {

    const [portfolioData, setPortfolioData] = useState<Portfolio>(portfolio);
    const [projectData, setProjectData] = useState(portfolio.projects);
    const [skillData, setSkillData] = useState<Skill[]>(portfolio.skills);
    const [educationData, setEducationData] = useState<Education[]>(portfolio.education);
    const [experienceData, setExperienceData] = useState<Experience[]>(portfolio.experiences);
    const [achievementData, setAchievementData] = useState<Achievement[]>(portfolio.achievements);
    const [singleAchievementData, setSingleAchievementData] = useState<Achievement | null>(null);

    const [expandedExperience, setExpandedExperience] = useState(false);
    const [expandedSkill, setExpandedSkill] = useState(false);
    const [expandedEducation, setExpandedEducation] = useState(false);
    const [expandedProject, setExpandedProject] = useState(false);

    const [openAddProjectDialog, setOpenAddProjectDialog] = useState(false);
    const [openAddSkillDialog, setOpenAddSkillDialog] = useState(false);
    const [openAddExpereinceDialog, setOpenAddExperienceDialog] = useState(false);
    const [openAddEducationDialog, setOpenAddEducationDialog] = useState(false);
    const [openAddCertificateDialog, setOpenAddCertificateDialog] = useState(false);
    const [openEditPortfolioDialog, setOpenEditPortfolioDialog] = useState(false);

    const [openEditSkillDialog, setOpenEditSkillDialog] = useState(false);
    const [openEditEducationDialog, setOpenEditEducationDialog] = useState(false);
    const [openEditExperienceDialog, setOpenEditExperienceDialog] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState<{ [key: number]: boolean }>({});
    const [dropdownSkillOpen, setDropdownSkillOpen] = useState<{ [key: number]: boolean }>({});

    const [editSkillId, setEditSkillId] = useState<number | null>(null);
    const [editSkillTitle, setEditSkillTitle] = useState<string>('');
    const [editSkillDescription, setEditSkillDescription] = useState<string>('');
    const [editSkillEndorsers, setEditSkillEndorsers] = useState<string[]>([]);

    const [editEducationId, setEditEducationId] = useState<number | null>(null);
    const [editEducationCenter, setEditEducationCenter] = useState<string>('');
    const [editFieldOfStudy, setEditFieldOfStudy] = useState<string>('');
    const [editEducationDescription, setEditEducationDescription] = useState<string>('');
    const [editSelectedStartMonth, setEditSelectedStartMonth] = useState<string>('');
    const [editSelectedStartYear, setEditSelectedStartYear] = useState<string>('');
    const [editSelectedEndMonth, setEditSelectedEndMonth] = useState<string>('');
    const [editSelectedEndYear, setEditSelectedEndYear] = useState<string>('');

    const [editExperience, setEditExperience] = useState<Experience | null>(null);

    const [successMessage, setSuccessMessage] = useState<string>("");

    const [viewCertificateDialog, setViewCertificateDialog] = useState(false);
    const [editCertificateDialog, setEditCertificateDialog] = useState(false);

    const toggleDropdownSkill = (skillId: number) => {
        setDropdownSkillOpen(prev => ({
            ...prev,
            [skillId]: !prev[skillId]
        }));
    };

    const handlePortfolioUpdate = (updatedPortfolio: any) => {
        setPortfolioData({
            ...portfolioData,
            portfolio: {
                ...portfolioData.portfolio,
                ...updatedPortfolio,
            }
        });
    };

    const toggleAddProjectDialog = () => {
        setOpenAddProjectDialog(!openAddProjectDialog);
    };

    const toggleAddSkillDialog = () => {
        setOpenAddSkillDialog(!openAddSkillDialog);
    };

    const toggleAddExperienceDialog = () => {
        setOpenAddExperienceDialog(!openAddExpereinceDialog);
    };

    const toggleAddEducationDialog = () => {
        setOpenAddEducationDialog(!openAddEducationDialog);
    }

    const toggleAddCertificateDialog = () => {
        setOpenAddCertificateDialog(!openAddCertificateDialog);
    }

    const toggleEditPortfolioDialog = () => {
        setOpenEditPortfolioDialog(!openEditPortfolioDialog);
    };

    const toggleEditSkillDialog = (skillId: number | null) => {
        setEditSkillId(skillId);
        setEditSkillTitle(skillData.find((skill) => skill.id === skillId)?.title || '');
        setEditSkillDescription(skillData.find((skill) => skill.id === skillId)?.description || '');
        setEditSkillEndorsers(skillData.find((skill) => skill.id === skillId)?.endorsers
            .filter((endorser) => endorser.status_id === 2)
            .map((endorser) => endorser.email) || []);
        setOpenEditSkillDialog(!openEditSkillDialog);
    };

    const toggleEditEducationDialog = (educationId: number | null) => {
        setEditEducationId(educationId);
        setEditEducationCenter(educationData.find((education) => education.id === educationId)?.education_center || '');
        setEditFieldOfStudy(educationData.find((education) => education.id === educationId)?.field_of_study || '');
        setEditEducationDescription(educationData.find((education) => education.id === educationId)?.description || '');
        setEditSelectedStartMonth(educationData.find((education) => education.id === educationId)?.start_month || '');
        setEditSelectedStartYear(educationData.find((education) => education.id === educationId)?.start_year || '');
        setEditSelectedEndMonth(educationData.find((education) => education.id === educationId)?.end_month || '');
        setEditSelectedEndYear(educationData.find((education) => education.id === educationId)?.end_year || '');
        setOpenEditEducationDialog(!openEditEducationDialog);
    }

    const toggleEditExperienceDialog = (experience: Experience | null) => {
        setEditExperience(experience);
        setOpenEditExperienceDialog(!openEditExperienceDialog);
    }


    const toggleCertificateDialog = (achievement: Achievement) => {
        setSingleAchievementData(achievement);
        setViewCertificateDialog(!viewCertificateDialog);
    };

    const toggleEditCertificateDialog = () => {
        setViewCertificateDialog(false);
        setEditCertificateDialog(true);
    };

    const handleAddAchievement = (newAchievement: Achievement) => {
        setAchievementData((prevAchievements) => [...prevAchievements, newAchievement]);
        setOpenAddCertificateDialog(false);
    };

    const handleUpdatedAchievement = (updatedAchievement: Achievement) => {

        setAchievementData((prevAchievements) =>
            prevAchievements.map((achievement) =>
                achievement.id === updatedAchievement.id ? updatedAchievement : achievement
            )
        );
        setEditCertificateDialog(false);
    };

    const handleDeleteAchievement = (deletedAchievementId: number) => {
        setAchievementData((prevAchievements) =>
            prevAchievements.filter((achievement) => achievement.id !== deletedAchievementId)
        );
        setEditCertificateDialog(false);
        displaySuccessMessage("Achievement deleted successfully.");
    };

    const toggleDropdown = (experienceId: number) => {
        setDropdownOpen(prev => ({
            ...prev,
            [experienceId]: !prev[experienceId]
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

    const addEducation = () => {

    }

    const addExperience = () => {

    }

    const addProject = () => {

    }

    const addCertificate = () => {

    }

    const toggleSharePortfolio = () => {
        displaySuccessMessage("Portfolio link copied to clipboard!");
        const baseUrl = window.location.origin;
        navigator.clipboard.writeText(`${baseUrl}/portfolio/${portfolioData.portfolio.google_id}`);
    }

    const displaySuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 4000);
    };

    return (
        <div className="bg-[#E8E8E8] w-screen h-screen overflow-hidden">
            { }
            <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between">
                {successMessage && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-sm z-50 mt-18 flex">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {successMessage}
                        </div>
                    </div>
                )}
                <div className="flex justify-between w-full">
                    <div className="max-h-[87vh] w-[30%] flex flex-col justify-between overflow-y-auto">
                        <ProjectsSection portfolio={portfolio} owner={true} addProject={toggleAddProjectDialog} />
                        <AchievementsSection
                            portfolio={portfolio}
                            owner={true}
                            handleOpenAchievementDialog={toggleCertificateDialog}
                            addAchievementDialog={toggleAddCertificateDialog}
                        />
                    </div>
                    <div className="h-[87vh] w-[69%] overflow-y-auto pr-6 overflow-x-hidden">
                        <ProfileSummarySection
                            owner={true}
                            portfolio={portfolioData}
                            getMajorName={getMajorName(portfolioData.portfolio.major)}
                            convertPhoneNumberSpacing={convertPhoneNumberSpacing}
                            toggleSharePortfolio={toggleSharePortfolio}
                            toggleEditPortfolioDialog={toggleEditPortfolioDialog}
                        />
                        <ExperienceSection
                            owner={true}
                            experienceData={experienceData}
                            expandedExperience={expandedExperience}
                            toggleExpandedExperience={toggleExpandedExperience}
                            toggleAddExperienceDialog={toggleAddExperienceDialog}
                            toggleEditExperienceDialog={toggleEditExperienceDialog}
                            dropdownOpen={dropdownOpen}
                            toggleDropdown={toggleDropdown}
                        />

                        <div className={`w-full ${expandedSkill ? 'h-auto' : 'h-max'} bg-white rounded-xl p-6 mt-4 mr-3 border border-gray-200 shadow-sm`}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <i className="fas fa-cogs text-blue-500 mr-2"></i>
                                    <p className="text-black font-bold text-lg">Skill</p>
                                </div>
                                <button className="flex items-center bg-blue-500 font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group" onClick={toggleAddSkillDialog}>
                                    <i className="fas fa-plus group-hover:text-white transition-colors duration-300"></i>
                                </button>
                            </div>
                            <div className="h-[2px] bg-gray-300 w-40 mt-2 mb-2"></div>

                            {Array.isArray(skillData)
                                ? (
                                    skillData.length > 0
                                        ? skillData.slice(0, expandedSkill ? skillData.length : 2).map((skill, index) => (
                                            <SkillCard
                                                key={`${skill.id}-${index}`}
                                                skill={skill}
                                                index={index}
                                                dropdownOpen={dropdownSkillOpen}
                                                toggleDropdown={toggleDropdownSkill}
                                                owner={true}
                                                openEditSkillDialog={() => {
                                                    toggleEditSkillDialog(skill.id);
                                                }}
                                            />
                                        ))
                                        : <div className="flex flex-col items-center justify-center h-full">

                                            <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                                                <i className="fas fa-cogs text-slate-400 text-xl" />
                                            </div>
                                            <p className="text-gray-400 text-sm">No skill available</p>
                                        </div>
                                )
                                : <div className="flex flex-col items-center justify-center h-full">

                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                                        <i className="fas fa-cogs text-slate-400 text-xl" />
                                    </div>
                                    <p className="text-gray-400 text-sm">No skill available</p>
                                </div>
                            }

                            <div className={`h-40px ${skillData.length > 2 ? 'block' : 'hidden'}`} key="seeMoreButton">
                                <button
                                    onClick={toggleExpandedSkill}
                                    className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold cursor-pointer"
                                >
                                    {expandedSkill ? 'See Less' : 'See More'}
                                </button>
                            </div>
                        </div>

                        <div className={`w-full ${expandedEducation ? 'h-auto' : 'h-max'} bg-white rounded-xl  p-6 mt-4 mr-3 border border-gray-200 shadow-sm`}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <i className="fas fa-graduation-cap text-blue-500 mr-2"></i>
                                    <p className="text-black font-bold text-lg">Education</p>
                                </div>
                                <button
                                    className="flex items-center bg-blue-500 font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group"
                                    onClick={() => toggleAddEducationDialog()}
                                >
                                    <i className="fas fa-plus group-hover:text-white transition-colors duration-300"></i>
                                </button>

                            </div>
                            <div className="h-[2px] bg-gray-300 w-40 mt-2 mb-2"></div>
                            {educationData.length > 0 ? (
                                educationData.slice(0, expandedEducation ? educationData.length : 2).map((education, index) => (
                                    <EducationCard
                                        key={`${education.id} - ${index}`}
                                        education={education}
                                        index={index}
                                        owner={true}
                                        openEditSkillDialog={() => {
                                            toggleEditEducationDialog(education.id);
                                        }}
                                    />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full">

                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                                        <i className="fa-solid fa-graduation-cap text-slate-400 text-xl" />
                                    </div>
                                    <p className="text-gray-400 text-sm">No education available</p>
                                </div>
                            )}
                            <div className={`h-40px ${educationData.length > 2 ? 'block' : 'hidden'}`} key="seeMoreButton">
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
            {/* {(openAddProjectDialog || openAddSkillDialog || openAddExpereinceDialog || openAddEducationDialog || openAddCertificateDialog || openEditSkillDialog || viewCertificateDialog || openEditPortfolioDialog || openEditEducationDialog || openEditExperienceDialog || editCertificateDialog) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40" />
            )} */}

            {openAddProjectDialog && (
                <AddProjectDialog isOpen={true} onClose={toggleAddProjectDialog} onClick={() => addProject()} portfolioId={portfolioData.portfolio.id} setSuccessMessage={displaySuccessMessage} setProjectdata={setProjectData} />
            )}

            {openAddCertificateDialog && (
                <AddCertificateDialog isOpen={true} onClose={toggleAddCertificateDialog} onClick={() => addCertificate()} portfolioId={portfolioData.portfolio.id} handleUpdatedAchievement={handleAddAchievement} setSuccessMessage={displaySuccessMessage} />
            )}

            {openAddSkillDialog && (
                <AddSkillDialog
                    isOpen={true}
                    onClose={toggleAddSkillDialog}
                    onClick={toggleAddSkillDialog}
                    portfolioId={portfolio.portfolio.id}
                    setSkilldata={setSkillData}
                    setSuccessMessage={displaySuccessMessage}
                />
            )}

            {openEditSkillDialog && (
                <EditSkillDialog
                    isOpen={true}
                    onClose={() => toggleEditSkillDialog(null)}
                    portfolioId={portfolio.portfolio.id}
                    skillId={editSkillId!}
                    changeSkillData={setSkillData}
                    existingSkillDescription={editSkillDescription}
                    existingSkillTitle={editSkillTitle}
                    existingSkillEndorsers={skillData.find((skill) => skill.id === editSkillId)?.endorsers!}
                    setSuccessMessage={displaySuccessMessage}
                />
            )}
            {openAddExpereinceDialog && (
                <AddExperienceDialog isOpen={true} onClose={toggleAddExperienceDialog} onClick={() => addExperience()} portfolioId={portfolio.portfolio.id} setExperienceData={setExperienceData} setSuccessMessage={displaySuccessMessage} />
            )}

            {openEditExperienceDialog && (
                <EditExperienceDialog
                    isOpen={true}
                    onClose={() => { toggleEditExperienceDialog(null) }}
                    setSuccessMessage={displaySuccessMessage}
                    handleExperienceUpdate={setExperienceData}
                    existingExperience={editExperience}
                    endorser={experienceData.find((experience) => experience.id === editExperience?.id)?.endorsers!}
                />
            )}

            {openEditPortfolioDialog && (
                <EditPortfolioDialog
                    isOpen={true}
                    onClose={() => toggleEditPortfolioDialog()}
                    onClick={toggleEditPortfolioDialog}
                    portfolioId={portfolioData.portfolio.id}
                    phoneNumber={portfolioData.portfolio.phone_number ?? ''}
                    major={portfolioData.portfolio.major ?? 0}
                    aboutMe={portfolioData.portfolio.about ?? ''}
                    workingStatus={portfolioData.portfolio.working_status ?? 0}
                    setSuccessMessage={displaySuccessMessage}
                    handlePortfolioUpdate={handlePortfolioUpdate}
                />
            )}

            {openAddEducationDialog && (
                <AddEducationDialog isOpen={true} onClose={toggleAddEducationDialog} onClick={() => addEducation()} portfolioId={portfolio.portfolio.id} setSuccessMessage={displaySuccessMessage} setEducationData={setEducationData} />
            )}

            {openEditEducationDialog && (
                <EditEducationDialog
                    isOpen={true}
                    onClose={() => { toggleEditEducationDialog(null) }}
                    onClick={() => { toggleEditEducationDialog(null) }}
                    portfolioId={portfolio.portfolio.id}
                    setSuccessMessage={displaySuccessMessage}
                    changeEducationData={setEducationData}
                    existingEducationCenter={editEducationCenter}
                    existingFieldOfStudy={editFieldOfStudy}
                    existingEducationDescription={editEducationDescription}
                    exisitingSelectedStartMonth={editSelectedStartMonth}
                    exisitingSelectedStartYear={editSelectedStartYear}
                    exisitingSelectedEndMonth={editSelectedEndMonth}
                    exisitingSelectedEndYear={editSelectedEndYear}
                    existingEducationId={editEducationId!}
                />
            )}

            {viewCertificateDialog && achievementData && (
                <CertificateDialog
                    owner={true}
                    onClose={() => setViewCertificateDialog(false)}
                    achievement={singleAchievementData}
                    onEdit={toggleEditCertificateDialog}
                    ableToUpdate={true}
                />
            )}

            {editCertificateDialog
                && singleAchievementData && (
                    <EditCertificateDialog
                        achievement={singleAchievementData}
                        onClose={() => setEditCertificateDialog(false)}
                        onSave={handleUpdatedAchievement}
                        setSuccessMessage={displaySuccessMessage}
                        onDelete={handleDeleteAchievement}
                    />
                )}

        </div>
    );
}