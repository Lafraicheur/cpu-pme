import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // <-- crucial pour next export
    // Si tu utilises des images externes, tu peux ajouter des domaines :
    // domains: ['example.com'],
    // ou remotePatterns: [...]
  },
};

export default nextConfig;
