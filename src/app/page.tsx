
import axios from "axios";
import HomeComponent, { PortfolioProfile } from "./home-portfolio";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/option";
import Layout from "@/components/layout/layout";
import { signOut } from "next-auth/react";

export default async function Home() {
	const session = await getServerSession(authOptions);
	
	const response = await axios.get(`${process.env.API_URL}view_all_portfolio`);
	const portfolioData: PortfolioProfile[] = response.data;
	let response2: any = { data: { portfolio: { photo: null } } };

	if(session?.googleId) {
		response2 = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}view_portfolio_details/${session?.googleId}`
		);
	}

	console.log(portfolioData);

	const photo = response2.data.portfolio.photo;
	const phoneNumber = response2.data.portfolio.phone_number;
	const major = response2.data.portfolio.major;
	return (
		<Layout>
			<HomeComponent portfolios={portfolioData} photo={photo} major={major} phoneNumber={phoneNumber}/>
		</Layout>
	);
}
