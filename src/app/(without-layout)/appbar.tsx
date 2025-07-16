'use client';

import { signIn, useSession } from "next-auth/react";
import { Ubuntu } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ubuntuFont = Ubuntu({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: 'swap',
});

export default function AppBar(): React.ReactElement {
    const { data: session } = useSession();

    const handleSignIn = async (): Promise<void> => {
        try {
            await signIn('google', { redirect: false, callbackUrl: '/home' });
        } catch (error) {
            console.error('Sign-in error:', error);
        }
    };

    return (
        <nav
            className={`${ubuntuFont.className} bg-white shadow-md w-full fixed top-0 left-0 right-0 z-50`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link
                        className="flex items-center"
                        href="/home"
                        aria-label="TalentHub PIU - Go to homepage"
                    >
                        <Image
                            src="/logo.png"
                            alt="Paragon International University Logo"
                            width={200}
                            height={100}
                            className="cursor-pointer ml-4"
                            priority
                        />
                    </Link>

                    <div className="flex items-center space-x-6">
                        {!session?.user?.email && (
                            <div className="flex items-center space-x-2">
                                <button
                                    className="px-5 py-2 text-white rounded-xl cursor-pointer hover:bg-blue-600 focus:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition-all shadow-sm font-medium bg-blue-500 border border-blue-400"
                                    onClick={handleSignIn}
                                    type="button"
                                    aria-label="Sign in with Google"
                                >
                                    Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
