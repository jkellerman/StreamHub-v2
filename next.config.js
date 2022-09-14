/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
