/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ];
  },
};

export default nextConfig;
