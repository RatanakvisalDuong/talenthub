import { Achievement } from "@/app/type/achievement";
import { Portfolio } from "@/app/type/portfolio";
import AchievementCard from "@/components/achievementCard/achievementCard";

export default function AchievementsSection({
    portfolio,
    owner,
    handleOpenAchievementDialog,
  addAchievementDialog
}: {
    portfolio: Portfolio;
    owner: boolean;
    handleOpenAchievementDialog: (achievement: Achievement) => void;
    addAchievementDialog: () => void;
}) {
    return (
        <div className={`h-[65%] bg-white rounded-xl border border-gray-200 shadow-sm p-4 overflow-y-auto`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                <i className="fas fa-trophy text-[#5086ed] mr-2"></i>
                <p className="text-black font-bold text-lg">Achievements & Certificate</p>
                </div>
                {owner && (
                    <button
                        className="flex items-center bg-[#5086ed] font-semibold py-2 px-4 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 group"
                        onClick={addAchievementDialog}
                    >
                        <i className="fas fa-plus group-hover:text-white transition-colors duration-300"></i>
                    </button>
                )}
            </div>
            <div className="w-70 bg-[#dfdfdf] h-[2px] mt-1"></div>
            {portfolio.achievements.length === 0 ? (
                <p className="text-[#808080] text-md mt-4 justify-center items-center flex">No achievement & certificate available</p>
            ) : (
                portfolio.achievements.map((achievement) => (
                    <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        onClick={() => handleOpenAchievementDialog(achievement)}
                    />
                ))
            )}
        </div>
    );
}