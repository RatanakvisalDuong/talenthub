import axios from "axios";
import PortfolioPageComponent from "./portfolio-page";
import { Portfolio } from "../../../type/portfolio";
import PageNotFound from "@/components/pagenotfound/page";
import { Suspense } from "react";
import LoadingScreen from "../../../../components/loadingScreen/loadingScreen";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Fetch portfolio data (reusable function)
async function fetchPortfolioData(googleId: string): Promise<Portfolio | null> {
  try {
    const response = await axios.get(
      `${process.env.API_URL}view_portfolio_details/${googleId}`
    );

    if (response.data.status === 0) {
      return null;
    }

    return response.data as Portfolio;
  } catch (error) {
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ googleId: string }> 
}): Promise<Metadata> {
  const { googleId } = await params;
  const portfolioData = await fetchPortfolioData(googleId);

  if (!portfolioData) {
    return {
      title: 'Portfolio Not Found',
      description: 'The requested portfolio could not be found.',
    };
  }

  const userName = portfolioData.portfolio.user_name;
  const about = portfolioData.portfolio.about;
  const photo = portfolioData.portfolio.photo;
  const email = portfolioData.portfolio.email;
  const phone = portfolioData.portfolio.phone_number;
  
  const majorName = portfolioData.portfolio.role_id === 1 ? 
    portfolioData.portfolio.major || 'Student' : 'Endorser';

  const title = `${userName} - Professional Portfolio`;
  const description = about || `View ${userName}'s professional portfolio. Connect with ${userName} and explore their work, skills, and experience.`;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`;

  return {
    title,
    description,
    keywords: [
      userName,
      'portfolio',
      'professional',
      majorName,
      'contact',
      'resume',
      'profile'
    ].join(', '),
    authors: [{ name: userName }],
    creator: userName,
    publisher: 'Your Platform Name', // Replace with your platform name
    
    // Open Graph
    openGraph: {
      type: 'profile',
      title,
      description,
      url,
      images: photo ? [
        {
          url: photo,
          width: 400,
          height: 400,
          alt: `${userName} profile picture`,
        }
      ] : [],
      siteName: 'Your Platform Name', // Replace with your platform name
      locale: 'en_US',
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: photo ? [photo] : [],
      creator: `@${userName.replace(/\s+/g, '').toLowerCase()}`, // Optional: if you have Twitter handles
    },

    // Additional meta tags
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

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Additional metadata
    other: {
      'profile:first_name': userName.split(' ')[0],
      'profile:last_name': userName.split(' ').slice(1).join(' '),
      'profile:username': googleId,
    },
  };
}

// Generate structured data
function generateStructuredData(portfolio: Portfolio, googleId: string) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}#person`,
    name: portfolio.portfolio.user_name,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`,
    image: portfolio.portfolio.photo,
    description: portfolio.portfolio.about || `Professional portfolio of ${portfolio.portfolio.user_name}`,
    email: portfolio.portfolio.email,
    telephone: portfolio.portfolio.phone_number,
    jobTitle: portfolio.portfolio.role_id === 1 ? 
      portfolio.portfolio.major || 'Student' : 'Endorser',
    worksFor: {
      '@type': 'Organization',
      name: 'Your Platform Name', // Replace with your platform name
    },
    sameAs: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`,
    ],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`,
    },
  };

  return structuredData;
}

async function PortfolioContent({ googleId }: { googleId: string }) {
  const portfolioData = await fetchPortfolioData(googleId);
  
  if (!portfolioData) {
    notFound(); // This will show the 404 page and return proper HTTP status
  }

  const structuredData = generateStructuredData(portfolioData, googleId);

  return (
    <>
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Semantic HTML wrapper */}
      <main role="main">
        <article 
          itemScope 
          itemType="https://schema.org/Person"
          itemID={`${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}#person`}
        >
          {/* Hidden SEO content */}
          <div className="sr-only">
            <h1 itemProp="name">{portfolioData.portfolio.user_name}</h1>
            <p itemProp="description">{portfolioData.portfolio.about}</p>
            <span itemProp="email">{portfolioData.portfolio.email}</span>
            <span itemProp="telephone">{portfolioData.portfolio.phone_number}</span>
            <span itemProp="jobTitle">
              {portfolioData.portfolio.role_id === 1 ? 
                portfolioData.portfolio.major || 'Student' : 'Endorser'}
            </span>
            <link itemProp="url" href={`${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`} />
            {portfolioData.portfolio.photo && (
              <img 
                itemProp="image" 
                src={portfolioData.portfolio.photo} 
                alt={`${portfolioData.portfolio.user_name} profile`}
                style={{ display: 'none' }}
              />
            )}
          </div>

          <PortfolioPageComponent portfolio={portfolioData} />
        </article>
      </main>
    </>
  );
}

export default async function PortfolioPage({ 
  params 
}: { 
  params: Promise<{ googleId: string }> 
}) {
  const { googleId } = await params;
  
  return (
    <Suspense fallback={<LoadingScreen message="Loading portfolio..." />}>
      <PortfolioContent googleId={googleId} />
    </Suspense>
  );
}