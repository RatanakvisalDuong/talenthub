import axios from "axios";
import { useState } from "react";

export default function RemoveImageDialog({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void; }) {
    const [loading, setLoading] = useState(false);
    // const handleRemoveImage = async () => {
    //     // await axios.delete;
    // }
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
            <div className="bg-white rounded-md shadow-lg p-6 w-[400px] text-center">
                <p className="text-lg font-semibold mb-4 text-red-600">Confirm Remove</p>
                <p className="text-gray-700 mb-6">Are you sure you want to remove this image from this project? This action cannot be undone.</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 hover:cursor-pointer"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 hover:cursor-pointer"
                        onClick={()=>{
                            onConfirm();
                        }}
                    >
                        {loading ? "Removing..." : "Yes, Remove"}
                    </button>
                </div>
            </div>
        </div>
    );
}