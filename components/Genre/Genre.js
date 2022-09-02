import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";
import Dropdown from "@/components/Dropdown/Dropdown";

const Genre = ({ endpoint, type, name }) => {
  const [mediaType, setMediaType] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`${endpoint}`);
      const data = await response.json();
      const arr = data.data.results;
      setMediaType(arr);
    };
    fetchMovies();
  }, [endpoint]);

  return (
    <section>
      <Dropdown type={type} name={name} />
      <h1>{type}</h1>
      <div className={styles.container}>
        {mediaType.map((item) => {
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

export default Genre;
