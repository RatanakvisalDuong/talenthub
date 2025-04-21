import { Project } from "@/app/type/project";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <Link
            key={project.id}
            className="mt-4 px-4 py-2 bg-white w-full rounded-md shadow-sm text-black cursor-pointer hover:transform hover:scale-105 text-sm flex items-center justify-between" href={`/project/${project.id}`}>
            <div className="flex items-center mr-2 w-[70%] flex overflow-hidden text-ellipsis whitespace-nowrap">
                <div className="bg-[#5086ed] w-2 h-2 rounded-full animate-pulse"></div>
                <div className="ml-2">
                    <p>{project.title}</p>
                </div>
            </div>
        </Link>
    );
}
