// components/LoadingScreen.tsx
import React from 'react';

type LoadingScreenProps = {
    message?: string;
    fullScreen?: boolean;
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({
    message = "Loading...",
    fullScreen = true
}) => {
    return (
        <div className={`flex flex-col items-center justify-center bg-white ${fullScreen ? 'fixed inset-0 z-50' : 'w-full h-full min-h-[200px]'
            }`}>
            <div className="flex flex-col items-center">
                {/* Loading spinner */}
                <div className="relative w-20 h-20">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#5086ed] border-r-[#89adf3] border-b-[#bcd0f9] border-l-[#e0e9fc] rounded-full animate-spin"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-t-[#5086ed] border-r-[#89adf3] border-b-[#bcd0f9] border-l-[#e0e9fc] rounded-full animate-spin animation-delay-200"></div>
                </div>

                {/* Loading text */}
                <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>

                {/* Loading progress dots */}
                <div className="flex space-x-2 mt-2">
                    <div className="w-2 h-2 bg-[#5086ed] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#5086ed] rounded-full animate-bounce animation-delay-200"></div>
                    <div className="w-2 h-2 bg-[#5086ed] rounded-full animate-bounce animation-delay-400"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;