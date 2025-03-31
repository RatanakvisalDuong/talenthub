import Image from "next/image";
import React, { useState } from "react";

type Props = {
    owner: boolean
    onClose: () => void;
};

const CertificateDialog: React.FC<Props> = ({ owner, onClose }) => {
    const certificate = {
        id: 1,
        title: "Certified Ethical Hacking",
        issuer: "Coursera",
        date: "2023-10-01",
        endorsers: [
            { name: "John Doe" },
            { name: "Jane Smith" },
            { name: "Alice Johnson" }
        ]
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        console.log("Dropdown toggled");
        setDropdownOpen(!dropdownOpen);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative bg-white rounded-md p-6 w-[850px] h-[350px] max-w-full shadow-lg overflow-y-auto flex items-start gap-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-black hover:text-red-500"
                    aria-label="Close dialog"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="w-[60%]">
                    <Image src="/certificate.png" alt="Certificate" width={500} height={500} className="rounded" />
                </div>
                <div className="w-[38%] flex flex-col justify-start items-start ml-2 text-black">
                    <p className="w-full text-lg font-bold">
                        Certified Ethical Hacking
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Coursera
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Issued On: 2023-10-01
                    </p>
                    <div className="relative" onClick={toggleDropdown}>
                        <div
                            className="mt-2 py-2 px-4 bg-[#C0DDEC] rounded-full flex items-center cursor-pointer"
                        >
                            <Image src="/verified.png" alt="Verified" width={20} height={20} className="mr-2" />
                            <span className="text-sm text-black">Endorsed</span>
                        </div>
                        {dropdownOpen && (
                            <div className="absolute p-2 w-48 bg-white border rounded-md shadow-lg ml-4z-10">
                                <ul>
                                    {certificate.endorsers.map((endorser, idx) => (
                                        <li
                                            key={idx}
                                            className="py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded cursor-pointer"
                                        >
                                            {endorser.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="mt-2 h-[170px] w-full text-sm">
                        <p className="text-gray-500">
                            This certificate verifies that the recipient has successfully completed the Certified Ethical Hacking course, demonstrating proficiency in ethical hacking techniques and methodologies.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CertificateDialog;