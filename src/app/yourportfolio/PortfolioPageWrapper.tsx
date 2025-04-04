// // src/app/yourportfolio/PortfolioPageWrapper.tsx
// import dynamic from "next/dynamic";
// import { Portfolio } from "../type/portfolio";

// // Dynamically import PortfolioPage with ssr: false to disable server-side rendering
// const YourPortfolioPageComponent = dynamic(
//   () => import("./yourportfolio-page"),
//   { ssr: false }
// );

// interface PortfolioPageWrapperProps {
//   portfolio: Portfolio;
// }

// export default function PortfolioPageWrapper({ portfolio }: PortfolioPageWrapperProps) {
//   return <YourPortfolioPageComponent portfolio={portfolio} />;
// }
