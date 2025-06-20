import TextInput from "@/components/textinput/textInput";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

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
    
    // Use ref to store timer ID so we can clear it
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    // Track if dialog was manually closed to prevent timer callback
    const wasManuallyClosedRef = useRef<boolean>(false);

    // Clean up timer when component unmounts
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    // Clear timer and reset states when dialog closes
    useEffect(() => {
        if (!open) {
            // Clear timer if dialog is closed
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
            
            // Reset all states when dialog closes
            setEmail('');
            setContact('');
            setMessage('');
            setShowSuccess(false);
            setError(null);
            setLoading(false);
            wasManuallyClosedRef.current = false;
        }
    }, [open]);

    const clearFormAndClose = () => {
        // Mark as manually closed to prevent timer callback
        wasManuallyClosedRef.current = true;
        
        // Clear the timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        
        // Reset states
        setEmail('');
        setContact('');
        setMessage('');
        setShowSuccess(false);
        setError(null);
        setLoading(false);
        
        // Call parent callbacks
        onSend(message);
        onClose();
    };

    const handleBackdropClick = () => {
        clearFormAndClose();
    };

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
                // Show success message and set timer
                setShowSuccess(true);
                wasManuallyClosedRef.current = false; // Reset manual close flag
                
                timerRef.current = setTimeout(() => {
                    // Only auto-close if it wasn't manually closed
                    if (!wasManuallyClosedRef.current) {
                        clearFormAndClose();
                    }
                }, 2500);
            } else {
                setError('Failed to send contact information. Please try again.');
            }
        } catch (err: any) {
            console.error('Error sending contact:', err);
            
            let errorMessage = 'Failed to send contact information. Please try again.';
            if (err.response) {
                if (err.response.status === 400) {
                    errorMessage = 'Invalid contact information. Please check your details.';
                } else if (err.response.status === 401) {
                    errorMessage = 'Unauthorized. Please login again.';
                } else if (err.response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                } else if (err.response.data?.message) {
                    errorMessage = err.response.data.message;
                }
            } else if (err.request) {
                errorMessage = 'No response from server. Please check your internet connection.';
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Don't render if dialog is not open
    if (!open) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleBackdropClick}
        >
            {loading ? (
                <div 
                    className="bg-white rounded-md p-6 w-[500px] max-w-full shadow-lg justify-center flex items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                        <span className="text-gray-600">Sending contact...</span>
                    </div>
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
                        <p className="text-gray-600 mb-4">Your contact information has been sent successfully.</p>
                    </div>
                </div>
            ) : (
                <div 
                    className="bg-white rounded-md p-6 w-[500px] max-w-full shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-black">Send Your Contact</h2>
                        <button 
                            onClick={clearFormAndClose} 
                            className="text-black cursor-pointer hover:text-red-500 transition-colors"
                        >
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
                        <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">{error}</span>
                            <button
                                onClick={() => setError(null)}
                                className="ml-auto text-red-500 hover:text-red-700"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
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