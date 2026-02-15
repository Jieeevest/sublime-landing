import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "72.61.215.67"],
    remotePatterns: [
      { protocol: "https", hostname: "**", pathname: "**" },
      { protocol: "http", hostname: "**", pathname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
