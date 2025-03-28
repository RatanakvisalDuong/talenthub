"use client"

import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import YourPortfolioPageComponent from "./yourportfolio-page";
import { Portfolio } from "../type/portfolio";
import LoadingSpinner from "@/components/loading/loading";

export default function PortfolioPage() {
  const { data: session, status } = useSession();
  const [portfolioData, setPortfolioData] = useState<Portfolio | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session && session.googleId) {
      const fetchPortfolio = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}view_portfolio_details/${session.googleId}`);
          setPortfolioData(response.data); 
        } catch (error) {
          setError("Portfolio not found or failed to load.");
          console.error("Error fetching portfolio data:", error);
        }
      };

      fetchPortfolio();
    }
  }, [session]); 

  if (status === "loading") {
    return <LoadingSpinner />; 
  }

  if (!session || !session.googleId) {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    return null;
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!portfolioData) {
    return <LoadingSpinner />;
  }

  return <YourPortfolioPageComponent portfolio={portfolioData} />;
}
