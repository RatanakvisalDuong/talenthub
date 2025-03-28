"use client";

import BigTextInput from "@/components/bigtextinput/bigtextinput";
import EndorserInput from "@/components/endorsementInput/endorsementInput";
import TextInput from "@/components/textinput/textInput";
import { useState } from "react";

const AddSkillDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [skillTitle, setSkillTitle] = useState<string>('');
    
    const handleEndorserChange = (endorsers: string[]) => {
        console.log("Updated endorsers:", endorsers);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 w-[500px] max-w-full shadow-lg overflow-y-auto">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Add New Skill</h2>
                    <button onClick={onClose} className="text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="h-[2px] w-24 bg-gray-200 mb-2" />

                <div className="flex gap-x-6">
                    <form className="w-1/1">
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
                            placeholder="Enter skill description"
                            required
                        />

                        <EndorserInput onEndorserChange={handleEndorserChange} />
                    </form>
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Add Skill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSkillDialog;
