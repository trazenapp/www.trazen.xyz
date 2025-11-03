import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**", // http://trazenapp.s3-website.eu-west-3.amazonaws.comundefined
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "trazenapp.s3-website.eu-west-3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "website.com",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      "@react-native-async-storage/async-storage": false,
      "pino-pretty": false
    };
    return config;
  },
  env: {
    WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
  },
};

export default nextConfig;
