import useSWR from "swr";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/Card/CardDetails";
import styles from "../../components/Categories/Container.module.css";

const Movies = () => {
  const fetcher = async () => {
    const response = await fetch("api/movies");
    const data = response.json();
    return data;
  };

  const { data, error } = useSWR("upcoming movies", fetcher);
  if (error) return "An error occured";
  if (!data) return "Loading";

  const filteredArr = data.data.results.filter(
    (item) => item.backdrop_path !== null
  );
  const arr = filteredArr;

  return (
    <section>
      <h1>Movies</h1>
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

export default Movies;
