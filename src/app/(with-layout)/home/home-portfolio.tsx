"use client"

import Card from "@/components/card/card";
import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import SearchBar from "@/components/search/search_bar";
import axios from "axios";

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
	photo: string;
	email?: string;
}

interface ApiResponse {
	data: PortfolioProfile[];
	meta: {
		current_page: number;
		per_page: number;
		total: number;
		has_more: boolean;
	};
}

export default function HomeComponent(
	{
		portfoliosData,
		photo,
		major,
		phoneNumber,
		apiUrl
	}: {
		portfoliosData: PortfolioProfile[] | ApiResponse;
		photo: string | null;
		major: number | null;
		phoneNumber: string | null;
		apiUrl: string;
	}
) {
	const initialData = Array.isArray(portfoliosData) ? portfoliosData : portfoliosData.data || [];
	const initialMeta = !Array.isArray(portfoliosData) && portfoliosData.meta ? portfoliosData.meta : null;

	const [portfolios, setPortfolios] = useState<PortfolioProfile[]>(initialData);
	const [searchResults, setSearchResults] = useState<PortfolioProfile[] | null>(null);
	const [selectedMajors, setSelectedMajors] = useState<number[]>([]);
	const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
	const [selectedWorkingStatuses, setSelectedWorkingStatuses] = useState<number[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(initialMeta?.current_page || 1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(initialMeta?.has_more ?? true);
	const [lastSearchedTerm, setLastSearchedTerm] = useState<string>('');

	const fetchPortfolios = async (page = 1, resetResults = false) => {
		try {
			setIsLoading(true);

			const response = await axios.get(`${apiUrl}view_all_portfolio?page=${page}`);

			let newPortfolios: PortfolioProfile[] = [];
			let newMeta = null;

			if (response.data && Array.isArray(response.data)) {
				newPortfolios = response.data;
			} else if (response.data && response.data.data) {
				newPortfolios = response.data.data;
				newMeta = response.data.meta;
			}

			if (resetResults) {
				setPortfolios(newPortfolios);
			} else {
				const existingIds = new Set(portfolios.map(p => p.id));
				const uniqueNewPortfolios = newPortfolios.filter(p => !existingIds.has(p.id));
				setPortfolios(prev => [...prev, ...uniqueNewPortfolios]);
			}

			setCurrentPage(page);

			const shouldHaveMore = newMeta
				? newMeta.has_more && newPortfolios.length >= 20
				: newPortfolios.length >= 20;

			setHasMore(shouldHaveMore);

		} catch (error) {
			console.error("Error fetching portfolios:", error);
			setHasMore(false);
		} finally {
			setIsLoading(false);
		}
	};

	const searchPortfolios = async (name: string) => {
		if (!name.trim()) {
			setSearchResults(null);
			return;
		}

		if (name === lastSearchedTerm) {
			return;
		}

		try {
			setIsLoading(true);
			setLastSearchedTerm(name);

			const response = await axios.get(`${apiUrl}search_portfolio`, {
				params: { name }
			});

			let results: PortfolioProfile[] = [];
			if (response.data && Array.isArray(response.data)) {
				results = response.data;
			} else if (response.data && response.data.data) {
				results = response.data.data;
			}

			setSearchResults(results);
		} catch (error) {
			console.error("Error searching portfolios:", error);
			setSearchResults([]);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (portfolios.length === 0) {
			fetchPortfolios(1, true);
		}
	}, []); 

	const handleMajorSelect = (majors: number[]) => {
		setSelectedMajors(majors);
	};

	const handleRoleSelect = (roles: number[]) => {
		setSelectedRoles(roles);
	};

	const handleWorkingStatusSelect = (statuses: number[]) => {
		setSelectedWorkingStatuses(statuses);
	};

	const handleSearch = (term: string) => {
		setSearchTerm(term);

		if (!term.trim()) {
			setSearchResults(null);
			setLastSearchedTerm('');
		} else if (term !== lastSearchedTerm) {
			searchPortfolios(term);
		}
	};

	const loadMore = () => {
		if (isLoading || !hasMore || searchResults !== null) return;
		fetchPortfolios(currentPage + 1, false);
	};

	const displayPortfolios = searchResults !== null ? searchResults : portfolios;

	return (
		<div className="bg-[#E8E8E8] w-full h-screen overflow-hidden fixed">
			<div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-8 py-20 flex justify-between h-full gap-2 sm:gap-4">
				<div className="w-[30%] sm:w-[25%] lg:w-[23%] xl:w-[20%] h-[87vh] overflow-y-auto flex-shrink-0">
					<Sidebar
						photo={photo || 'https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg?crop=0.66667xw:1xh;center,top&resize=1200:*'}
						major={major ? major : 4}
						phoneNumber={phoneNumber ? phoneNumber : ''}
						onMajorSelect={handleMajorSelect}
						onRoleSelect={handleRoleSelect}
						onWorkingStatusSelect={handleWorkingStatusSelect}
					/>
				</div>

				<div className="h-[87vh] w-[68%] sm:w-[73%] lg:w-[75%] xl:w-[78%] flex flex-col">
					<SearchBar onSearch={handleSearch} />
					<div className="flex-grow overflow-y-auto mt-4 pt-2 pb-16 pr-2 sm:pr-4">
						{isLoading && displayPortfolios.length === 0 ? (
							<p className="text-black text-center">Loading portfolios...</p>
						) : displayPortfolios.length > 0 ? (
							<>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 auto-rows-auto px-1 sm:px-2">
									{displayPortfolios
										.filter((portfolio) => {
											if (searchResults !== null) return true;

											const hasMajorFilters = selectedMajors.length > 0;
											const hasStatusFilters = selectedWorkingStatuses.length > 0;

											if ((hasMajorFilters || hasStatusFilters) && portfolio.role === 2) {
												return false;
											}

											const matchesRole =
												selectedRoles.length === 0 || selectedRoles.includes(portfolio.role);
											const matchesMajor =
												portfolio.role === 1
													? selectedMajors.length === 0 || selectedMajors.includes(portfolio.major ?? -1)
													: true;
											const matchesStatus =
												portfolio.role === 1
													? selectedWorkingStatuses.length === 0 || selectedWorkingStatuses.includes(portfolio.working_status)
													: true;

											return matchesRole && matchesMajor && matchesStatus;
										})
										.map((portfolio) => (
											<Card key={`${portfolio.user_id}-${portfolio.id}`} portfolio={portfolio} />
										))}
								</div>

								{hasMore && searchResults === null && (
									<div className="flex justify-center items-center mt-6">
										<button
											className="bg-blue-500 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-xl hover:text-white hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group disabled:opacity-50"
											onClick={loadMore}
											disabled={isLoading}
										>
											{isLoading ? 'Loading...' : 'Load More'}
										</button>
									</div>
								)}
							</>
						) : (
							<p className="text-black text-center text-sm sm:text-base">
								No portfolios found
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}