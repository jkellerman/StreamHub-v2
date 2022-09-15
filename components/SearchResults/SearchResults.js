import { useRouter } from "next/router";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import categoryStyles from "@/components/Category/Category.module.css";
import searchResultsStyles from "@/components/SearchResults/SearchResults.module.css";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const SearchResults = ({ endpoint }) => {
  const router = useRouter();
  const { query } = router.query;
  const { cards, isLoading } = useInfiniteScroll(endpoint);
  if (isLoading) return <LoadingAnimation />;

  return (
    <>
      <div
        className={searchResultsStyles.heading}
      >{`Results for '${query}'`}</div>
      <div className={categoryStyles.container}>
        {cards.map((item) => {
          return (
            <article key={item.id} className={categoryStyles.linkContainer}>
              <Card
                id={item.id}
                image={item.backdrop_path}
                title={item.title}
                seriesName={item.name}
              />
              <CardDetails
                releaseDate={item.release_date}
                title={item.title}
                airDate={item.first_air_date}
                seriesName={item.name}
              />
            </article>
          );
        })}
      </div>
    </>
  );
};

export default SearchResults;
