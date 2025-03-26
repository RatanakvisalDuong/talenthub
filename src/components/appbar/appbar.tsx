'use client';

import { Ubuntu } from "next/font/google";
import { BellIcon } from '@heroicons/react/20/solid';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useRef, useEffect } from 'react';
import LoginDialog from "@/dialogs/login_dialog/login_dialog";
import { projectEndorsement } from "@/dummydata/projectEndorsement";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ubuntuFont = Ubuntu({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function Appbar() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const isAuthenticated = status === "authenticated" && session;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setNotificationDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogin = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const handleNotificationClick = () => {
        setNotificationDropdownOpen(!notificationDropdownOpen);
    };

    const mapEndorsementStatus = (statusId: number) => {
        switch (statusId) {
            case 1:
                return "Pending + Not yet viewed";
            case 2:
                return "Pending + Viewed";
            case 3:
                return "Approved";
            case 4:
                return "Declined";
            case 5:
                return "Banned";
            default:
                return "Unknown Status";
        }
    };

    const handleAccept = (id: number) => {
        console.log(`Accepted endorsement with ID: ${id}`);
    };

    const handleDecline = (id: number) => {
        console.log(`Declined endorsement with ID: ${id}`);
    };

    const goBackHome = () => {
        router.push("/");
    }

    return (
        <nav className={`${ubuntuFont.className} bg-white shadow-md w-full fixed top-0 left-0 right-0 z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex" onClick={() => goBackHome()}>
                    <h1 className="text-2xl font-bold text-black cursor-pointer" >
                        Talent
                    </h1>
                    <h1 className="text-[#5086ed] text-2xl font-bold cursor-pointer">Hub</h1>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        {isAuthenticated ? (
                            <div className="relative mr-4" ref={notificationRef}>
                                <BellIcon
                                    className="w-8 h-8 text-black cursor-pointer mr-4"
                                    onClick={handleNotificationClick}
                                />
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center mr-4">
                                    {projectEndorsement.filter((endorsement) => endorsement.endorsement_status_id === 1).length}
                                </span>

                                {notificationDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-100 bg-white rounded-md shadow-lg py-1 z-10">
                                        {projectEndorsement.map((endorsement) => (
                                            <div
                                                key={endorsement.id}
                                                className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${endorsement.endorsement_status_id === 1 ? "bg-gray-100" : ""}`}
                                            >
                                                {endorsement.endorsement_status_id === 1 ? `User ${endorsement.endorser} Request to endorse their project ${endorsement.project}` : `You have ${mapEndorsementStatus(endorsement.endorsement_status_id)} their project: Project ${endorsement.project}`}

                                                {(endorsement.endorsement_status_id === 1) && (
                                                    <div className="flex space-x-2 mt-2 justify-between">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleAccept(endorsement.id)}
                                                                className="px-4 py-1 bg-[#5086ed] text-white rounded-md cursor-pointer "
                                                            >
                                                                Accept
                                                            </button>
                                                            <button
                                                                onClick={() => handleDecline(endorsement.id)}
                                                                className="px-4 py-1 bg-white text-black rounded-md border border-2 border-[#5086ed] cursor-pointer hover:bg-gray-200"
                                                            >
                                                                Decline
                                                            </button>
                                                        </div>

                                                        {(endorsement.endorsement_status_id === 1)
                                                            ? <div className="text-gray-500 text-sm w-2 h-2 rounded-full bg-[#5086ed]"></div> : <div></div>}
                                                    </div>

                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div></div>
                        )}

                        {isAuthenticated ? (
                            <div className="relative" ref={dropdownRef}>
                                <div
                                    className="flex items-center space-x-2 cursor-pointer"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <div className="h-8 w-8 rounded-full overflow-hidden relative">
                                        {session.user?.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt="Profile"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                                                <span className="text-gray-600">
                                                    {session.user?.name?.charAt(0) || "U"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-black font-medium">
                                        {session.user?.name || "User"}
                                    </span>
                                </div>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                        <Link
                                            href="/portfolio"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <UserCircleIcon className="h-5 w-5 mr-2 text-gray-500" />
                                            Your Portfolio
                                        </Link>
                                        <button
                                            onClick={() => signOut()}
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-gray-500" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                className="px-4 py-2 bg-[#5086ed] text-white rounded-md cursor-pointer"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 blur-sm backdrop-blur-md z-40"></div>
            )}
            <LoginDialog isOpen={isDialogOpen} onClose={closeDialog} />
        </nav>
    );
}
