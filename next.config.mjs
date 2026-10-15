/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/about",
        destination: "/tungkol-sa-amin",
      },
      {
        source: "/contact",
        destination: "/makipag-ugnayan",
      },
      {
        source: "/privacy",
        destination: "/patakaran-sa-privacy",
      },
      {
        source: "/mga-paksa",
        destination: "/topics",
      },
      {
        source: "/maghanap",
        destination: "/search",
      },
      {
        source: "/suggest",
        destination: "/magmungkahi",
      },
    ];
  },
};

export default nextConfig;
