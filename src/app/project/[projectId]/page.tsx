import Layout from "@/components/layout/layout";
import ProjectPage from "./projectpage-component";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { notFound } from "next/navigation";

export default async function ProjectPageContainer({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    const session = await getServerSession(authOptions);
    let projectData;
    
    try {
        // First attempt without token
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}view_project_detail/${projectId}`,
        );
        projectData = response.data;
    } catch (error: any) {
        console.log("KDMV", error);
        
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
                    <Layout>
                        <div className="flex items-center justify-center h-screen bg-white">
                            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                                <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                                <p className="text-black mb-4">This project is private or does not exist.</p>
                                <a href="/" className="text-blue-600 hover:underline">Return to Home</a>
                            </div>
                        </div>
                    </Layout>
                );
            }
        } else {
            return (
                <Layout>
                    <div className="flex items-center justify-center h-screen">
                        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                            <p className="text-black mb-4">Unable to load this project. It may be private or does not exist.</p>
                            <a href="/" className="text-blue-600 hover:underline">Return to Home</a>
                        </div>
                    </div>
                </Layout>
            );
        }
    }
    
    return <Layout><ProjectPage projectData={projectData} /></Layout>;
}