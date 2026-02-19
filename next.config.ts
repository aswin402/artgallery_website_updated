import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
      domains: ["images.pexels.com"],
    },
  compiler: {
    // Remove console logs in production
    removeConsole: isProd
      ? {
          exclude: ["error"], // Keep console.error
        }
      : false,
  },
};

export default nextConfig;
