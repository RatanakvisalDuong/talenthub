import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/option";
import { Portfolio } from "../../type/portfolio";
import YourPortfolioPageComponent from "./yourportfolio-page";
import BanPage from "../../../components/banPage/page";
import { Suspense } from "react";
import LoadingScreen from "../../../components/loadingScreen/loadingScreen";
import PageNotFound from "@/components/pagenotfound/page";
import { getErrorById } from "@/utils";

async function PortfolioContent() {
    const session = await getServerSession(authOptions);

    if (!session || !session.googleId) {
        return <PageNotFound customMessage={getErrorById(1)} />;
    }



    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}view_portfolio_details/${session.googleId}`
    );

    var portfolioData = response.data;
    console.log(portfolioData);
    if (portfolioData.status === 0) {
        return <BanPage />;
    }
    portfolioData = portfolioData as Portfolio;
    return (
        <div>
            <YourPortfolioPageComponent portfolio={portfolioData} />
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
