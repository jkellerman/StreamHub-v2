import { useRouter } from "next/router";
import useFetch from "hooks/useFetch";
import styles from "@/components/SearchResults/SearchResults.module.css";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const SearchResults = ({ endpoint }) => {
  const router = useRouter();
  const { query } = router.query;
  const { isLoading, cards, error } = useFetch(endpoint);

  if (error) return "An error occured";
  if (isLoading) return <LoadingAnimation />;

  return (
    <>
      <div
        className={styles.heading}
      >{`Found ${cards.length} results for '${query}'`}</div>
      <div className={styles.container}>
        {cards.map((item) => {
          return (
            <article key={item.id} className={styles.linkContainer}>
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
