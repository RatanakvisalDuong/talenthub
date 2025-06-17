import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Experience } from '@/app/type/experience';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import ApiDialog from '../../components/apiDialog/page';

type Props = {
	experience: Experience;
	index: number;
	dropdownOpen: { [key: string]: boolean };
	toggleDropdown: (id: number) => void;
	owner: boolean;
	openEditExperienceDialog: (experience: Experience) => void;
	onEndorserRemoved?: () => void; 
};

const ExperienceCard: React.FC<Props> = ({ 
	experience, 
	index, 
	dropdownOpen, 
	toggleDropdown, 
	owner, 
	openEditExperienceDialog,
	onEndorserRemoved 
}) => {
	const { data: session } = useSession();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
	const [selectedEndorser, setSelectedEndorser] = useState<any>(null);

	// Handle click outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && dropdownOpen[experience.id]) {
				toggleDropdown(experience.id);
			}
		};

		// Add event listener when dropdown is open
		if (dropdownOpen[experience.id]) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// Cleanup event listener
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownOpen, experience.id, toggleDropdown]);

	const handleRemoveEndorser = (endorser: any) => {
		setSelectedEndorser(endorser);
		setRemoveDialogOpen(true);
	};

	const handleRemoveSuccess = () => {
		// Close the dropdown and refresh data
		toggleDropdown(experience.id);
		if (onEndorserRemoved) {
			onEndorserRemoved();
		}
	};

	return (
		<>
			<div
				className={`mt-4 text-black ml-4 flex items-start  ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'
					} p-4 rounded-xl shadow-md hover:shadow-lg`}
			>
				<div className="bg-[#5086ed] w-5 h-5 rounded-full mr-6 mt-1 animate-pulse"></div>

				<div className='w-full'>
					<div className="flex justify-between items-start font-semibold text-lg text-gray-800">
						<div className="flex w-[70%] items-center gap-4 flex-wrap">
							<p className="text-md">
								<span>{experience.work_title}</span>
								<span className="mx-[2px]">-</span>
								<span>{experience.company_name}</span>
							</p>
							{experience.endorsers && experience.endorsers.filter(endorser => endorser.status_id === 2).length > 0 && (
								<div className="relative" ref={dropdownRef}>
									<div
										className="py-2 px-4 bg-[#C0DDEC] rounded-full flex items-center cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											toggleDropdown(experience.id);
										}}
									>
										<Image src="/verified.png" alt="Verified" width={20} height={20} className="mr-2" />
										<span className="text-sm text-black">Endorsed by</span>
									</div>

									{dropdownOpen[experience.id] && (
										<div className="absolute left-0 mt-2 p-2 w-64 bg-white border rounded-xl shadow-lg z-10">
											<ul>
												{experience.endorsers
													.filter((endorser) => endorser.status_id === 2) // Only show endorsers with status_id === 2
													.map((endorser) => (
														<li
															key={endorser.email}
															className="py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded cursor-pointer"
															onClick={(e) => {
																e.stopPropagation();
																window.location.href = `/portfolio/${endorser.id}`;
															}}
														>
															<div className='flex items-center justify-between'>
																<div className='flex items-center'>
																	<Image src={endorser.photo || "https://hips.hearstapps.com/hmg-prod/images/british-actor-henry-cavill-poses-on-the-red-carpet-as-he-news-photo-1581433962.jpg"} alt="Endorser" width={20} height={20} className="mr-2 rounded-full w-8 h-8" />
																	<p>{endorser.name}</p>
																</div>
																{session?.googleId === endorser.id.toString() && (
																	<div 
																		className="flex items-center hover:bg-red-100 p-1 rounded" 
																		onClick={(e) => {
																			e.stopPropagation();
																			handleRemoveEndorser(endorser);
																		}}
																	>
																		<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
																		</svg>
																	</div>
																)}
															</div>
														</li>
													))}
											</ul>
										</div>
									)}
								</div>
							)}
						</div>
						{owner && (
							<button
								className="text-sm flex text-white hover:underline hover:brightness-110 cursor-pointer py-2 px-4 bg-[#ffc107] rounded-xl items-center justify-center transition-all duration-200"
								onClick={() => openEditExperienceDialog(experience)}
							>
								<PencilSquareIcon className="w-5 h-5 mr-2" />
								Update
							</button>
						)}
					</div>
					<p className="text-sm text-gray-600 mt-1">
						{experience.employment_type}
					</p>
					<p className="text-sm text-gray-600 mt-1">
						{experience.start_month} {experience.start_year} - {experience.end_year ? `${experience.end_month} ${experience.end_year}` : 'Present'}
					</p>
					<p className="text-sm text-gray-600 mt-1">{experience.description}</p>
					<div className="h-[2px] bg-gray-300 w-full mt-4"></div>
				</div>
			</div>

{removeDialogOpen && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
    
	  <ApiDialog
		  isOpen={removeDialogOpen}
		  onClose={() => setRemoveDialogOpen(false)}
		  apiUrl="https://talenthub.newlinkmarketing.com/api/remove_endorsement"
		  requestData={{
			  "type": 2,
			  "id": experience.id
		  }}
		  title="Remove Endorsement"
		  description={`Are you sure you want to remove your endorsement?`}
		  confirmButtonText="Remove"
		  cancelButtonText="Cancel"
		  onSuccess={handleRemoveSuccess}
	  />
  </div>
)}
		</>
	);
};

export default ExperienceCard;