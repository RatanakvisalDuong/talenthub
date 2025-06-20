import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface RemoveCollaboratorDialogProps {
    projectId: number;
    collaboratorId: string;
    onClose: () => void;
}

export default function RemoveCollaboratorDialog({ projectId, collaboratorId, onClose }: RemoveCollaboratorDialogProps) {
    const router = useRouter();
    const session = useSession();
    const [loading, setLoading] = useState(false);

    const handleRemoveCollaborator = async () => {
        setLoading(true);
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}delete_collaborator_request/${projectId}`,
                {
                    data: {
                        user_google_id: collaboratorId,
                    },
                    headers: {
                        Authorization: `Bearer ${session.data?.accessToken}`,
                    },
                }
            );
            router.refresh();
            onClose();
        } catch (error) {
            console.error('Error removing collaborator:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-md shadow-lg p-6 w-[400px] text-center">
                <p className="text-lg font-semibold mb-4 text-red-600">Confirm Remove</p>
                <p className="text-gray-700 mb-6">Are you sure you want to remove this collaborator from this project? This action cannot be undone.</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 hover:cursor-pointer"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 hover:cursor-pointer"
                        onClick={handleRemoveCollaborator}
                        disabled={loading}
                    >
                        {loading ? "Removing..." : "Yes, Remove"}
                    </button>
                </div>
            </div>
        </div>
    );
}