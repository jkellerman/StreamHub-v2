import { useEffect, useState } from "react";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";
import Dropdown from "@/components/Dropdown/Dropdown";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const Genre = ({ endpoint, type, name, movieGenreList, seriesGenreList }) => {
  const [mediaType, setMediaType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${endpoint}`);
        const data = await response.json();
        const filteredArr = data.data.results.filter(
          (item) => item.backdrop_path !== null
        );
        const arr = filteredArr;
        setMediaType(arr);
        setIsLoading(false);
      } catch (error) {
        setError("An error occured");
      }
    };
    fetchMovies();
  }, [endpoint]);

  return (
    <section>
      <Dropdown
        type={type}
        name={name}
        movieGenreList={movieGenreList}
        seriesGenreList={seriesGenreList}
      />
      <h1>{type}</h1>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
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
      )}
    </section>
  );
};

export default Genre;
