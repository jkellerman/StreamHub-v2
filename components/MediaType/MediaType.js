import useSWR from "swr";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";

const MediaType = ({ endpoint, type }) => {
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
        {arr.map((item) => {
          return (
            <article key={item.id} className={styles.linkContainer}>
              <Card
                id={item.id}
                image={item.backdrop_path}
                releaseDate={item.release_date}
                title={item.title}
                airDate={item.first_air_date}
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
    </section>
  );
};

export default MediaType;
