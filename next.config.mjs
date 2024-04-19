import bundleAnalyzer from "@next/bundle-analyzer";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withPlaiceholder(nextConfig));
