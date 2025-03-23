import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  images: {
    domains: ['image.tmdb.org', 'cdn.jsdelivr.net'], 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
};

export default nextConfig;
