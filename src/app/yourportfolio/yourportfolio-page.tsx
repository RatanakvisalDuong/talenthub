// src/app/yourportfolio/yourportfolio-page.tsx

"use client"

import ExperienceCard from "@/components/experienceCard/experienceCard";
import ProjectCard from "@/components/projectCard/projectCard";
import WorkingStatusBar from "@/components/workingStatus/workingStatusBar";
import { getMajorName, majors } from "@/dummydata/major";
import { ShareIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AddProjectDialog from "./addproject-dialog";
import { Portfolio } from "../type/portfolio";
import SkillCard from "@/components/skillCard/skillCard";
import AddSkillDialog from "./addskill-dialog";
import AddExperienceDialog from "./addexperience-dialog";
import EducationCard from "@/components/educationCard/educationCard";
import AddEducationDialog from "./addeducation-dialog";
import { Skill } from "../type/skill";
import EditSkillDialog from "./editskill-dialog";
import AddCertificateDialog from "./addachievement-dialog";
import CertificateDialog from "@/components/achievementDialog/achievementDialog";
import EditPortfolioDialog from "./editportfolio-dialog";
import { Education } from "../type/education";
import EditEducationDialog from "./editeducation-dialog";
import { Experience } from "../type/experience";
import EditExperienceDialog from "./editexperience-dialog";
import { Achievement } from "../type/achievement";
import AchievementCard from "@/components/achievementCard/achievementCard";
import EditCertificateDialog from "./editachievement-dialog";

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
        // window.location.reload();
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
        navigator.clipboard.writeText(`http://localhost:3000/portfolio/${portfolio.portfolio.id}`);
    }

    const displaySuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 4000);
    };

    return (
        <div className="bg-[#E8E8E8] w-screen h-screen overflow-hidden fixed">
            {}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between">
                {successMessage && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50 mt-18">
                        {successMessage}
                    </div>
                )}
                <div className="flex justify-between w-full">
                    <div className="h-[87vh] w-[30%] flex flex-col justify-between overflow-y-auto">
                        <div className={`${expandedProject ? 'h-auto' : 'h-[32%]'} bg-white rounded-lg shadow-md p-4 relative`}>
                            <div className="flex justify-between items-center">
                                <p className="text-black font-bold text-lg">Projects</p>
                                <button
                                    className="flex items-center bg-[#5086ed] font-semibold py-2 px-4 rounded-md cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group"
                                    onClick={() => toggleAddProjectDialog()}
                                >
                                    <i className="fas fa-plus group-hover:text-white transition-colors duration-300"></i>
                                </button>
                            </div>
                            <div className="w-25 bg-[#dfdfdf] h-[2px] mt-1"></div>
                            {projectData.length > 0 ? (
                                <>
                                    {projectData
                                        .slice(0, expandedProject ? projectData.length : 2)
                                        .map((project) => (
                                            <ProjectCard key={project.project_id} project={project} />
                                        ))}

                                    {projectData.length > 2 && (
                                        <div className={`h-40px ${projectData.length > 2 ? 'block' : 'hidden'}`}>
                                            <button
                                                onClick={toggleDropdownProject}
                                                className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold"
                                            >
                                                {expandedProject ? 'See Less' : 'See More'}
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="justify-center items-center flex text-[#808080]">No projects available</p>
                            )}
                        </div>
                        <div className={`h-[65%] bg-white rounded-lg shadow-md p-4 ${expandedProject ? 'mt-10' : 'mt-0'} overflow-y-auto`}>
                            <div className="flex justify-between items-center">
                                <p className="text-black font-bold text-lg">Achievements & Certificate</p>
                                <button className="flex items-center bg-[#5086ed] font-semibold py-2 px-4 rounded-md cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group" onClick={toggleAddCertificateDialog}>
                                    <i className="fas fa-plus group-hover:text-white transition-colors duration-300"></i>
                                </button>
                            </div>
                            <div className="w-70 bg-[#dfdfdf] h-[2px] mt-1"></div>
                            {Array.isArray(achievementData) && achievementData.length === 0 ? (
                                <p className="text-[#808080] text-md mt-4 justify-center items-center flex">No achievement & certificate available</p>
                            ) : (
                                Array.isArray(achievementData) && achievementData.length > 0 && (
                                    achievementData.map((achievement) => (
                                        <AchievementCard key={achievement.id} achievement={achievement} onClick={() => toggleCertificateDialog(achievement)}
                                        />
                                    ))
                                )
                            )}
                        </div>
                    </div>
                    <div className="h-[87vh] w-[68%] overflow-y-auto pr-6 overflow-x-hidden">
                        <div className="flex justify-between h-[35%]">
                            <div className="w-[68%] bg-white rounded-lg shadow-md py-4 overflow-y-auto">
                                <div className="flex items-center justify-start h-full">
                                    <div className="w-[40%] relative flex items-center justify-center">
                                        <div className="absolute top-0 right-0 z-10 -translate-y-1/2">
                                            <WorkingStatusBar status={portfolioData.portfolio.working_status} />
                                        </div>
                                        <div className="h-[90%] w-[90%] rounded-md overflow-hidden mx-auto flex items-center justify-center">
                                            <Image
                                                src={portfolioData.portfolio.photo || "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg?crop=0.66667xw:1xh;center,top&resize=1200:*"}
                                                alt="placeholder"
                                                width={200}
                                                height={200}
                                                className="aspect-square object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="justify-start w-[50%] h-full items-start ml-4 mt-4">
                                        <p className="text-black font-bold text-lg truncate">{portfolio.portfolio.user_name}</p>
                                        <div className="w-20 bg-[#dfdfdf] h-[2px] mt-1">
                                        </div>
                                        <div className="text-black mt-2 text-sm flex">
                                            <span className="font-bold mr-2">Email:</span>
                                            <p className="text-gray-600 truncate"> {portfolio.portfolio.email}</p>
                                        </div>
                                        <div className="text-black mt-2 text-sm flex">
                                            <span className="font-bold mr-2">Contact:</span> 
                                            <p className="text-gray-600 truncate"> {portfolioData.portfolio.phone_number ? portfolioData.portfolio.phone_number : 'N/A'}</p>
                                        </div>
                                        {portfolio.portfolio.role_id === 1 ?
                                            (<div className="text-black mt-2 text-sm flex">
                                                <span className="font-bold mr-2">Major:</span>
                                                <p className="text-gray-600 truncate"> {portfolio.portfolio.major ? getMajorName(portfolio.portfolio.major) : 'N/A'}</p>
                                            </div>
                                            )
                                            : <div></div>
                                        }
                                        <div className="flex justify-between">
                                            <button
                                                className="mt-4 rounded-sm text-black px-2 py-2 bg-[#C0DDEC] flex items-center font-bold cursor-pointer hover:scale-105 hover:brightness-105 transition-all duration-200 ease-in-out"
                                                onClick={toggleSharePortfolio}
                                            >
                                                <ShareIcon className="w-5 h-5 mr-2" />
                                                Share Portfolio
                                            </button>

                                            <button
                                                className="mt-4 rounded-sm text-white px-2 py-2 bg-[#ffc107] flex items-center font-bold cursor-pointer hover:scale-105 hover:brightness-105 transition-all duration-200 ease-in-out"
                                                onClick={toggleEditPortfolioDialog}
                                            >
                                                <PencilSquareIcon className="w-5 h-5 mr-2" />
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[30%] bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
                                <p className="text-gray-800 font-semibold text-lg pb-1">
                                    About Me
                                </p>
                                <div className="w-20 bg-[#dfdfdf] h-[2px] ">
                                </div>
                                <p className="text-gray-600 mt-2 text-sm leading-relaxed text-justify">
                                    {portfolioData.portfolio.about ? portfolioData.portfolio.about : 'No description available'}
                                </p>
                            </div>

                        </div>
                        <div className={`w-full ${expandedExperience ? 'h-auto' : 'h-max'} bg-white rounded-lg shadow-lg p-6 mt-8 mr-3`}>
                            <div className="flex justify-between items-center">
                                <p className="text-black font-bold text-lg">Experience</p>
                                <button className="flex items-center bg-[#5086ed] font-semibold py-2 px-4 rounded-md cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group" onClick={toggleAddExperienceDialog}>
                                    <i className="fas fa-plus group-hover:text-white transition-colors duration-300"></i>
                                </button>
                            </div>
                            <div className="h-[2px] bg-gray-300 w-40 mt-2 mb-2"></div>
                            {Array.isArray(experienceData) && experienceData.length === 0 ? (
                                <p className="justify-center items-center flex text-[#808080]">No experience available</p>
                            ) : (
                                Array.isArray(experienceData) && experienceData.length > 0 && (
                                    experienceData.slice(0, expandedExperience ? experienceData.length : 2).map((experience, index) => (
                                        <ExperienceCard
                                            key={experience.id}
                                            experience={experience}
                                            index={index}
                                            dropdownOpen={dropdownOpen}
                                            toggleDropdown={toggleDropdown}
                                            owner={true}
                                            openEditExperienceDialog={() => toggleEditExperienceDialog(experience)}
                                        />
                                    ))
                                )
                            )}

                            <div className={`h-40px ${experienceData.length > 2 ? 'block' : 'hidden'}`}>
                                <button
                                    onClick={toggleExpandedExperience}
                                    className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold"
                                >
                                    {expandedExperience ? 'See Less' : 'See More'}
                                </button>
                            </div>
                        </div>

                        <div className={`w-full ${expandedSkill ? 'h-auto' : 'h-max'} bg-white rounded-lg shadow-lg p-6 mt-8 mr-3`}>
                            <div className="flex justify-between items-center">
                                <p className="text-black font-bold text-lg">Skill</p>
                                <button className="flex items-center bg-[#5086ed] font-semibold py-2 px-4 rounded-md cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group" onClick={toggleAddSkillDialog}>
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
                                        : <p className="justify-center items-center flex text-[#808080]">No skill available</p>
                                )
                                : <p className="justify-center items-center flex text-[#808080]">No skills available</p>
                            }

                            <div className={`h-40px ${skillData.length > 2 ? 'block' : 'hidden'}`} key="seeMoreButton">
                                <button
                                    onClick={toggleExpandedSkill}
                                    className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold"
                                >
                                    {expandedSkill ? 'See Less' : 'See More'}
                                </button>
                            </div>
                        </div>
                        <div className={`w-full ${expandedEducation ? 'h-auto' : 'h-max'} bg-white rounded-lg shadow-lg p-6 mt-8 mr-3`}>
                            <div className="flex justify-between items-center">
                                <p className="text-black font-bold text-lg">Education</p>
                                <button
                                    className="flex items-center bg-[#5086ed] font-semibold py-2 px-4 rounded-md cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group"
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
                                <p className="justify-center items-center flex text-[#808080]">No education available</p>
                            )}
                            <div className={`h-40px ${educationData.length > 2 ? 'block' : 'hidden'}`} key="seeMoreButton">
                                <button
                                    onClick={toggleExpandedEducation}
                                    className="mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold"
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
            {(openAddProjectDialog || openAddSkillDialog || openAddExpereinceDialog || openAddEducationDialog || openAddCertificateDialog || openEditSkillDialog || viewCertificateDialog || openEditPortfolioDialog || openEditEducationDialog || openEditExperienceDialog || editCertificateDialog) && (
                <div className="fixed inset-0 blur-sm backdrop-blur-md z-40" />
            )}

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