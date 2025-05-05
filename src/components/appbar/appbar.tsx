"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { BellIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import LoginDialog from "@/dialogs/login_dialog/login_dialog";
import { Ubuntu } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import { Notification } from "@/app/type/notification";

const ubuntuFont = Ubuntu({
	subsets: ["latin"],
	weight: ["400", "700"],
});

const Appbar = React.memo(() => {
	const { data: session, status } = useSession();
	const isAuthenticated = status === "authenticated" && session;
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const notificationRef = useRef<HTMLDivElement>(null);
	const [profilePicture, setProfilePicture] = useState<string | null>(null);
	const [notification, setNotification] = useState<Notification[]>([]);

	useEffect(() => {
		if (isAuthenticated) {
			getNotification();
		}

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
	}, [session]);

	const getNotification = async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}view_notification`, {
				params: {
					user_google_id: session?.googleId,
					limit: 10
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.accessToken}`
				}


			});
			console.log('Session:', session);
			console.log("Notification response:", response.data);
			setNotification(response.data || []);
		} catch (error) {
			console.error("Failed to fetch notifications:", error);
		}
	}

	const handleLogin = () => {
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	const handleNotificationClick = () => {
		getNotification();
		setNotificationDropdownOpen(!notificationDropdownOpen);
	};

	const mapEndorsementStatus = (statusId: number) => {
		switch (statusId) {
			case 1:
				return "Pending";
			case 2:
				return "Approved";
			case 3:
				return "Declined";
			default:
				return "Unknown Status";
		}
	};

	const mapEndorsementType = (endorsementTypeId: number | null) => {
		switch (endorsementTypeId) {
			case 1:
				return "Skill";
			case 2:
				return "Project";
			case 3:
				return "Experience";
			case 4:
				return "Achievement & Certification";
			default:
				return "Unknown Type";
		}
	};

	const handleAccept = (id: number) => {
		console.log(`Accepted endorsement with ID: ${id}`);
	};

	const handleDecline = (id: number) => {
		console.log(`Declined endorsement with ID: ${id}`);
	};

	const goBackHome = async () => {
		axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}logout`,
			{
				headers: {
					Authorization: `Bearer ${session?.accessToken}`,
				},
			}
		);
		signOut();
	};

	return (
		<nav className={`${ubuntuFont.className} bg-white shadow-md w-full fixed top-0 left-0 right-0 z-50`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link className="flex" href="/">
						<h1 className="text-2xl font-bold text-black cursor-pointer">
							Talent
						</h1>
						<h1 className="text-[#5086ed] text-2xl font-bold cursor-pointer">Hub</h1>
						<div className="ml-16">
							{isAuthenticated ? (
								<div className="bg-[#5086ed] text-white px-2 py-1 rounded-md cursor-pointer">
									<p className="text-white">{session.roleId === 1 ? "Student" : "Endorser"}</p>
								</div>
							) : (
								<div></div>
							)}
						</div>
					</Link>

					<div className="flex items-center space-x-6">
						{isAuthenticated && (
							<div className="relative mr-4" ref={notificationRef}>
								<BellIcon
									className="w-8 h-8 text-black cursor-pointer mr-4"
									onClick={handleNotificationClick}
								/>
								<span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center mr-4">
									{notification.filter((notification) => notification.status == 1).length}
								</span>

								{notificationDropdownOpen && (
									<div className="absolute right-0 mt-2 w-130 bg-white rounded-md shadow-lg py-1 z-10">
										{notification.length > 0 ? (
											notification.map((notification) => (
												<div
													key={notification.id}
													className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${notification.status === 1 ? "bg-gray-100" : ""}`}
												>
													{/* Type 1: Project collaboration */}
													{notification.type === 1 ? (
														notification.status === 1 ? (
															<div>
																{notification.owner_name} has invited you to be a collaborator to their project: Project {notification.title}
																<div className="flex space-x-2 mt-2">
																	<button
																		onClick={() => handleAccept(notification.id)}
																		className="px-4 py-1 bg-[#5086ed] text-white rounded-md cursor-pointer"
																	>
																		Accept
																	</button>
																	<button
																		onClick={() => handleDecline(notification.id)}
																		className="px-4 py-1 bg-white text-black rounded-md border border-2 border-[#5086ed] cursor-pointer hover:bg-gray-200"
																	>
																		Decline
																	</button>
																</div>
															</div>
														) : session.googleId === notification.owner_google_id ? (
															/* Owner viewing collaboration response (status 2 or 3) */
															<div>{notification.receiver_name} has {mapEndorsementStatus(notification.status).toLowerCase()} your project collaboration invitation for: Project {notification.title}</div>
														) : (
															/* Receiver viewing their response (status 2 or 3) */
															<div>You have {mapEndorsementStatus(notification.status).toLowerCase()} {notification.owner_name}'s project {notification.title} collaboration.</div>
														)
													) : (
														/* Type 2: Endorsement */
														notification.status === 1 ? (
															<div>
																{notification.owner_name} has requested you to endorse their {mapEndorsementType(notification.endorsement_type).toLowerCase()}: {mapEndorsementType(notification.endorsement_type)} {notification.title}
																<div className="flex space-x-2 mt-2">
																	<button
																		onClick={() => handleAccept(notification.id)}
																		className="px-4 py-1 bg-[#5086ed] text-white rounded-md cursor-pointer"
																	>
																		Accept
																	</button>
																	<button
																		onClick={() => handleDecline(notification.id)}
																		className="px-4 py-1 bg-white text-black rounded-md border border-2 border-[#5086ed] cursor-pointer hover:bg-gray-200"
																	>
																		Decline
																	</button>
																</div>
															</div>
														) : session.googleId === notification.owner_google_id ? (
															/* Owner viewing endorsement response (status 2 or 3) */
															<div>{notification.receiver_name} has {mapEndorsementStatus(notification.status).toLowerCase()} your endorsement request for your {mapEndorsementType(notification.endorsement_type).toLowerCase()}: {notification.title}</div>
														) : (
															/* Receiver viewing their endorsement response (status 2 or 3) */
															<div>You have {mapEndorsementStatus(notification.status).toLowerCase()} their {mapEndorsementType(notification.endorsement_type).toLowerCase()}: {mapEndorsementType(notification.endorsement_type)} {notification.title}</div>
														)
													)}
												</div>
											))
										) : (
											<div className="px-4 py-2 text-sm text-gray-700 h-20 flex items-center justify-center">
												No notifications
											</div>
										)}
									</div>
								)}
							</div>
						)}

						{isAuthenticated ? (
							<div className="relative" ref={dropdownRef}>
								<div
									className="flex items-center space-x-2 cursor-pointer"
									onClick={() => setDropdownOpen(!dropdownOpen)}
								>
									{/* <div className="h-8 w-8 rounded-full overflow-hidden relative">
										{session.photo ? (
											<Image
												src={session.photo || "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg?crop=0.66667xw:1xh;center,top&resize=1200:*"}
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
									</div> */}
									<span className="text-black font-medium">{session.user?.name || "User"}</span>
								</div>

								{dropdownOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
										<Link
											href="/yourportfolio"
											className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											<UserCircleIcon className="h-5 w-5 mr-2 text-gray-500" />
											Your Portfolio
										</Link>
										<button
											onClick={() => {
												goBackHome();
											}}
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

			{isDialogOpen && <div className="fixed inset-0 blur-sm backdrop-blur-md z-40"></div>}
			<LoginDialog isOpen={isDialogOpen} onClose={closeDialog} />
		</nav>
	);
});

export default Appbar;