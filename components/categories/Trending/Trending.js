import useSWR from "swr";
import { sliceArray } from "@/utils/utils";
import TrendingCard from "./TrendingCard";
import styles from "../Trending/Trending.module.css";

const TrendingCards = () => {
  const fetcher = async () => {
    const response = await fetch("api/trending");
    const data = await response.json();
    return data;
  };

  const { data, error } = useSWR("trending movies", fetcher);
  if (error) return "An error occured";
  if (!data) return "Loading";
  const filteredArr = data.data.results.filter(
    (type) => type.media_type !== "person"
  );
  const arr = sliceArray(filteredArr, 15);

  return (
    <section>
      <h1>Trending</h1>
      <div className={styles.banner}>
        {arr.map((item) => {
          return (
            <TrendingCard
              key={item.id}
              id={item.id}
              image={item.backdrop_path}
              movieTitle={item.title}
              year={item.release_date}
              type={item.media_type}
              seriesName={item.name}
              airDate={item.first_air_date}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TrendingCards;
