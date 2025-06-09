import React from 'react';
import Image from 'next/image';
import { Achievement } from '@/app/type/achievement';

export default function AchievementCard({ achievement, onClick }: { achievement: Achievement; onClick: () => void }) {
	return (
		<div
			className="bg-white w-full shadow-md mt-2 sm:mt-3 md:mt-4 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl cursor-pointer hover:transform hover:scale-105 transition-transform duration-200"
			onClick={onClick}
		>
			<div className="flex w-full justify-between items-start">
				<div className="w-[70%] overflow-hidden">
					<p className="text-xs sm:text-sm md:text-base text-gray-600 font-bold line-clamp-2">{achievement.title}</p>
				</div>
				{achievement.endorsers && achievement.endorsers.filter(endorser => endorser.status_id === 2).length > 0 && (
					<div className="w-[30%] h-auto flex justify-end">
						<Image 
							src="/verified.png" 
							alt="Verified" 
							width={20} 
							height={20} 
							className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-[30px] lg:h-[30px] mr-1 sm:mr-2" 
						/>
					</div>
				)}
			</div>
			
			<p className="text-[10px] sm:text-[12px] text-[#808080] mt-0.5 sm:mt-1">
				Issued Date: {achievement.issue_month} {achievement.issue_year}
			</p>
			
			<div className='w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px] h-[80px] sm:h-[100px] md:h-[120px] lg:h-[130px] mt-1 sm:mt-2'>
				<Image
					src={achievement.image}
					alt="Certificate"
					width={220}
					height={130}
					className="w-full h-full object-cover rounded-md"
				/>
			</div>
		</div>
	);
};