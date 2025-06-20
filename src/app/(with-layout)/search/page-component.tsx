"use client"

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "@/components/card/card";
import SearchBar from "./search-bar";
import axios from "axios";
import { PortfolioProfile } from "../home/home-portfolio";

interface SearchPageProps {
    apiUrl?: string;
}

export default function SearchPage({ apiUrl }: SearchPageProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';

    const [searchResults, setSearchResults] = useState<PortfolioProfile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>(query);

    const searchPortfolios = async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setHasSearched(false);
            return;
        }

        try {
            setIsLoading(true);
            setHasSearched(true);

            const response = await axios.get(`${apiUrl}search_portfolio`, {
                params: { name: searchQuery }
            });

            let results: PortfolioProfile[] = [];
            if (response.data && Array.isArray(response.data)) {
                results = response.data;
            } else if (response.data && response.data.data) {
                results = response.data.data;
            }

            setSearchResults(results);
        } catch (error) {
            console.error("Error searching portfolios:", error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Search when component mounts with URL query
    useEffect(() => {
        if (query) {
            setSearchTerm(query);
            searchPortfolios(query);
        }
    }, [query, apiUrl]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        
        // Update URL with search query
        if (term.trim()) {
            router.push(`/search?q=${encodeURIComponent(term)}`);
            searchPortfolios(term);
        } else {
            router.push('/search');
            setSearchResults([]);
            setHasSearched(false);
        }
    };

    const handleBackToHome = () => {
        router.push('/home');
    };

    return (
        <div className="bg-[#E8E8E8] min-h-screen">
            <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-8 py-20">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={handleBackToHome}
                        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </button>
                    
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                        Search TalentHub Portfolio
                    </h1>
                    
                    <SearchBar 
                        onSearch={handleSearch}
                        initialValue={searchTerm}
                        placeholder="Search for students by name..."
                    />
                </div>

                {/* Search Results */}
                <div className="mt-8">
                    {query && (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Search results for: <span className="text-blue-600">"{query}"</span>
                            </h2>
                            {hasSearched && !isLoading && (
                                <p className="text-gray-600 mt-1">
                                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                                </p>
                            )}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="text-gray-600">Searching portfolios...</p>
                            </div>
                        </div>
                    ) : hasSearched ? (
                        searchResults.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                                {searchResults.map((portfolio) => (
                                    <Card key={`${portfolio.user_id}-${portfolio.id}`} portfolio={portfolio} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="mb-4">
                                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
                                <p className="text-gray-600 mb-4">
                                    We couldn't find any portfolios matching "{query}"
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Try adjusting your search terms or browse all portfolios
                                </p>
                                <button
                                    onClick={handleBackToHome}
                                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Browse All Portfolios
                                </button>
                            </div>
                        )
                    ) : (
                        <div className="text-center py-12">
                            <div className="mb-4">
                                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Search Student Portfolios</h3>
                            <p className="text-gray-600">
                                Enter a student name to find their portfolio from Paragon International University
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

