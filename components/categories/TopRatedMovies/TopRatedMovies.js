import useSWR from "swr";
import { sliceArray } from "@/utils/utils";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/Card/CardDetails";
import styles from "../../Categories/Container.module.css";

const TopRatedMovies = () => {
  const fetcher = async () => {
    const response = await fetch("api/top-rated-movies");
    const data = response.json();
    return data;
  };

  const { data, error } = useSWR("top rated movies", fetcher);
  if (error) return "An error occured";
  if (!data) return "Loading";
  const arr = sliceArray(data.data.results, 12);

  return (
    <section>
      <h1>Top Rated Movies</h1>
      <div className={styles.container}>
        {arr.map((show) => {
          return (
            <article key={show.id} className={styles.linkContainer}>
              <Card
                id={show.id}
                image={show.backdrop_path}
                releaseDate={show.release_date}
                title={show.title}
              />
              <CardDetails releaseDate={show.release_date} title={show.title} />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TopRatedMovies;
