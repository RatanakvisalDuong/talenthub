import TextInput from "@/components/textinput/textInput";
import axios from "axios";
import { useState } from "react";

export default function SendContactDialog({
    googleId,
    open,
    onClose,
    onSend,
}: {
    googleId: string;
    open: boolean;
    onClose: () => void;
    onSend: (message: string) => void;
}) {
    const [message, setMessage] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const handleSend = async () => {
        if (!email.trim()) {
            setError('Email is required');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            setError('Please enter a valid email address');
            return;
        }
        
        if (!contact.trim()) {
            setError('Contact name is required');
            return;
        }
        
        const phoneRegex = /^[0-9]{9,10}$/;
        if (!phoneRegex.test(contact.trim())) {
            setError('Please enter a valid phone number (9-10 digits)');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}send_contact`,
                {
                    google_id: googleId,
                    email: email,
                    phone_number: contact,
                },
            );

            if (response.status == 200) {
                // Show success message for 2.5 seconds
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    onSend(message);
                    
                    setEmail('');
                    setContact('');
                    setMessage('');
                    
                    onClose();
                }, 2500);
            } else {
                setError('Failed to send contact information. Please try again.');
            }
        } catch (err) {
            setError('Failed to send contact information. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
            onClick={() => {
                if (showSuccess) {
                    // Close immediately when clicking outside during success message
                    setShowSuccess(false);
                    onSend(message);
                    setEmail('');
                    setContact('');
                    setMessage('');
                    onClose();
                }
            }}
        >
            {loading ? (
                <div 
                    className="bg-white rounded-md p-6 w-[500px] max-w-full shadow-lg justify-center flex items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
            ) : showSuccess ? (
                <div 
                    className="bg-white rounded-md p-6 w-[500px] max-w-full shadow-lg flex flex-col justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="text-center">
                        <div className="mb-4">
                            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-green-600 mb-2">Contact Sent Successfully!</h3>
                        <p className="text-gray-600">Your contact information has been sent successfully.</p>
                    </div>
                </div>
            ) : (
                <div 
                    className="bg-white rounded-md p-6 w-[500px] max-w-full shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
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
                        placeholder="Enter your phone number"
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