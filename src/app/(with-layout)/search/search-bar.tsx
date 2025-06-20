import { useState, useEffect } from "react";

interface SearchBarProps {
    onSearch: (term: string) => void;
    initialValue?: string;
    placeholder?: string;
}

export default function SearchBar({ 
    onSearch, 
    initialValue = '', 
    placeholder = "Search for students..." 
}: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    // Update search term when initialValue changes (for URL-based searches)
    useEffect(() => {
        setSearchTerm(initialValue);
    }, [initialValue]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        // Optional: Search as user types (debounced)
        // You can implement debouncing here if needed
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 pl-12 pr-20 text-gray-700 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
                
                {/* Search Icon */}
                <div className="absolute left-4 flex items-center">
                    <svg 
                        className="w-5 h-5 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                </div>

                {/* Clear Button */}
                {searchTerm && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-16 flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {/* Search Button */}
                <button
                    type="submit"
                    className="absolute right-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                    Search
                </button>
            </div>
        </form>
    );
}