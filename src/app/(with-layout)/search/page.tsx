import { JSX, Suspense } from 'react';
import SearchPage from './page-component';
import { Metadata } from 'next';

// Correct types for Next.js 15.2.3 - both params and searchParams are Promises
interface PageProps {
    params: Promise<{ [key: string]: string | string[] | undefined }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface SearchPageRouteProps extends PageProps {
    searchParams: Promise<{ 
        q?: string;
        [key: string]: string | string[] | undefined;
    }>;
}

// Enhanced metadata generation for Next.js 15.2.3
export async function generateMetadata(
    { searchParams }: SearchPageRouteProps
): Promise<Metadata> {
    // Await the searchParams Promise
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams.q || '';
    const decodedQuery = Array.isArray(query) ? query[0] : query;
    const cleanQuery = decodedQuery ? decodeURIComponent(decodedQuery) : '';
    
    if (cleanQuery) {
        // Check for specific search patterns to customize metadata
        const isNameSearch = cleanQuery.split(' ').length >= 2;
        const isStudentSearch = cleanQuery.toLowerCase().includes('student');
        const isParagonSearch = cleanQuery.toLowerCase().includes('paragon');
        
        let title = `Search: ${cleanQuery} | TalentHub - Paragon International University`;
        let description = `Search results for "${cleanQuery}" on TalentHub. Find talented ICT students from Paragon International University matching your search.`;
        
        // Customize based on search type
        if (isNameSearch) {
            title = `Find ${cleanQuery} | TalentHub Student Search`;
            description = `Search for ${cleanQuery} on TalentHub. Find student portfolio and connect with talented ICT students from Paragon International University.`;
        } else if (isStudentSearch) {
            title = `${cleanQuery} | TalentHub Student Directory`;
            description = `Browse ${cleanQuery} on TalentHub. Discover portfolios and achievements from Paragon International University.`;
        } else if (isParagonSearch) {
            title = `${cleanQuery} | Official TalentHub Platform`;
            description = `Explore ${cleanQuery} on the official Paragon International University TalentHub platform.`;
        }
        
        const keywords: string[] = [
            'TalentHub search',
            cleanQuery,
            `${cleanQuery} portfolio`,
            `${cleanQuery} student`,
            'Paragon International University students',
            'ICT student portfolios',
            'student search',
            'TalentHub directory'
        ];
        
        return {
            title,
            description,
            keywords,
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
            openGraph: {
                type: 'website',
                locale: 'en_US',
                title: `Search: ${cleanQuery} | TalentHub Portfolio`,
                description: `Search results for "${cleanQuery}" on TalentHub Portfolio Platform`,
                url: `https://talenthub-liart.vercel.app/search?q=${encodeURIComponent(cleanQuery)}`,
                siteName: 'TalentHub',
                images: [
                    {
                        url: 'https://talenthub-liart.vercel.app/search-og-image.jpg',
                        width: 1200,
                        height: 630,
                        alt: `Search ${cleanQuery} - TalentHub Portfolio Platform`,
                    }
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: `Search: ${cleanQuery} | TalentHub`,
                description: `Search results for "${cleanQuery}" on TalentHub`,
                images: ['https://talenthub-liart.vercel.app/search-og-image.jpg'],
            },
            alternates: {
                canonical: `https://talenthub-liart.vercel.app/search?q=${encodeURIComponent(cleanQuery)}`,
            },
            other: {
                'search-query': cleanQuery,
                'search-type': isNameSearch ? 'name' : isStudentSearch ? 'student' : 'general',
            }
        };
    }

    // Default metadata for empty search page
    return {
        title: 'Search Student Portfolios | TalentHub - Paragon International University',
        description: 'Search for talented ICT students from Paragon International University. Find student portfolios by name, major, or skills on TalentHub directory.',
        keywords: [
            'TalentHub search',
            'student portfolio search',
            'Paragon International University',
            'ICT students',
            'student directory',
            'portfolio platform',
            'Cambodia university students',
            'tech talent search',
            'university portfolio search'
        ],
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            title: 'Search Student Portfolios | TalentHub',
            description: 'Search for talented ICT students from Paragon International University',
            url: 'https://talenthub-liart.vercel.app/search',
            siteName: 'TalentHub',
            images: [
                {
                    url: 'https://talenthub-liart.vercel.app/search-og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'TalentHub Student Search - Paragon International University',
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Search Student Portfolios | TalentHub',
            description: 'Search for talented ICT students from Paragon International University',
            images: ['https://talenthub-liart.vercel.app/search-og-image.jpg'],
        },
        alternates: {
            canonical: 'https://talenthub-liart.vercel.app/search',
        },
        category: 'education',
        classification: 'Student Search Platform',
        other: {
            'search-type': 'directory',
            'platform': 'TalentHub',
            'institution': 'Paragon International University'
        }
    };
}

// Loading component with proper TypeScript
function SearchPageFallback(): JSX.Element {
    return (
        <div className="bg-[#E8E8E8] min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading search...</p>
                <p className="text-sm text-gray-500 mt-2">Preparing TalentHub student directory...</p>
            </div>
        </div>
    );
}

// Main component with proper TypeScript for Next.js 15.2.3
export default function SearchPageRoute(): JSX.Element {
    // Type-safe environment variable access
    const apiUrl: string = process.env.NEXT_PUBLIC_API_URL || '';

    return (
        <Suspense fallback={<SearchPageFallback />}>
            <SearchPage apiUrl={apiUrl} />
        </Suspense>
    );
}