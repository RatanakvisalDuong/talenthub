"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import EndorserInput from "@/components/endorsementInput/endorsementInput";
import TextInput from "@/components/textinput/textInput";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Skill } from "../../type/skill";
import { Endorser } from "../../type/endorser";
import { useRouter } from "next/navigation";

const EditSkillDialog = ({
    isOpen,
    onClose,
    portfolioId,
    skillId,
    changeSkillData,
    existingSkillTitle,
    existingSkillDescription,
    existingSkillEndorsers,
    setSuccessMessage,
}: {
    isOpen: boolean;
    onClose: () => void;
    portfolioId: number;
    skillId: number;
    changeSkillData: React.Dispatch<React.SetStateAction<Skill[]>>;
    existingSkillTitle: string;
    existingSkillDescription: string;
    existingSkillEndorsers: Endorser[] | [];
    setSuccessMessage: (message: string) => void;
}) => {
    const { data: session } = useSession();
    const router = useRouter();

    const [skillTitle, setSkillTitle] = useState(existingSkillTitle);
    const [skillDescription, setSkillDescription] = useState(existingSkillDescription);
    const [endorsers, setEndorsers] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setSkillTitle(existingSkillTitle);
        setSkillDescription(existingSkillDescription);
        setEndorsers(existingSkillEndorsers.map(e => e.email));
    }, [existingSkillTitle, existingSkillDescription, existingSkillEndorsers]);

    const handleEndorserChange = (updated: string[]) => setEndorsers(updated);

    const handleEditSkill = async () => {
        if (endorsers.includes(session?.user?.email || '')) {
            setError("You cannot endorse your own skill.");
            return;
        }
        if(skillDescription == "" || skillTitle == "") {
            setError("Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}update_skill/${skillId}`,
                { title: skillTitle, description: skillDescription, endorsers: endorsers },
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.message === 'Skill updated successfully!') {
                existingSkillEndorsers

                const updatedSkill = {
                    id: skillId,
                    portfolio_id: portfolioId,
                    title: skillTitle,
                    description: skillDescription,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    endorsers: response.data.endorsers,
                };
                router.refresh();

                setSuccessMessage("Skill updated successfully!");
                changeSkillData((prev) =>
                    prev.map((skill) => (skill.id === skillId ? updatedSkill : skill))
                );
                onClose();
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteSkill = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}delete_skill/${skillId}`,
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.message == 'Skill and its endorsers deleted successfully.') {
                changeSkillData((prev) => prev.filter((s) => s.id !== skillId));
            }
            router.refresh();
            setShowDeleteConfirmation(false)
            setSuccessMessage("Skill deleted successfully!");
            onClose();
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            {/* Main Dialog */}
            <div className={`bg-white rounded-xl p-6 w-[500px] max-w-full shadow-lg overflow-y-auto z-50 relative`}>
                {loading && (
                    <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Update Skill</h2>
                    <button onClick={onClose} className="text-black hover:text-red-500 cursor-pointer">
                        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="h-[2px] w-24 bg-gray-200 mb-2" />

                <form className="w-full space-y-4">
                    <TextInput
                        id="skillTitle"
                        label="Skill Title"
                        required
                        placeholder="Enter your skill title"
                        value={skillTitle}
                        onChange={(e) => setSkillTitle(e.target.value)}
                    />
                    <BigTextInput
                        id="description"
                        label="Skill Description"
                        required
                        placeholder="Enter skill description"
                        value={skillDescription}
                        onChange={(e) => setSkillDescription(e.target.value)}
                    />
                    <EndorserInput onEndorserChange={handleEndorserChange} existingEndorsers={endorsers} />
                </form>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="flex justify-between items-center mt-6">
                    <button
                        type="button"
                        className="text-white bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 hover:cursor-pointer"
                        onClick={() => setShowDeleteConfirmation(true)}
                        disabled={loading}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 hover:cursor-pointer"
                        onClick={handleEditSkill}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Popup */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] text-center">
                        <p className="text-lg font-semibold mb-4 text-red-600">Confirm Delete</p>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete this skill? This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer" 
                                onClick={() => setShowDeleteConfirmation(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 hover:cursor-pointer"
                                onClick={handleDeleteSkill}
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditSkillDialog;
