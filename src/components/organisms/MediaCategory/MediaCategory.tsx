import React from "react";

import CategoryHeading from "@/components/atoms/CategoryHeading/CategoryHeading";
import Spinner from "@/components/atoms/Spinner/Spinner";
import CardList from "@/components/molecules/CardList/CardList";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface MediaCategoryProps {
  endpoint: string;
  category: string;
  type: string;
}

const MediaCategory: React.FC<MediaCategoryProps> = ({
  endpoint,
  category,
  type,
}) => {
  const { cards, isLoading, isError } = useInfiniteScroll(endpoint);
  if (isLoading) return <Spinner />;

  const arr = cards.filter((item) => item.backdrop_path !== null);

  return (
    <section>
      <CategoryHeading category={category} type={type} />
      <CardList cards={arr} isLoading={isLoading} isError={isError} />
    </section>
  );
};

export default MediaCategory;
