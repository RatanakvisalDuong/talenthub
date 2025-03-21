import { Ubuntu } from "next/font/google";
import { BellIcon } from '@heroicons/react/20/solid';

const ubuntuFont = Ubuntu({
    subsets: ["latin"],
    weight: ["400", "700"],
});

interface AppBarProps {
    onLoginClick: () => void;
}

export default function Appbar({ onLoginClick }: AppBarProps) {
    return (
        <nav className={`${ubuntuFont.className} bg-white shadow-md w-full fixed top-0 left-0 right-0 z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-2xl font-bold text-black">
                        Talent<span className="text-[#5086ed]">Hub</span>
                    </h1>
                    <div className="flex items-center space-x-6">
                        <div className="relative mr-16">
                            <BellIcon className="w-8 h-8 text-black cursor-pointer mr-4" />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center mr-4">
                                3
                            </span>
                        </div>
                        <button className="px-4 py-2 bg-[#5086ed] text-white rounded-md cursor-pointer" onClick={onLoginClick}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </nav>

    );
}
