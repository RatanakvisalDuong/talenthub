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
        <div className={`h-[400px] sm:h-[450px] md:h-[500px] bg-white rounded-xl border border-gray-200 shadow-sm p-2 sm:p-3 md:p-4 overflow-y-auto`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <i className="fas fa-trophy text-blue-500 text-sm sm:text-base md:text-lg mr-1 sm:mr-2"></i>
                    <p className="text-black font-bold text-xs sm:text-sm md:text-base lg:text-lg">Achievements & Certificate</p>
                </div>
                {owner && (
                    <button
                        className="flex items-center bg-blue-500 font-semibold py-1 sm:py-1.5 md:py-2 px-1.5 sm:px-2 md:px-4 rounded-lg sm:rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:scale-105 transition-all duration-300 group"
                        onClick={addAchievementDialog}
                    >
                        <i className="fas fa-plus text-xs sm:text-sm md:text-base group-hover:text-white transition-colors duration-300 text-white"></i>
                    </button>
                )}
            </div>
            <div className="w-full max-w-72 bg-[#dfdfdf] h-[1px] sm:h-[2px] mt-1"></div>
            {portfolio.achievements.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl sm:rounded-2xl mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                        <i className="fa-solid fa-trophy text-slate-400 text-sm sm:text-lg md:text-xl" />
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm text-center px-2">No achievement or certificate available</p>
                </div>
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