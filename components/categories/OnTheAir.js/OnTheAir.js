import useSWR from "swr";
import { sliceArray } from "@/utils/utils";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/Card/CardDetails";
import styles from "../../Categories/Container.module.css";

const OnTheAir = () => {
  const fetcher = async () => {
    const response = await fetch("api/series/on-the-air");
    const data = response.json();
    return data;
  };

  const { data, error } = useSWR("on the air", fetcher);
  if (error) return "An error occured";
  if (!data) return "Loading";

  const filteredArr = data.data.results.filter(
    (item) => item.backdrop_path !== null
  );

  const arr = sliceArray(filteredArr, 12);

  return (
    <section>
      <h1>On The Air</h1>
      <div className={styles.container}>
        {arr.map((show) => {
          return (
            <article key={show.id} className={styles.linkContainer}>
              <Card
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

export default OnTheAir;
