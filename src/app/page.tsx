"use client";

import { useState } from "react";
import Appbar from "@/components/appbar/appbar";
import Card from "@/components/card/card";
import SearchBar from "@/components/search/search_bar";
import Sidebar from "@/components/sidebar/sidebar";
import { portfolio } from "@/dummydata/portfolio";
import LoginDialog from "@/dialogs/login_dialog/login_dialog";

export default function Home() {
	const [selectedMajors, setSelectedMajors] = useState<number[]>([]);
	const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
	const [selectedWorkingStatuses, setSelectedWorkingStatuses] = useState<number[]>([]);
	const [searchItem, setSearchItem] = useState<string>('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleMajorSelect = (selectedMajors: number[]) => {
		setSelectedMajors(selectedMajors);
	};

	const handleRoleSelect = (selectedRoles: number[]) => {
		setSelectedRoles(selectedRoles);
	};

	const handleWorkingStatusSelect = (selectedWorkingStatuses: number[]) => {
		setSelectedWorkingStatuses(selectedWorkingStatuses);
	};

	const handleSearch = (name: string) => {
		setSearchItem(name);
	};

	const filteredPortfolio = portfolio.filter((port) => {
		const majorMatch = selectedMajors.length > 0 ? selectedMajors.includes(port.major ?? 1) : true;
		const roleMatch = selectedRoles.length > 0 ? selectedRoles.includes(port.role ?? 1) : true;
		const workingStatusMatch = selectedWorkingStatuses.length > 0 ? selectedWorkingStatuses.includes(port.workingStatus ?? 1) : true;
		const nameMatch = port.name.toLowerCase().includes(searchItem.toLowerCase());
		return majorMatch && roleMatch && workingStatusMatch && nameMatch;
	});


	const closeDialog = () => {
		setIsDialogOpen(false);
	};
	const handleLogin = async () => {
		setIsDialogOpen(true);
	};

	return (
		<div className="bg-[#E8E8E8] w-screen h-screen overflow-hidden">
			<Appbar onLoginClick={handleLogin} />
			<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between">
				<div className="w-[23%]">
					<Sidebar
						onMajorSelect={handleMajorSelect}
						onRoleSelect={handleRoleSelect}
						onWorkingStatusSelect={handleWorkingStatusSelect}
					/>
				</div>
				<div className="w-[78%] px-4">
					<SearchBar onSearch={handleSearch} />
					<div className="h-[87vh] grid grid-cols-4 gap-3 overflow-y-auto mt-4 px-2 pt-2 pb-16">
						{filteredPortfolio.length > 0 ? (
							filteredPortfolio.map((portfolio) => (
								<Card key={portfolio.id} portfolio={portfolio} />
							))
						) : (
							<p>No matching portfolios found</p>
						)}
						<div className="h-8"></div>
					</div>
				</div>
				{isDialogOpen && (
					<div className="fixed inset-0 blur-sm backdrop-blur-md z-40"></div>
				)}
				<LoginDialog isOpen={isDialogOpen} onClose={closeDialog} />
			</div>
		</div>
	);
}
