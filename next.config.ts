import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour éviter l'avertissement cross-origin en développement
  experimental: {
    allowedDevOrigins: ["192.168.1.35"],
  },
  
  // Configuration des images
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
