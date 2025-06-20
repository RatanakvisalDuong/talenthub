"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface InboxMessage {
    id: number;
    email: string;
    phone_number: string;
    created_at: string;
}

const InboxDialog = ({
    inbox,
    isOpen,
    onClose,
    googleId,
    onMessageDeleted,
}: {
    inbox: InboxMessage[];
    isOpen: boolean;
    onClose: () => void;
    googleId: string;
    onMessageDeleted?: (messageId: string) => void;
}) => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [localInbox, setLocalInbox] = useState<InboxMessage[]>(inbox);

    // Update local inbox when inbox prop changes
    useEffect(() => {
        setLocalInbox(inbox);
    }, [inbox]);

    useEffect(() => {
        const getMessage = async () => {
            if (!session?.accessToken) return;
            
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}view_incoming_contact`, 
                    {
                        headers: {
                            Authorization: `Bearer ${session.accessToken}`
                        }
                    }
                );
                setLocalInbox(response.data.data || []);
                
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        if (isOpen) {
            setLoading(true);
            getMessage().finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
        }
    }, [isOpen, session?.accessToken]);

    const formatTime = (createdAt: string) => {
        const messageTime = new Date(createdAt);

        const dateOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };

        const date = messageTime.toLocaleDateString('en-US', dateOptions);
        const time = messageTime.toLocaleTimeString('en-US', timeOptions);

        return `${date} ${time}`;
    };

    const handleDeleteClick = (messageId: string) => {
        setMessageToDelete(messageId);
        setShowDeleteConfirmation(true);
    };

    const handleDeleteMessage = async () => {
        if (!messageToDelete || !session?.accessToken) return;
        
        setDeleteLoading(true);
        setError(null); 
        
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}delete_contact/${messageToDelete}`,
                {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );
            
            if (response.status === 200) {
                setLocalInbox(prevInbox => 
                    prevInbox.filter(message => message.id.toString() !== messageToDelete)
                );
                
                if (onMessageDeleted) {
                    onMessageDeleted(messageToDelete);
                }
                
                setShowDeleteConfirmation(false);
                setMessageToDelete(null);
            } else {
                throw new Error('Failed to delete message');
            }
            
        } catch (err: any) {
            console.error('Error deleting message:', err);
            
            let errorMessage = 'Failed to delete message';
            if (err.response) {
                if (err.response.status === 401) {
                    errorMessage = 'Unauthorized. Please login again.';
                } else if (err.response.status === 403) {
                    errorMessage = 'You do not have permission to delete this message.';
                } else if (err.response.status === 404) {
                    errorMessage = 'Message not found. It may have already been deleted.';
                } else if (err.response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                } else if (err.response.data?.message) {
                    errorMessage = err.response.data.message;
                }
            } else if (err.request) {
                errorMessage = 'No response from server. Please check your internet connection.';
            }
            
            setError(errorMessage);
            setShowDeleteConfirmation(false);
            setMessageToDelete(null);
        } finally {
            setDeleteLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                {loading ? (
                    <div className="bg-white rounded-xl p-6 w-[600px] h-[80%] max-w-full shadow-lg flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl p-6 w-[600px] h-[80%] max-w-full shadow-lg relative flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-black">Inbox</h2>
                                <p className="text-sm text-gray-500">{localInbox.length} contact{localInbox.length !== 1 ? 's' : ''} shared</p>
                            </div>
                            <button onClick={onClose} className="text-black hover:text-red-500 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="h-[2px] w-24 bg-gray-200 mb-4" />

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span>{error}</span>
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

                        {/* Chat Container */}
                        <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4 space-y-4">
                            {localInbox.length === 0 ? (
                                <div className="text-center text-gray-500 mt-8">
                                    <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <p className="mt-4 text-lg font-medium">No contacts yet</p>
                                    <p className="text-sm">Contact information will appear here when someone shares their details with you.</p>
                                </div>
                            ) : (
                                localInbox.map((message, index) => (
                                    <div key={message.id} className="flex justify-start">
                                        <div className="w-full">
                                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                                <div className="flex items-center mb-3">
                                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-gray-900">Contact Shared</h4>
                                                        <p className="text-xs text-gray-500">{formatTime(message.created_at)}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteClick(message.id.toString())}
                                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        title="Delete contact"
                                                        disabled={deleteLoading}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                            <span className="text-sm text-gray-700">{message.email}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(message.email);
                                                            }}
                                                            className="p-1 text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
                                                            title="Copy email"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                            <span className="text-sm text-gray-700">{message.phone_number}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(message.phone_number);
                                                            }}
                                                            className="p-1 text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
                                                            title="Copy phone number"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 z-60 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">Confirm Delete</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this contact? This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => {
                                    setShowDeleteConfirmation(false);
                                    setMessageToDelete(null);
                                }}
                                disabled={deleteLoading}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleDeleteMessage}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Deleting...
                                    </div>
                                ) : (
                                    "Yes, Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default InboxDialog;