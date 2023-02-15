import useInfiniteScroll from "hooks/useInfiniteScroll";
import Spinner from "@/components/atoms/Spinner/Spinner";
import CardList from "@/components/molecules/CardList/CardList";
import CategoryHeading from "@/components/atoms/CategoryHeading/CategoryHeading";

const MediaCategory = ({ endpoint, category, type }) => {
  const { cards, isLoading } = useInfiniteScroll(endpoint);
  if (isLoading) return <Spinner />;

  const arr = cards.filter((item) => item.backdrop_path !== null);

  return (
    <section>
      <CategoryHeading category={category} type={type} />
      <CardList cards={arr} isLoading={isLoading} />
    </section>
  );
};

export default MediaCategory;
