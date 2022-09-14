import { useRouter } from "next/router";
import useFetch from "hooks/useFetch";
import categoryStyles from "@/components/Category/Category.module.css";
import searchResultsStyles from "@/components/SearchResults/SearchResults.module.css";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const SearchResults = ({ endpoint }) => {
  const router = useRouter();
  const { query } = router.query;
  const { isLoading, cards, error } = useFetch(endpoint);

  if (error) return "An error occured";
  if (isLoading) return <LoadingAnimation />;
  const filteredArr = cards.filter((item) => item.backdrop_path !== null);
  const arr = filteredArr;

  return (
    <>
      <div
        className={searchResultsStyles.heading}
      >{`Found ${cards.length} results for '${query}'`}</div>
      <div className={categoryStyles.container}>
        {arr.map((item) => {
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
