"use client";

import EndorserInput from "@/components/endorsementInput/endorsementInput";
import TextInput from "@/components/textinput/textInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddEndorserDialog = ({ isOpen, onClose, onClick}: { isOpen: boolean; onClose: () => void; onClick: () => void}) => {
    const router = useRouter();
    const [endorsers, setEndorsers] = useState<string[]>([]);

    const handleEndorserChange = () => {
        setEndorsers(endorsers);
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 w-[700px] max-w-full shadow-lg ">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Add Endorsers</h2>
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
                        {/* <TextInput
                            id="link"
                            label="Collaborator Email"
                            required
                            placeholder="Eg.rduong1@paragoniu.edu.kh"
                        /> */}

                        <EndorserInput onEndorserChange={handleEndorserChange} existingEndorsers={endorsers} title="yes"/>

                    </form>
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                        // onClick={handleAddProject}
                    >
                        Add Endorsers
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEndorserDialog;
