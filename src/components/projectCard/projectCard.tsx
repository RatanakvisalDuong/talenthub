import { Project } from "@/app/type/project";
import Image from "next/image";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid"; // Import the ArrowDownLeftIcon

// The ProjectCard component that receives a project and displays its details
export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div
            key={project.id}
            className="mt-4 px-4 py-2 bg-white w-full rounded-md shadow-sm text-black cursor-pointer hover:transform hover:scale-105 text-sm flex items-center justify-between"
        >
            {/* Left Section: Display title and status */}
            <div className="flex items-center mr-2 w-[70%] flex overflow-hidden text-ellipsis whitespace-nowrap">
                <div className="bg-[#5086ed] w-2 h-2 rounded-full animate-pulse"></div>
                <div className="ml-2">
                    {/* Display the project title */}
                    <p>{project.title}</p>
                </div>
            </div>

            {/* Right Section: Download icon */}
            <ArrowDownCircleIcon className="text-back cursor-pointer w-[23px] h-[23px]"/>
        </div>
    );
}
