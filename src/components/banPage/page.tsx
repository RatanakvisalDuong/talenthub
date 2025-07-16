'use client'

import Link from "next/link";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from "next-auth/react";

export default function BanPage() {
	const { data: session } = useSession();
    return (
        <div className="w-full h-full">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-red-600 p-4 flex items-center justify-center">
                        <ExclamationTriangleIcon className="h-12 w-12 text-white" />
                    </div>
                    <div className="p-6 text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Suspended</h1>
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                            <p className="text-gray-700">
                                Your account has been suspended for violating our community guidelines
                                by posting harmful content on the platform.
                            </p>
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                            <p>If you believe this is a mistake, please contact our support team.</p>
                        </div>
                         <div className="mt-4">
                                                    <Link
                                                        href="/"
                                                        className="text-sm text-blue-600 hover:text-blue-800"
                                                        onClick={e => {
                                                            if (session != null) {
                                                                e.preventDefault();
                                                                signOut({ callbackUrl: '/' });
                                                            }
                                                        }}
                                                    >
                                                        Return to Homepage
                                                    </Link>
                                                </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
