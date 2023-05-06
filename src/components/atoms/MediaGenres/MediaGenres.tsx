import Link from "next/link";
import QueryString from "qs";
import React from "react";

import { Genres } from "@/src/types";

import styles from "../MediaGenres/MediaGenres.module.css";

interface MediaGenresProps {
  genres: Genres.IGenre[];
  movies?: boolean;
}

const MediaGenres: React.FC<MediaGenresProps> = ({ genres, movies }) => {
  return (
    <div className={styles.detailItem}>
      <dt className={styles.heading}>genres</dt>

      <dd className={styles.group}>
        {genres.map((genre) => {
          return (
            <div className={styles.name} key={genre.id}>
              <Link
                href={
                  movies
                    ? `/movies?${QueryString.stringify({
                        genre: genre.name.toLowerCase(),
                      })}`
                    : `/series?${QueryString.stringify({
                        genre: genre.name.toLowerCase(),
                      })}`
                }
              >
                <a className={`${styles.genre} `}>{genre.name}</a>
              </Link>
            </div>
          );
        })}
      </dd>
    </div>
  );
};

export default MediaGenres;
