import axios from "axios";
import PortfolioPageComponent from "./portfolio-page";
import { Portfolio } from "../../type/portfolio";
import BanPage from "@/components/banPage/page";
import PageNotFound from "@/components/pagenotfound/page";


export default async function PortfolioPage({ params }: { params: Promise<{ googleId: string }> }) {
  const { googleId } = await params;
  try {
    const response = await axios.get(
      `${process.env.API_URL}view_portfolio_details/${googleId}`
    );

    const portfolioData: Portfolio = response.data;
    if (response.data.status === 0) {
      return <PageNotFound />;
    }

    return <PortfolioPageComponent portfolio={portfolioData} />;
  } catch (error) {
    return <PageNotFound />;
  }
}