import React from "react";

import Genre from "@/components/atoms/Genre/Genre";
import { Genres } from "@/src/types";

import styles from "../MediaGenres/MediaGenres.module.scss";

interface MediaGenresProps {
  genres: Genres.IGenre[];
  movies?: boolean;
}

const MediaGenres: React.FC<MediaGenresProps> = ({ genres, movies }) => {
  const sliceArray = genres.slice(0, 2);
  return (
    <span className={styles.group}>
      {sliceArray.map((genre) => {
        return <Genre key={genre.id} id={genre.id} name={genre.name} movies={movies} />;
      })}
    </span>
  );
};

export default MediaGenres;
