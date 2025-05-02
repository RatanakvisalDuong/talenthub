import Layout from "@/components/layout/layout";
import ProjectPage from "./projectpage-component";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { notFound } from "next/navigation";
import PageNotFound from "@/components/pagenotfound/page";

export default async function ProjectPageContainer({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    const session = await getServerSession(authOptions);
    let projectData;
    let response: any;
    try {
        response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}view_project_detail/${projectId}`,
        );
        projectData = response.data;
        console.log(response.data)
        if (response.data.user_status === 0) {
            return <PageNotFound />;
        }
    } catch (error: any) {
        if (error.response?.status === 401) {
            try {
                const retryResponse = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}view_project_detail/${projectId}`,
                    {
                        'token': session?.accessToken,
                    }
                );
                projectData = retryResponse.data;
            }
            catch (retryError) {
                return (
                    <PageNotFound />
                );
            }
        } else {
            return (
                <PageNotFound />
            );
        }
    }
    return <ProjectPage projectData={projectData} />
}