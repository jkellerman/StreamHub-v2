import useSWR from "swr";
import { sliceArray } from "@/utils/utils";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";

const Category = ({ endpoint, category }) => {
  const fetcher = async () => {
    const response = await fetch(`${endpoint}`);
    const data = response.json();
    return data;
  };

  const { data, error } = useSWR(`${category}`, fetcher);
  if (error) return "An error occured";
  if (!data) return "Loading";

  const filteredArr = data.data.results.filter(
    (item) => item.backdrop_path !== null
  );

  const arr = sliceArray(filteredArr, 12);

  return (
    <section>
      <h1>{category}</h1>
      <div className={styles.container}>
        {arr.map((show) => {
          return (
            <article key={show.id} className={styles.linkContainer}>
              <Card
                id={show.id}
                image={show.backdrop_path}
                airDate={show.first_air_date}
                seriesName={show.name}
                releaseDate={show.release_date}
                title={show.title}
              />
              <CardDetails
                airDate={show.first_air_date}
                seriesName={show.name}
                releaseDate={show.release_date}
                title={show.title}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
