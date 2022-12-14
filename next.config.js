/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
