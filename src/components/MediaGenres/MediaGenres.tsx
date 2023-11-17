import React from "react";

import { Media } from "@/src/types";

import styles from "../MediaGenres/MediaGenres.module.scss";

interface MediaGenresProps {
  genres: Media.IGenre[];
}

const MediaGenres: React.FC<MediaGenresProps> = ({ genres }) => {
  const sliceArray = genres.slice(0);
  return (
    <span className={styles.group}>
      {sliceArray.map((genre) => {
        return (
          <>
            <Genre key={genre.id} name={genre.name} />
          </>
        );
      })}
    </span>
  );
};

export default MediaGenres;

// ==============
// Genre
// ==============

interface GenreProps {
  name: string;
}

const Genre: React.FC<GenreProps> = ({ name }) => {
  return <span>{name}</span>;
};
