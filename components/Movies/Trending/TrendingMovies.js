import useSWR from "swr";
import TrendingMovie from "./TrendingMovie";
import styles from "../Trending/TrendingMovies.module.css";
import { sliceArray } from "@/utils/utils";

const TrendingMovies = () => {
  const fetcher = async () => {
    const response = await fetch("api/movies/trending");
    const data = await response.json();
    return data;
  };

  const { data, error } = useSWR("trending movies", fetcher);
  if (error) return "An error occured";
  if (!data) return "Loading";
  const arr = sliceArray(data.data.results, 15);
  console.log(data);

  return (
    <section>
      <h1>Trending Movies</h1>
      <div className={styles.banner}>
        {arr.map((movie) => {
          return (
            <TrendingMovie
              key={movie.id}
              id={movie.id}
              image={movie.backdrop_path}
              title={movie.title}
              year={movie.release_date}
              type={movie.media_type}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TrendingMovies;
