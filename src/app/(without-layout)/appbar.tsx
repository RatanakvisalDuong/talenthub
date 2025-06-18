import { signIn, useSession } from "next-auth/react";
import { Ubuntu } from "next/font/google";
import Link from "next/link";

const ubuntuFont = Ubuntu({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function AppBar() {
    const { data: session } = useSession();

    const handleSignIn = async () => {
        await signIn('google', { redirect: false, callbackUrl: '/home' });
    };

    return (
        <nav className={`${ubuntuFont.className} bg-white shadow-md w-full fixed top-0 left-0 right-0 z-50`}>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link className="flex" href="/home">
                        <h1 className="text-3xl font-bold text-black cursor-pointer">
                            Talent
                        </h1>
                        <h1 className="text-blue-500 text-3xl font-bold cursor-pointer">Hub</h1>
                    </Link>

                    <div className="flex items-center space-x-6">
                        {!session?.user?.email && (
                            <div className="flex items-center space-x-2">
                                <button
                                    className="px-5 py-2 text-white rounded-xl cursor-pointer hover:bg-blue-600 transition-all shadow-sm font-medium bg-blue-500 border border-blue-400"
                                    onClick={handleSignIn}
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