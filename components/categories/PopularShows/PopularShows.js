import useSWR from "swr";
import { sliceArray } from "@/utils/utils";
import styles from "../PopularShows/PopularShows.module.css";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/Card/CardDetails";

const PopularShows = () => {
  const fetcher = async () => {
    const response = await fetch("api/popular-shows");
    const data = response.json();
    return data;
  };

  const { data, error } = useSWR("popular shows", fetcher);
  if (error) return "An error occured";
  if (!data) return "Loading";
  const arr = sliceArray(data.data.results, 12);

  return (
    <section>
      <h1>Popular Shows</h1>
      <div className={styles.container}>
        {arr.map((show) => {
          return (
            <article className={styles.linkContainer}>
              <Card
                key={show.id}
                id={show.id}
                image={show.backdrop_path}
                airDate={show.first_air_date}
                seriesName={show.name}
              />
              <CardDetails
                airDate={show.first_air_date}
                seriesName={show.name}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default PopularShows;
