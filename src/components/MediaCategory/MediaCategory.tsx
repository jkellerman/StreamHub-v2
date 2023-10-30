import React from "react";

import CardList from "@/components/CardList/CardList";
import CategoryHeading from "@/components/CategoryHeading/CategoryHeading";
import Spinner from "@/components/Spinner/Spinner";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface MediaCategoryProps {
  endpoint: string;
  category: string;
  type: string;
}

const MediaCategory: React.FC<MediaCategoryProps> = ({ endpoint, category, type }) => {
  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteScroll(endpoint);
  if (isLoading) return <Spinner />;

  const arr = cards.filter((item) => item.backdrop_path !== null);

  return (
    <section>
      <CategoryHeading category={category} type={type} />
      <CardList
        cards={arr}
        isLoading={isLoading}
        isError={isError}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </section>
  );
};

export default MediaCategory;
