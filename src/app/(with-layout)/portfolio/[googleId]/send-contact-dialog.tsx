import TextInput from "@/components/textinput/textInput";
import { useState } from "react";

export default function SendContactDialog({
    googleId,
    open,
    onClose,
    onSend,
    apiUrl
}: {
    googleId: string;
    open: boolean;
    onClose: () => void;
    onSend: (message: string) => void;
    apiUrl: string;
}) {
    const [message, setMessage] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSend = async () => {
        // Validate required fields
        if (!email.trim()) {
            setError('Email is required');
            return;
        }
        if (!contact.trim()) {
            setError('Contact name is required');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            onSend(message);
            
            setEmail('');
            setContact('');
            setMessage('');
        } catch (err) {
            setError('Failed to send contact information. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
            {loading ? (
                <div className="bg-white rounded-md p-6 w-[700px] max-w-full shadow-lg justify-center flex items-center">
                    <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="bg-white rounded-md p-6 w-[700px] max-w-full shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-black">Send Your Contact</h2>
                        <button onClick={onClose} className="text-black cursor-pointer hover:text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="h-[2px] w-24 bg-gray-200 mb-4" />

                    <TextInput
                        id="email"
                        label="Email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextInput
                        id="contact"
                        label="Contact"
                        required
                        placeholder="Enter your name"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />

                    {error && (
                        <div className="mt-2 text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            className="text-white bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleSend}
                            disabled={loading}
                        >
                            Send Contact
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}