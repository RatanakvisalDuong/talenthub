"use client"

import Card from "@/components/card/card";
import { useState } from "react";
import Appbar from "@/components/appbar/appbar";
import Sidebar from "@/components/sidebar/sidebar";
import SearchBar from "@/components/search/search_bar";

export interface PortfolioProfile {
    id: number;
    user_id: number;
    major: number | null;
    phone_number: string | null;
    about: string;
    working_status: number;
    status: number;
    created_at: string;
    updated_at: string;
    name: string;
    role: number;
  }

export default function DisplayPortfolio(
    {portfolios}: {portfolios: PortfolioProfile[]}
){

    const [selectedMajors, setSelectedMajors] = useState<number[]>([]);
	const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
	const [selectedWorkingStatuses, setSelectedWorkingStatuses] = useState<number[]>([]);
	const [searchItem, setSearchItem] = useState<string>('');
	// const [portfolios, setPortfolios] = useState<[]>([]);

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

	const filteredPortfolio = portfolios.filter((port) => {
		const majorMatch = selectedMajors.length > 0 ? selectedMajors.includes(port.major ?? 4) : true;
		const roleMatch = selectedRoles.length > 0 ? selectedRoles.includes(port.role) : true;
		const workingStatusMatch = selectedWorkingStatuses.length > 0 ? selectedWorkingStatuses.includes(port.workingStatus ?? 3) : true;
		const nameMatch = port.name.toLowerCase().includes(searchItem.toLowerCase());
		return majorMatch && roleMatch && workingStatusMatch && nameMatch;
	});

    return (
        <div className="bg-[#E8E8E8] w-screen h-screen overflow-hidden">
			<Appbar />
			<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between">
				<div className="w-[23%]">
					<Sidebar
						onMajorSelect={handleMajorSelect}
						onRoleSelect={handleRoleSelect}
						onWorkingStatusSelect={handleWorkingStatusSelect}
						studentMajor={1}
					/>
				</div>
				<div className="w-[78%] px-4">
					<SearchBar onSearch={handleSearch} />
					<div className="h-[87vh] grid grid-cols-4 gap-3 overflow-y-auto mt-4 px-2 pt-2 pb-16">
						{filteredPortfolio.length > 0 ? (
							filteredPortfolio.map((portfolio) => (
								<Card key={portfolio.user_id} portfolio={portfolio} />
							))
						) : (
							<p className="text-black text-center">No Portfolio found</p>
						)}
						<div className="h-8"></div>
					</div>
				</div>
			</div>
		</div>
    );
}