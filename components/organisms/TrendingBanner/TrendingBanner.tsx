import React from "react";
import TrendingCards from "@/components/molecules/TrendingCards/TrendingCards";
import CategoryHeading from "@/components/atoms/CategoryHeading/CategoryHeading";
import { Media } from "types";

interface TrendingBannerProps {
  data: Media.IMediaItem[];
  type: string;
  category: string;
}

const TrendingBanner: React.FC<TrendingBannerProps> = ({
  data,
  type,
  category,
}) => {
  return (
    <section>
      <CategoryHeading type={type} category={category} trending />
      <TrendingCards cards={data} />
    </section>
  );
};

export default TrendingBanner;
