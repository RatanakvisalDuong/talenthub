import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/option";
import { Portfolio } from "../type/portfolio";
import YourPortfolioPageComponent from "./yourportfolio-page";
import Layout from "@/components/layout/layout";
import { redirect } from 'next/navigation';
import BanPage from "@/components/banPage/page";

export default async function YourPortfolioPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.googleId) {
    redirect('/');
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}view_portfolio_details/${session.googleId}`
  );

  const portfolioData: Portfolio = response.data;

  return (
    // <Layout>
    <div>
      {portfolioData.portfolio.status === 1 ? (
        <YourPortfolioPageComponent portfolio={portfolioData} />
      ) : (
        <BanPage />
      )}
    </div>
    // </Layout>
  );
}
