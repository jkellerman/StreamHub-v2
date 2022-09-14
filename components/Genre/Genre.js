import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";
import Dropdown from "@/components/Dropdown/Dropdown";
// import useFetch from "hooks/useFetch";
import { useState, useEffect, useRef } from "react";

import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const Genre = ({ endpoint, type, name, movieGenreList, seriesGenreList }) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [newImages, setNewImages] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!endpoint) return;
        const response = await fetch(`${endpoint}/${page}`);
        const data = await response.json();
        const filteredArr = data.data.results.filter(
          (item) => item.backdrop_path !== null
        );
        const arr = filteredArr;
        setCards((prev) => {
          if (page === 1) return arr;
          else return [...prev, ...arr];
        });
        setNewImages(false);
        setIsLoading(false);
      } catch (error) {
        setNewImages(false);
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    setPage((OldPage) => {
      return OldPage + 1;
    });
  }, [newImages]);

  const event = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 100
    ) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setIsLoading(true);
    setPage(1);
  }, [endpoint]);

  if (isLoading) return <LoadingAnimation />;

  return (
    <section>
      <Dropdown
        type={type}
        name={name}
        movieGenreList={movieGenreList}
        seriesGenreList={seriesGenreList}
      />
      <h1>{type}</h1>

      <div className={styles.container}>
        {cards.map((item) => {
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
