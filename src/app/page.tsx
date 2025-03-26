
import axios from "axios";
import HomeComponent, { PortfolioProfile } from "./home-portfolio";

export default async function Home() {
	const response = await axios.get(`${process.env.API_URL}view_all_portfolio`);
	const portfolioData:PortfolioProfile[] = response.data;
	return (
		<div>
			<HomeComponent portfolios={portfolioData}/>
		</div>
	);
}
