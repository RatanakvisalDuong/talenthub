import React from 'react';
import Image from 'next/image';
import { Achievement } from '@/app/type/achievement';


export default function AchievementCard({ achievement, onClick }: { achievement: Achievement; onClick: () => void }) {
  return (
    <div
      key={achievement.id}
      className="bg-white w-full h-50 shadow-md mt-4 px-4 py-2 rounded-md cursor-pointer hover:transform hover:scale-105"
      onClick={onClick}
    >
      <div className="flex w-full justify-between">
        <div className="w-[70%] overflow-hidden">
          <p className="text-sm text-black">{achievement.title}</p>
        </div>
        <div className="w-[30%] flex justify-end">
          <Image src="/verified.png" alt="Verified" width={20} height={20} className="mr-2" />
        </div>
      </div>
      <p className="text-[12px] text-[#808080] mt-1">Issued Date: {achievement.issue_month} {achievement.issue_year}</p>
      <Image
        src={achievement.image}
        alt="Certificate"
        width={200}
        height={200}
        className="object-cover mt-2"
      />
    </div>
  );
};
