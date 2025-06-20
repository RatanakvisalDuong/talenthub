import { Suspense } from 'react';
import SearchPage from './page-component';
import { Metadata } from 'next';

// Generate dynamic metadata based on search query
export async function generateMetadata(
    { searchParams }: { searchParams: { q?: string } }
): Promise<Metadata> {
    const query = searchParams.q || '';
    
    if (query) {
        return {
            title: `Search: ${query} | TalentHub - Paragon International University`,
            description: `Search results for "${query}" on TalentHub. Find talented ICT students from Paragon International University matching your search.`,
            keywords: [`TalentHub search`, `${query}`, `Paragon International University students`, `ICT student portfolios`],
            openGraph: {
                title: `Search: ${query} | TalentHub Portfolio`,
                description: `Search results for "${query}" on TalentHub Portfolio Platform`,
                url: `https://talenthub-liart.vercel.app/search?q=${encodeURIComponent(query)}`,
            }
        };
    }

    return {
        title: 'Search Student Portfolios | TalentHub - Paragon International University',
        description: 'Search for talented ICT students from Paragon International University. Find the perfect student portfolio on TalentHub.',
        keywords: ['TalentHub search', 'student portfolio search', 'Paragon International University', 'ICT students'],
        openGraph: {
            title: 'Search Student Portfolios | TalentHub',
            description: 'Search for talented ICT students from Paragon International University',
            url: 'https://talenthub-liart.vercel.app/search',
        }
    };
}

function SearchPageFallback() {
    return (
        <div className="bg-[#E8E8E8] min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading search...</p>
            </div>
        </div>
    );
}

export default function SearchPageRoute() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    return (
        <Suspense fallback={<SearchPageFallback />}>
            <SearchPage apiUrl={apiUrl} />
        </Suspense>
    );
}