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
import { authOptions } from "../api/auth/[...nextauth]/option";
import { Portfolio } from "../type/portfolio";
import YourPortfolioPageComponent from "./yourportfolio-page";
import Layout from "@/components/layout/layout";
import Link from "next/link";
import { redirect } from 'next/navigation';


export default async function YourPortfolioPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.googleId) {
    redirect('/');
  }

  // try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}view_portfolio_details/${session.googleId}`
    );

    const portfolioData: Portfolio = response.data;

    return (
      <Layout>
        <YourPortfolioPageComponent portfolio={portfolioData} />;
      </Layout>
    );


  // } catch (error) {
  //   return (
  //     <div>
  //       {error instanceof Error}
  //     </div>
  //   );
  // }
}
