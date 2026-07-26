import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "72.61.215.67" },
      { protocol: "https", hostname: "strovia.app" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
