import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    apiUrl: string;
    requestData: Record<string, any>;
    title?: string;
    description?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
};

const ApiDialog: React.FC<Props> = ({
    isOpen,
    onClose,
    apiUrl,
    requestData,
    title,
    description,
    confirmButtonText,
    cancelButtonText,
    onSuccess,
    onError
}) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConfirm = async () => {
        setIsLoading(true);
        setError(null);
        console.log("API URL:", apiUrl);
        console.log("Request Data:", requestData);

        try {
            const response = await axios.delete(apiUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`
                },
                data: requestData
            });

            if (onSuccess) {
                router.refresh();
                onSuccess(response.data);
            }

            onClose();
        } catch (err) {
            let errorMessage = 'An error occurred';

            if (axios.isAxiosError(err)) {
                errorMessage = err.response?.data?.message || err.message;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);

            if (onError) {
                onError(err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] text-center">
                <p className="text-lg font-semibold mb-4 text-red-600">{title}</p>
                <p className="text-gray-700 mb-6">{description}</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-gray-200 text-gray-800 px-4 py-2  hover:bg-gray-300 hover:cursor-pointer rounded-xl"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelButtonText}
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2  hover:bg-red-700 hover:cursor-pointer rounded-xl"
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : confirmButtonText || "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiDialog;