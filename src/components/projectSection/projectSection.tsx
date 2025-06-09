import { Portfolio } from "@/app/type/portfolio";
import { useState } from "react";
import ProjectCard from "../projectCard/projectCard";

export default function ProjectsSection({ portfolio, owner, addProject }: { portfolio: Portfolio; owner: boolean, addProject: () => void }) {
    const [expandedProject, setExpandedProject] = useState(false);

    const toggleDropdownProject = () => {
        setExpandedProject(!expandedProject);
    };
    const visibleProjects = portfolio.projects.filter(project => owner || project.project_visibility_status !== 1);

    return (
        <div className={`${expandedProject ? 'h-auto' : 'h-[180px] sm:h-[200px] md:h-[225px]'} bg-white rounded-xl shadow-sm p-2 sm:p-3 md:p-4 relative border border-gray-200 shadow-sm mb-2 sm:mb-3 md:mb-4`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <i className="fas fa-folder text-blue-500 mr-1 sm:mr-2 text-sm sm:text-base"></i>
                    <p className="font-bold text-sm sm:text-base md:text-lg text-black">Projects</p>
                </div>
                {owner && (
                    <button
                        className="flex items-center bg-blue-500 font-semibold py-1 px-2 sm:py-2 sm:px-3 md:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out group"
                        onClick={() => addProject()}
                    >
                        <i className="fas fa-plus group-hover:text-white transition-colors duration-300 text-white text-xs sm:text-sm"></i>
                    </button>
                )}
            </div>

            <div className="w-25 bg-[#dfdfdf] h-[1px] sm:h-[2px] mt-1"></div>

            {visibleProjects.length > 0 ? (
                <>
                    {visibleProjects
                        .slice(0, expandedProject ? visibleProjects.length : 2)
                        .map((project) => (
                            <ProjectCard
                                key={project.project_id}
                                project={project}
                            />
                        ))}
                    {visibleProjects.length > 2 && (
                        <div className="h-8 sm:h-10">
                            <button
                                onClick={toggleDropdownProject}
                                className="mt-2 sm:mt-3 md:mt-4 text-blue-400 hover:underline w-full mx-auto font-semibold cursor-pointer text-xs sm:text-sm"
                            >
                                {expandedProject ? 'See Less' : 'See More'}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl sm:rounded-2xl mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                        <i className="fa-solid fa-file text-slate-400 text-sm sm:text-lg md:text-xl" />
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">No project available</p>
                </div>
            )}
        </div>
    );
}