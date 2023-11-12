import Link from "next/link";
import QueryString from "qs";
import React from "react";

import { Media } from "@/src/types";

import styles from "../MediaGenres/MediaGenres.module.scss";

interface MediaGenresProps {
  genres: Media.IGenre[];
  movies?: boolean;
}

const MediaGenres: React.FC<MediaGenresProps> = ({ genres, movies }) => {
  const sliceArray = genres.slice(0, 3);
  return (
    <span className={styles.group}>
      {sliceArray.map((genre) => {
        return <Genre key={genre.id} id={genre.id} name={genre.name} movies={movies} />;
      })}
    </span>
  );
};

export default MediaGenres;

// ==============
// Genre
// ==============

interface GenreProps {
  id: number;
  name: string;
  movies?: boolean;
}

const Genre: React.FC<GenreProps> = ({ id, name, movies }) => {
  return (
    <span className={styles.name} key={id}>
      <Link
        href={
          movies
            ? `/movies?${QueryString.stringify({
                genre: name.toLowerCase(),
              })}`
            : `/series?${QueryString.stringify({
                genre: name.toLowerCase(),
              })}`
        }
      >
        <a className={`${styles.genre} `}>{name}</a>
      </Link>
    </span>
  );
};
