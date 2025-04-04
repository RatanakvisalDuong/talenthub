// // src/app/yourportfolio/page.tsx
// "use client";

// import { useSession } from "next-auth/react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import PortfolioPageWrapper from "./PortfolioPageWrapper";
// import { Portfolio } from "../type/portfolio";
// import LoadingSpinner from "@/components/loading/loading";

// export default function YourPortfolioPage() {
//   const { data: session, status } = useSession();
//   const [portfolioData, setPortfolioData] = useState<Portfolio | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (session && session.googleId) {
//       const fetchPortfolio = async () => {
//         try {
//           const response = await axios.get(
//             `${process.env.NEXT_PUBLIC_API_URL}view_portfolio_details/${session.googleId}`
//           );
//           setPortfolioData(response.data);
//         } catch (error) {
//           setError("Portfolio not found or failed to load.");
//           console.error("Error fetching portfolio data:", error);
//         }
//       };
//       fetchPortfolio();
//     }
//   }, [session]);

//   if (status === "loading") {
//     return <LoadingSpinner />;
//   }

//   if (!session || !session.googleId) {
//     router.push("/");
//     return null;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!portfolioData) {
//     return <LoadingSpinner />;
//   }

//   return <PortfolioPageWrapper portfolio={portfolioData} />;
// }


import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/option"; // Correct path to authOptions
import { Portfolio } from "../type/portfolio";
import LoadingSpinner from "@/components/loading/loading";
import YourPortfolioPageComponent from "./yourportfolio-page";

export default async function YourPortfolioPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.googleId) {
    return (
      <div>
        Please log in to view your portfolio.
      </div>
    );
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}view_portfolio_details/${session.googleId}`
    );

    const portfolioData: Portfolio = response.data;

    return <YourPortfolioPageComponent portfolio={portfolioData} />;
  } catch (error) {
    return <div>Portfolio not found or failed to load.</div>;
  }
}
