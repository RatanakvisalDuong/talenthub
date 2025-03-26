
// import axios from "axios";
// import HomeComponent, { PortfolioProfile } from "./home-portfolio";
import HomeComponent from "./home-portfolio";
import { portfolio } from "@/dummydata/portfolio";

export default async function Home() {
	// const response = await axios.get(`${process.env.API_URL}view_all_portfolio`);
	// const portfolioData:PortfolioProfile[] = response.data;
	return (
		<div>
			<HomeComponent portfolios={portfolio}/>
		</div>
	);
}
