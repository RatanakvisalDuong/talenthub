"use client";

import EndorserInput from "@/components/endorsementInput/endorsementInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

const AddCollaboratorDialog = ({ isOpen, onClose, onClick, projectId }: { isOpen: boolean; onClose: () => void; onClick: () => void; projectId: number }) => {
    const router = useRouter();
    const session = useSession();
    const [endorsers, setEndorsers] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleEndorserChange = (endorsers: string[]) => {
        setEndorsers(endorsers);
    };

    const handleAddEndorser = async () => {
        setLoading(true);
        if(endorsers.includes(session?.data?.user?.email || '')) {
            setError("You cannot be your own project collaborator.");
            setLoading(false);
            return;
        }
        if(endorsers.length === 0 || endorsers[0] === '') {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}add_collaborator_to_project/${projectId}`,
                {
                    emails: endorsers,
                },
                {
                    headers: {
                        Authorization: `Bearer ${session.data?.accessToken}`,
                    },
                }
            );
            setLoading(false);
            router.refresh();
            onClick();
        }
        catch (error) {
            console.error("Error adding endorsers:", error);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {loading ? (
                <div className="bg-white rounded-md p-6 w-[700px] max-w-full shadow-lg justify-center flex items-center">
                    <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
            ) : <div className="bg-white rounded-md p-6 w-[700px] max-w-full shadow-lg ">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Add Collaborators</h2>
                    <button onClick={onClose} className="text-black cursor-pointer hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="h-[2px] w-24 bg-gray-200 mb-2" />

                <div className="flex gap-x-6">
                    {/* Left side: Form */}
                    <form className="w-full">
                        <EndorserInput onEndorserChange={handleEndorserChange} existingEndorsers={endorsers} title="yes" label="Collaborator" />

                    </form>
                </div>
                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        {error}
                    </div>
                )}
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer"
                        onClick={handleAddEndorser}
                    >
                        Add Collaborators
                    </button>
                </div>
            </div>
            }
        </div>
    );
};

export default AddCollaboratorDialog;
