import useFetch from "hooks/useFetch";
import { sliceArray } from "@/utils/utils";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";

const Category = ({ endpoint, type }) => {
  const { data, isError } = useFetch(endpoint, type);

  if (!data) {
    return [];
  }
  if (isError) return `An error occured, reload page`;

  const filteredArr = data.data.results.filter(
    (item) => item.backdrop_path !== null
  );

  const arr = sliceArray(filteredArr, 12);

  return (
    <section>
      <h2 className={styles.heading}>{type}</h2>
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
