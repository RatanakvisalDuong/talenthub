import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['hips.hearstapps.com', 'lh3.googleusercontent.com',"talenthub.newlinkmarketing.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;
