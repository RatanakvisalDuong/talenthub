import axios from "axios";
import PortfolioPageComponent from "./portfolio-page";
import { Portfolio } from "../../type/portfolio";

export default async function PortfolioPage({ params }: { params: Promise<{ googleId: string }> }) {
  const {googleId} = await params;
  try {
    const response = await axios.get(
      `${process.env.API_URL}view_portfolio_details/${googleId}`
    );

    const portfolioData: Portfolio = response.data;

    return <PortfolioPageComponent portfolio={portfolioData} />;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return <div>Portfolio not found or failed to load.</div>;
  }
}