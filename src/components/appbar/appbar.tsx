"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { BellIcon, UserGroupIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LoginDialog from "@/dialogs/login_dialog/login_dialog";
import { Ubuntu } from "next/font/google";
import { Notification } from "@/app/type/notification";
import { ArrowDown01Icon, BadgeCheckIcon, CheckCircleIcon, ChevronUpIcon } from "lucide-react";
import { redirect } from "next/navigation";
import BecomeEndorser from "../becomeEndorser/becomeEndorser";
import InboxDialog from "../inbox/inboxDialog";
import Image from "next/image";

const ubuntuFont = Ubuntu({
	subsets: ["latin"],
	weight: ["400", "700"],
});

const Appbar = React.memo(() => {
	const { data: session, status } = useSession();
	const isAuthenticated = status === "authenticated" && session;
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
	const [isInboxOpen, setIsInboxOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isAddEndorserDialogOpen, setIsAddEndorserDialogOpen] = useState(false);
	const [inboxMessage, setInboxMessage] = useState<InboxMessage[]>([]);
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
		setIsAddEndorserDialogOpen(false);
		setIsDialogOpen(true);
	};

	const handleAddEndorser = () => {
		setIsDialogOpen(false);
		setIsAddEndorserDialogOpen(true);
	}

	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	const handleNotificationClick = () => {
		setPage(1);
		setHasMoreNotifications(true);
		getNotification();
		setNotificationDropdownOpen(!notificationDropdownOpen);
	};

	const handleEnvelopeClick = () => {
		setIsInboxOpen(true);
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
			if (response.status === 200) {
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
		redirect("/home");
	};

	return (
		<nav className={`${ubuntuFont.className} bg-white shadow-md w-full fixed top-0 left-0 right-0 z-10`}>
			<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center justify-center">
						<Link className="flex" href="/home">
							<Image
								src="/logo.png"
								alt="Paragon International University Logo"
								width={200}
								height={100}
								className="cursor-pointer ml-4"
							/>
						</Link>
						<div className="ml-4">
							{isAuthenticated ? (
								<div className="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer">
									<p className="text-white">{session.roleId === 1 ? "Student" : "Endorser"}</p>
								</div>
							) : (
								<div></div>
							)}
						</div>
					</div>
					<div className="flex items-center space-x-6">
						{isAuthenticated && (
							<>
								{/* Envelope Icon */}
								<div className="relative">
									<EnvelopeIcon
										className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-500 transition-colors"
										onClick={handleEnvelopeClick}
									/>
								</div>

								{/* Notifications */}
								<div className="relative mr-4" ref={notificationRef}>
									<BellIcon
										className="w-6 h-6 text-gray-700 cursor-pointer hover:text-blue-500 transition-colors"
										onClick={handleNotificationClick}
									/>

									{notification.filter((notification) => notification.status === 1).length > 0 && (
										<span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center mr-4">
											{notification.filter((notification) => notification.status === 1).length}
										</span>
									)}

									{notificationDropdownOpen && (
										<div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-10 max-h-96 overflow-y-auto border border-gray-200">
											<div className="px-4 py-2 border-b border-gray-100">
												<h3 className="font-semibold text-gray-700">Notifications</h3>
											</div>

											{notification.length > 0 ? (
												notification.map((notification) => (
													<div
														key={`${notification.id} - ${notification.status} - ${notification.type}}`}
														className={`px-4 py-3 text-sm border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${notification.status === 1 ? "bg-blue-50" : ""}`}
														onClick={() => {
															if (notification.type == 2) {
																if (notification.status === 1) {
																	if (notification.endorsement_type == 2) {
																		redirect(`/project/${notification.project_id}`);
																	} else {
																		redirect(`/portfolio/${notification.owner_google_id}`);
																	}
																}
																else {
																	if (notification.endorsement_type == 2) {
																		redirect(`/project/${notification.project_id}`);
																	} else {
																		redirect(`/portfolio/${notification.owner_google_id}`);
																	}
																}
															}
															else {
																redirect(`/project/${notification.project_id}`);
															}
														}}
													>
														{notification.type === 1 ? (
															notification.status === 1 ? (
																<div>
																	<div className="flex items-start mb-2">
																		<div className="bg-blue-100 p-2 rounded-full mr-3">
																			<UserGroupIcon className="h-4 w-4 text-blue-600" />
																		</div>
																		<p className="text-gray-700">
																			<span className="font-medium">{notification.owner_name}</span> has invited you to collaborate on: <span className="font-medium">Project {notification.title}</span>
																		</p>
																	</div>
																	<div className="flex space-x-2 mt-2">
																		<button
																			onClick={(e) => {
																				e.stopPropagation();
																				handleSetChangesToNotificationStatus({
																					id: notification.id,
																					status: 2,
																					type: notification.type,
																					endorsementType: notification.endorsement_type || null
																				});
																			}}
																			className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md cursor-pointer text-xs font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
																		>
																			Approve
																		</button>
																		<button
																			onClick={(e) => {
																				e.stopPropagation(); // Prevent event bubbling
																				handleSetChangesToNotificationStatus({
																					id: notification.id,
																					status: 3,
																					type: notification.type,
																					endorsementType: notification.endorsement_type || null
																				});
																			}}
																			className="px-4 py-1.5 bg-white text-gray-700 rounded-md border border-gray-300 cursor-pointer text-xs font-medium hover:bg-gray-100 transition-all"
																		>
																			Decline
																		</button>
																	</div>
																</div>
															) : session.googleId === notification.owner_google_id ? (
																<div className="flex items-start">
																	<div className="bg-gray-100 p-2 rounded-full mr-3">
																		<CheckCircleIcon className="h-4 w-4 text-gray-600" />
																	</div>
																	<p className="text-gray-700">
																		<span className="font-medium">{notification.receiver_name}</span> has {mapEndorsementStatus(notification.status).toLowerCase()} your project collaboration invitation for: <span className="font-medium">Project {notification.title}</span>
																	</p>
																</div>
															) : (
																<div className="flex items-start">
																	<div className="bg-gray-100 p-2 rounded-full mr-3">
																		<CheckCircleIcon className="h-4 w-4 text-gray-600" />
																	</div>
																	<p className="text-gray-700">
																		You have {mapEndorsementStatus(notification.status).toLowerCase()} <span className="font-medium">{notification.owner_name}</span>'s project collaboration for: <span className="font-medium">Project {notification.title}</span>
																	</p>
																</div>
															)
														) : (
															notification.status === 1 ? (
																<div>
																	<div className="flex items-start mb-2">
																		<div className="bg-indigo-100 p-2 rounded-full mr-3">
																			<BadgeCheckIcon className="h-4 w-4 text-indigo-600" />
																		</div>
																		<p className="text-gray-700">
																			<span className="font-medium">{notification.owner_name}</span> has requested you to endorse their {mapEndorsementType(notification.endorsement_type).toLowerCase()}: <span className="font-medium">{notification.title}</span>
																		</p>
																	</div>
																	<div className="flex space-x-2 mt-2">
																		<button
																			onClick={(e) => {
																				e.stopPropagation(); // Prevent event bubbling
																				handleSetChangesToNotificationStatus({
																					id: notification.id,
																					status: 2,
																					type: notification.type,
																					endorsementType: notification.endorsement_type || null
																				});
																			}}
																			className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md cursor-pointer text-xs font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
																		>
																			Approve
																		</button>
																		<button
																			onClick={(e) => {
																				e.stopPropagation(); // Prevent event bubbling
																				handleSetChangesToNotificationStatus({
																					id: notification.id,
																					status: 3,
																					type: notification.type,
																					endorsementType: notification.endorsement_type || null
																				});
																			}}
																			className="px-4 py-1.5 bg-white text-gray-700 rounded-md border border-gray-300 cursor-pointer text-xs font-medium hover:bg-gray-100 transition-all"
																		>
																			Decline
																		</button>
																	</div>
																</div>
															) : session.googleId === notification.owner_google_id ? (
																<div className="flex items-start">
																	<div className="bg-gray-100 p-2 rounded-full mr-3">
																		<BadgeCheckIcon className="h-4 w-4 text-gray-600" />
																	</div>
																	<p className="text-gray-700">
																		<span className="font-medium">{notification.receiver_name}</span> has {mapEndorsementStatus(notification.status).toLowerCase()} your endorsement request for: <span className="font-medium">{notification.title}</span>
																	</p>
																</div>
															) : (
																<div className="flex items-start">
																	<div className="bg-gray-100 p-2 rounded-full mr-3">
																		<BadgeCheckIcon className="h-4 w-4 text-gray-600" />
																	</div>
																	<p className="text-gray-700">
																		You have {mapEndorsementStatus(notification.status).toLowerCase()} endorsement for <span className="font-medium">{mapEndorsementType(notification.endorsement_type)} {notification.title}</span>
																	</p>
																</div>
															)
														)}
													</div>
												))
											) : (
												<div className="px-4 py-6 text-sm text-gray-500 flex flex-col items-center justify-center">
													<BellIcon className="h-8 w-8 text-gray-300 mb-2" />
													No notifications
												</div>
											)}

											{hasMoreNotifications && notification.length > 0 && (
												<div className="px-4 py-2">
													<button
														className="w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all text-xs font-medium flex items-center justify-center cursor-pointer"
														onClick={loadMoreNotifications}
													>
														<ArrowDown01Icon className="h-3 w-3 mr-1" />
														Load More
													</button>
												</div>
											)}
										</div>
									)}
								</div>
							</>
						)}

						{isAuthenticated ? (
							<div className="relative" ref={dropdownRef}>
								<div
									className="flex items-center space-x-2 cursor-pointer bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
									onClick={() => setDropdownOpen(!dropdownOpen)}
								>
									<UserCircleIcon className="h-5 w-5 text-gray-700" />
									<span className="text-gray-700 font-medium text-sm">{session.user?.name || "User"}</span>
									<ChevronUpIcon className="h-4 w-4 text-gray-500" />
								</div>

								{dropdownOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-200 overflow-hidden">
										{/* <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
											<p className="text-xs text-gray-500 font-medium">ACCOUNT</p>
										</div> */}
										<div className="flex flex-col px-4 py-2">
											<p className="text-sm text-gray-800 font-medium truncate">{session.user?.name || "User"}</p>
											<p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
										</div>
										<Link
											href="/yourportfolio"
											className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
											onClick={() => setDropdownOpen(false)}
										>
											<UserCircleIcon className="h-5 w-5 mr-2 text-blue-500" />
											Your Portfolio
										</Link>
										<button
											onClick={() => {
												setDropdownOpen(false);
												goBackHome();
											}}
											className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
										>
											<ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-blue-500" />
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							<div className="flex items-center space-x-2">
								<button
									className="px-5 py-2 text-white rounded-xl cursor-pointer hover:bg-green-600 transition-all shadow-sm font-medium bg-green-500 border border-green-400"
									onClick={handleAddEndorser}
								>
									Become Endorser
								</button>
								<button
									className="px-5 py-2 text-white rounded-xl cursor-pointer hover:bg-blue-600 transition-all shadow-sm font-medium bg-blue-500 border border-blue-400"
									onClick={handleLogin}
								>
									Login
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
			{
				isAddEndorserDialogOpen && (
					<BecomeEndorser onClose={() => setIsAddEndorserDialogOpen(false)} />
				)
			}

			{
				isInboxOpen && (
					<InboxDialog isOpen={isInboxOpen} onClose={() => setIsInboxOpen(false)} googleId={session?.googleId || ''} inbox={inboxMessage} />
				)
			}
			<LoginDialog isOpen={isDialogOpen} onClose={closeDialog} />
		</nav>
	);
});

export default Appbar