import React from "react";

interface TrendingBannerProps {
  children: React.ReactNode;
}

const TrendingBanner: React.FC<TrendingBannerProps> = ({ children }) => {
  return <section>{children}</section>;
};

export default TrendingBanner;
