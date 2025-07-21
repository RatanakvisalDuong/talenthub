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
import { Majors } from "./editportfolio-dialog";
import { getMajorName } from "@/app/type/major";

async function PortfolioContent() {
    const session = await getServerSession(authOptions);

    if (!session || !session.googleId) {
        return <PageNotFound customMessage={getErrorById(1)} />;
    }



    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}view_portfolio_details/${session.googleId}`
    );
    const major = await axios.get(`${process.env.API_URL}view_all_majors`);

    const majorData: Majors[] = major.data;

    var portfolioData = response.data;
    console.log(portfolioData);
    if (portfolioData.status === 0) {
        return <BanPage />;
    }
    portfolioData = portfolioData as Portfolio;
    return (
        <div>
            <YourPortfolioPageComponent portfolio={portfolioData} yourMajor={getMajorName(portfolioData.portfolio.major, majorData)} />
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
