import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //output: "export", // Retiré pour permettre l'utilisation des routes API
  trailingSlash: false, // Désactivé pour les appels API (pas de slash à la fin)

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.cpupme.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1996',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
