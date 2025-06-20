"use client"

import { useState, useEffect, useCallback, JSX } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "@/components/card/card";
import SearchBar from "./search-bar";
import axios from "axios";
import { PortfolioProfile } from "../home/home-portfolio";

interface SearchPageProps {
    apiUrl: string;
}

type SearchMethod = 'exact' | 'partial' | 'split';

export default function SearchPage({ apiUrl }: SearchPageProps): JSX.Element {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';

    const [searchResults, setSearchResults] = useState<PortfolioProfile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>(query);
    const [searchMethod, setSearchMethod] = useState<SearchMethod>('exact');

    // Enhanced search function that handles full names like "Ratanakvisal Duong"
    const searchPortfolios = useCallback(async (searchQuery: string): Promise<void> => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setHasSearched(false);
            return;
        }

        try {
            setIsLoading(true);
            setHasSearched(true);

            const cleanQuery = searchQuery.trim();
            let allResults: PortfolioProfile[] = [];
            
            // Method 1: Exact search first
            try {
                const exactResponse = await axios.get(`${apiUrl}search_portfolio`, {
                    params: { name: cleanQuery },
                    timeout: 10000
                });
                
                let exactResults: PortfolioProfile[] = [];
                if (exactResponse.data && Array.isArray(exactResponse.data)) {
                    exactResults = exactResponse.data;
                } else if (exactResponse.data && exactResponse.data.data) {
                    exactResults = exactResponse.data.data;
                }
                
                if (exactResults.length > 0) {
                    setSearchResults(exactResults);
                    setSearchMethod('exact');
                    return;
                }
                
                allResults = [...exactResults];
            } catch (error) {
                console.log('Exact search failed, trying alternative methods');
            }

            // Method 2: Split search for full names (e.g., "Ratanakvisal Duong")
            const words = cleanQuery.split(' ').filter(word => word.length >= 2);
            if (words.length > 1) {
                try {
                    const wordSearchPromises = words.map(word => 
                        axios.get(`${apiUrl}search_portfolio`, {
                            params: { name: word },
                            timeout: 5000
                        }).catch(() => ({ data: [] }))
                    );

                    const wordResults = await Promise.all(wordSearchPromises);
                    const combinedResults = new Map<number, PortfolioProfile>();

                    wordResults.forEach(response => {
                        let results: PortfolioProfile[] = [];
                        if (response.data && Array.isArray(response.data)) {
                            results = response.data;
                        } else if (response.data && response.data.data) {
                            results = response.data.data;
                        }

                        results.forEach(result => {
                            if (result && result.user_id && result.name) {
                                // Check if the student's name contains multiple search words
                                const nameWords = result.name.toLowerCase().split(' ');
                                const matchingWords = words.filter(word => 
                                    nameWords.some(nameWord => 
                                        nameWord.includes(word.toLowerCase()) || 
                                        word.toLowerCase().includes(nameWord)
                                    )
                                );
                                
                                // If at least 2 words match (or all words for shorter queries), include the result
                                const minMatches = Math.min(2, words.length);
                                if (matchingWords.length >= minMatches) {
                                    combinedResults.set(result.user_id, result);
                                }
                            }
                        });
                    });

                    if (combinedResults.size > 0) {
                        const sortedResults = Array.from(combinedResults.values()).sort((a, b) => {
                            // Sort by relevance - more matching words first
                            const aMatches = words.filter(word => 
                                a.name.toLowerCase().includes(word.toLowerCase())
                            ).length;
                            const bMatches = words.filter(word => 
                                b.name.toLowerCase().includes(word.toLowerCase())
                            ).length;
                            return bMatches - aMatches;
                        });
                        
                        setSearchResults(sortedResults);
                        setSearchMethod('split');
                        return;
                    }
                } catch (error) {
                    console.warn('Split search failed:', error);
                }
            }

            // Method 3: Partial matching with individual words
            if (words.length > 0) {
                try {
                    const partialSearchPromises = words.map(word => 
                        axios.get(`${apiUrl}search_portfolio`, {
                            params: { name: word },
                            timeout: 5000
                        }).catch(() => ({ data: [] }))
                    );

                    const partialResults = await Promise.all(partialSearchPromises);
                    const allPartialResults = new Set<PortfolioProfile>();

                    partialResults.forEach(response => {
                        let results: PortfolioProfile[] = [];
                        if (response.data && Array.isArray(response.data)) {
                            results = response.data;
                        } else if (response.data && response.data.data) {
                            results = response.data.data;
                        }

                        results.forEach(result => {
                            if (result && result.user_id && result.name) {
                                allPartialResults.add(result);
                            }
                        });
                    });

                    if (allPartialResults.size > 0) {
                        setSearchResults(Array.from(allPartialResults));
                        setSearchMethod('partial');
                        return;
                    }
                } catch (error) {
                    console.warn('Partial search failed:', error);
                }
            }

            // No results found
            setSearchResults([]);

        } catch (error) {
            console.error("Error searching portfolios:", error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    }, [apiUrl]);

    // Search when component mounts with URL query
    useEffect(() => {
        if (query) {
            setSearchTerm(query);
            searchPortfolios(query);
        }
    }, [query, searchPortfolios]);

    const handleSearch = useCallback((term: string): void => {
        setSearchTerm(term);
        
        // Update URL with search query
        if (term.trim()) {
            router.push(`/search?q=${encodeURIComponent(term)}`);
        } else {
            router.push('/search');
            setSearchResults([]);
            setHasSearched(false);
        }
    }, [router]);

    const handleBackToHome = useCallback((): void => {
        router.push('/home');
    }, [router]);

    const getSearchMethodMessage = (): string => {
        switch (searchMethod) {
            case 'exact':
                return 'Exact match found';
            case 'split':
                return 'Found by matching name parts';
            case 'partial':
                return 'Found similar names';
            default:
                return '';
        }
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
                        placeholder="Search for students by full name (e.g., Ratanakvisal Duong)..."
                    />
                    
                    {/* Search tips */}
                    <div className="mt-2 text-sm text-gray-600">
                        <p>💡 Try searching with full names for better results. Example: "Ratanakvisal Duong"</p>
                    </div>
                </div>

                {/* Search Results */}
                <div className="mt-8">
                    {query && (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Search results for: <span className="text-blue-600">"{query}"</span>
                            </h2>
                            {hasSearched && !isLoading && (
                                <div className="flex items-center space-x-4 mt-1">
                                    <p className="text-gray-600">
                                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                                    </p>
                                    {searchResults.length > 0 && searchMethod !== 'exact' && (
                                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                            {getSearchMethodMessage()}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="text-gray-600">Searching portfolios...</p>
                                <p className="text-sm text-gray-500 mt-1">Trying multiple search methods for best results</p>
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
                                <div className="text-gray-500 text-sm space-y-1">
                                    <p>Try these search tips:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Check spelling of the name</li>
                                        <li>Try searching with just the first or last name</li>
                                        <li>Remove middle names or initials</li>
                                        <li>Browse all portfolios instead</li>
                                    </ul>
                                </div>
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
                            <p className="text-gray-600 mb-4">
                                Enter a student name to find their portfolio from Paragon International University
                            </p>
                            <div className="text-sm text-gray-500">
                                <p className="mb-2">Examples of searches:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {['Ratanakvisal Duong', 'Rata', 'Computer Science', 'ICT'].map((example) => (
                                        <button
                                            key={example}
                                            onClick={() => handleSearch(example)}
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors"
                                        >
                                            {example}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}