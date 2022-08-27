import useSWR from "swr";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";

const Type = ({ endpoint, type }) => {
  const fetcher = async () => {
    const response = await fetch(`${endpoint}`);
    const data = response.json();
    return data;
  };

  const { data, error } = useSWR(`${type}`, fetcher);
  if (error) return "An error occured";
  if (!data) return "Loading";

  const filteredArr = data.data.results.filter(
    (item) => item.backdrop_path !== null
  );
  const arr = filteredArr;

  return (
    <section>
      <h1>{type}</h1>
      <div className={styles.container}>
        {arr.map((show) => {
          return (
            <article key={show.id} className={styles.linkContainer}>
              <Card
                id={show.id}
                image={show.backdrop_path}
                releaseDate={show.release_date}
                title={show.title}
                airDate={show.first_air_date}
                seriesName={show.name}
              />
              <CardDetails
                releaseDate={show.release_date}
                title={show.title}
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

export default Type;
