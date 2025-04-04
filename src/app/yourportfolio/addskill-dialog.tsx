"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import EndorserInput from "@/components/endorsementInput/endorsementInput";
import TextInput from "@/components/textinput/textInput";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Portfolio } from "../type/portfolio";
import { Skill } from "../type/skill";
import { Endorser } from "../type/endorser";

const AddSkillDialog = ({
    isOpen,
    onClose,
    onClick,
    portfolioId,
    setSkilldata,
    setSuccessMessage,
}: {
    isOpen: boolean;
    onClose: () => void;
    onClick: () => void;
    portfolioId: number;
    setSkilldata: React.Dispatch<React.SetStateAction<Skill[]>>;
    setSuccessMessage: (message: string) => void;
}) => {
    const { data: session } = useSession();

    const [skillTitle, setSkillTitle] = useState<string>("");
    const [skillDescription, setSkillDescription] = useState<string>("");
    const [endorsers, setEndorsers] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const handleEndorserChange = (endorsers: string[]) => {
        setEndorsers(endorsers);
    };

    const handleAddSkill = async () => {
        try {
            if (skillTitle === "" || skillDescription === "") {
                setError("Please fill in all required fields.");
                return;
            }
            if (endorsers.some(endorser => endorser === session?.user?.email)) {
                setError("You cannot endorse your own skill.");
                return;
            }
            else {
                setLoading(true);
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}create_skill`,
                    {
                        portfolio_id: portfolioId,
                        title: skillTitle,
                        description: skillDescription,
                        endorsers: endorsers,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${session?.accessToken}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    const skill: Skill = {
                        'id': response.data.skill_id,
                        'portfolio_id': portfolioId,
                        'title': skillTitle,
                        'description': skillDescription,
                        'created_at': new Date().toISOString(),
                        'updated_at': new Date().toISOString(),
                        'endorsers': response.data.endorsers
                    };
                    setSuccessMessage("Skill created successfully!");
                    setSkilldata(prevSkills => [...prevSkills, skill]);
                }
                setLoading(false);
                onClick();
                onClose();
            }
        } catch (error) {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 w-[500px] max-w-full shadow-lg overflow-y-auto z-50 relative">
                {/* Loading overlay - positioned relative to the dialog */}
                {loading && (
                    <div className="absolute inset-0 bg-white backdrop-blur-sm z-10 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}

                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Create New Skill</h2>
                    <button onClick={onClose} className="text-black cursor-pointer hover:text-red-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="h-[2px] w-24 bg-gray-200 mb-2" />

                <div className="flex gap-x-6">
                    <form className="w-full">
                        <TextInput
                            id="skillTitle"
                            label="Skill Title"
                            required
                            placeholder="Eg.Penetration Testing"
                            value={skillTitle}
                            onChange={(e) => setSkillTitle(e.target.value)}
                        />
                        <BigTextInput
                            id="description"
                            label="Skill Description"
                            placeholder="Eg.Penetration testing is a simulated cyber attack against your computer system to check for exploitable vulnerabilities."
                            value={skillDescription}
                            onChange={(e) => setSkillDescription(e.target.value)}
                            required
                        />
                        <EndorserInput onEndorserChange={handleEndorserChange} existingEndorsers={endorsers}/>
                    </form>
                </div>

                {error && (
                    <div className="text-red-500 text-sm ">
                        {error}
                    </div>
                )}

                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={handleAddSkill}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Skill"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSkillDialog;