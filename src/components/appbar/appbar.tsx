"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { BellIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LoginDialog from "@/dialogs/login_dialog/login_dialog";
import { Ubuntu } from "next/font/google";
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
	const [notification, setNotification] = useState<Notification[]>([]);
	const [page, setPage] = useState(1);
	const [hasMoreNotifications, setHasMoreNotifications] = useState(true);

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
					page: page
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${session?.accessToken}`
				}
			});
			
			const newNotifications = response.data || [];
			
			// Check if we received any new notifications
			if (newNotifications.length === 0) {
				setHasMoreNotifications(false);
			}
			
			if (page === 1) {
				setNotification(newNotifications);
			} else {
				setNotification(prev => [...prev, ...newNotifications]);
			}
		} catch (error) {
			console.error("Failed to fetch notifications:", error);
			setHasMoreNotifications(false);
		}
	}

	const handleLogin = () => {
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	const handleNotificationClick = () => {
		// Reset to page 1 and hasMoreNotifications when opening notification dropdown
		setPage(1);
		setHasMoreNotifications(true);
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

	const handleSetChangesToNotificationStatus = async ({ id, status, type, endorsementType }: { id: number; status: number; type: number; endorsementType: number | null }) => {
		console.log(`Notification ID: ${id}, Status: ${status}, Type: ${type}, Endorsement Type: ${endorsementType}`);
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}change_endorsement_collaboration_request`,
				{
					id: id,
					status: status,
					type: type,
					endorsement_type: endorsementType || null,
					receiver_google_id: session?.googleId,
				},
				{
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				},
			)
			if(response.status === 200) {
				// Reset to page 1 and fetch fresh notifications after status change
				setPage(1);
				setHasMoreNotifications(true);
				getNotification();
			}
		}
		catch (error) {
			console.error("Failed to update notification status:", error);
		}
	};

	const loadMoreNotifications = () => {
		setPage(prevPage => prevPage + 1);
	};

	useEffect(() => {
		if (isAuthenticated && notificationDropdownOpen && page > 1) {
			getNotification();
		}
	}, [page]);

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
			<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
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

								{notification.filter((notification) => notification.status === 1).length > 0 && (
									<span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center mr-4">
										{notification.filter((notification) => notification.status === 1).length}
									</span>
								)}

								{notificationDropdownOpen && (
									<div className="absolute right-0 mt-2 w-130 bg-white rounded-md shadow-lg py-1 z-10 max-h-[400px] overflow-y-auto">
										{notification.length > 0 ? (
											notification.map((notification) => (
												<div
													key={`${notification.id} - ${notification.status} - ${notification.type}}`}
													className={`px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${notification.status === 1 ? "bg-gray-100" : ""}`}
												>
													{notification.type === 1 ? (
														notification.status === 1 ? (
															<div>
																{notification.owner_name} has invited you to be a collaborator to their project: Project {notification.title}
																<div className="flex space-x-2 mt-2">
																	<button
																		onClick={() => handleSetChangesToNotificationStatus({
																			id: notification.id,
																			status: 2,
																			type: notification.type,
																			endorsementType: notification.endorsement_type || null
																		})}
																		className="px-4 py-1 bg-[#5086ed] text-white rounded-md cursor-pointer"
																	>
																		Accept
																	</button>
																	<button
																		onClick={() => handleSetChangesToNotificationStatus({
																			id: notification.id,
																			status: 3,
																			type: notification.type,
																			endorsementType: notification.endorsement_type || null
																		})}
																		className="px-4 py-1 bg-white text-black rounded-md border border-2 border-[#5086ed] cursor-pointer hover:bg-gray-200"
																	>
																		Decline
																	</button>
																</div>
															</div>
														) : session.googleId === notification.owner_google_id ? (
															<div>{notification.receiver_name} has {mapEndorsementStatus(notification.status).toLowerCase()} your project collaboration invitation for: Project {notification.title}</div>
														) : (
															<div>You have {mapEndorsementStatus(notification.status).toLowerCase()} {notification.owner_name}'s project {notification.title} collaboration.</div>
														)
													) : (
														notification.status === 1 ? (
															<div>
																{notification.owner_name} has requested you to endorse their {mapEndorsementType(notification.endorsement_type).toLowerCase()}: {mapEndorsementType(notification.endorsement_type)} {notification.title}
																<div className="flex space-x-2 mt-2">
																	<button
																		onClick={() => handleSetChangesToNotificationStatus({
																			id: notification.id,
																			status: 2,
																			type: notification.type,
																			endorsementType: notification.endorsement_type || null
																		})}
																		className="px-4 py-1 bg-[#5086ed] text-white rounded-md cursor-pointer"
																	>
																		Accept
																	</button>
																	<button
																		onClick={() => handleSetChangesToNotificationStatus({
																			id: notification.id,
																			status: 3,
																			type: notification.type,
																			endorsementType: notification.endorsement_type || null
																		})}
																		className="px-4 py-1 bg-white text-black rounded-md border border-2 border-[#5086ed] cursor-pointer hover:bg-gray-200"
																	>
																		Decline
																	</button>
																</div>
															</div>
														) : session.googleId === notification.owner_google_id ? (
															<div>{notification.receiver_name} has {mapEndorsementStatus(notification.status).toLowerCase()} your endorsement request for your {mapEndorsementType(notification.endorsement_type).toLowerCase()}: {notification.title}</div>
														) : (
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
										{hasMoreNotifications && notification.length > 0 && (
											<div className="w-full px-4 h-[30px] mt-2">
												<button
													className="w-full h-full bg-[#5086ed] text-white rounded-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-103 transition-all duration-300 ease-in-out cursor-pointer group"
													onClick={loadMoreNotifications}
												>
													Load More
												</button>
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