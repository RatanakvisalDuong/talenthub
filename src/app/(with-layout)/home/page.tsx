// app/page.tsx
import axios from "axios";
import HomeComponent from "./home-portfolio";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/option";
import { Suspense } from "react";
import LoadingScreen from "../../../components/loadingScreen/loadingScreen";
import { Majors } from "@/app/type/major";

// Async component that fetches data
async function HomeContent() {
  const session = await getServerSession(authOptions);

  const page = 1;
  const response = await axios.get(`${process.env.API_URL}view_all_portfolio?page=${page}`);
  const major = await axios.get(`${process.env.API_URL}view_all_majors`);

  const portfolioData = response.data;
  const majorData: Majors[] = major.data;
  console.log(majorData);
  let userData = {
    photo: null,
    phone_number: null,
    major: null
  };

  if (session?.googleId) {
    try {
      const response2 = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}view_portfolio_details/${session?.googleId}`
      );
      if (response2.data && response2.data.portfolio) {
        userData = response2.data.portfolio;
      }
    } catch (error) {
      console.error("Error fetching user portfolio:", error);
    }
  }

  return (
    <HomeComponent
      portfoliosData={portfolioData}
      photo={userData.photo}
      yourMajor={userData.major}
      major={majorData}
      phoneNumber={userData.phone_number}
      apiUrl={process.env.API_URL || ''}
    />
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingScreen message="Loading portfolios..." />}>
      <HomeContent />
    </Suspense>
  );
}
