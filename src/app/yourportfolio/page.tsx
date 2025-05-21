// app/your-portfolio/page.tsx
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/option";
import { Portfolio } from "../type/portfolio";
import YourPortfolioPageComponent from "./yourportfolio-page";
import { redirect } from 'next/navigation';
import BanPage from "@/components/banPage/page";
import { Suspense } from "react";
import LoadingScreen from "../../components/loadingScreen/loadingScreen";

// Async component that fetches portfolio data
async function PortfolioContent() {
  const session = await getServerSession(authOptions);

  if (!session || !session.googleId) {
    redirect('/');
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}view_portfolio_details/${session.googleId}`
  );

  const portfolioData: Portfolio = response.data;

  return (
    <div>
      {portfolioData.portfolio.status === 1 ? (
        <YourPortfolioPageComponent portfolio={portfolioData} />
      ) : (
        <BanPage />
      )}
    </div>
  );
}

export default function YourPortfolioPage() {
  return (
    <Suspense fallback={<LoadingScreen message="Loading your portfolio..." />}>
      <PortfolioContent />
    </Suspense>
  );
}