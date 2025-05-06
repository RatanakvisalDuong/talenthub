import axios from "axios";
import HomeComponent, { PortfolioProfile } from "./home-portfolio";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/option";

export default async function Home() {
	const session = await getServerSession(authOptions);

	// Fetch first page of portfolios
	const page = 1; 
	const response = await axios.get(`${process.env.API_URL}view_all_portfolio?page=${page}`);
	
	const portfolioData = response.data;
	
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
			major={userData.major} 
			phoneNumber={userData.phone_number}
			apiUrl={process.env.API_URL || ''} 
		/>
	);
}