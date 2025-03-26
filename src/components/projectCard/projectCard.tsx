import Image from "next/image";

interface Project {
    id: number;
    name: string;

}

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div
            key={project.id}
            className="mt-4 px-4 py-2 bg-white w-full rounded-md shadow-sm text-black cursor-pointer hover:transform hover:scale-105 text-sm flex items-center justify-between"
        >
            <div className="flex items-center mr-2 w-[70%] flex overflow-hidden text-ellipsis whitespace-nowrap">
                <div className="bg-[#5086ed] w-2 h-2 rounded-full animate-pulse"></div>
                <div className="ml-2">
                    {project.name}
                </div>
            </div>

            <Image src='/download.png' alt="Download" width={30} height={30} className="align-end" />
        </div>
    );
}