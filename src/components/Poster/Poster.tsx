import Image from "next/image";
import React from "react";

import { POSTER_URL_IMAGE } from "@/constants/tmdb";

import styles from "../Poster/Poster.module.scss";

interface PosterProps {
  poster: string;
  posterPlaceholder: string;
  title: string;
  movies?: boolean;
  id?: number;
  name?: string;
}

const Poster: React.FC<PosterProps> = ({ poster, title, posterPlaceholder }) => {
  return (
    <div className={styles.posterWrapper}>
      {poster && (
        <Image
          src={`${POSTER_URL_IMAGE}${poster}`}
          alt={`${title} poster`}
          placeholder="blur"
          blurDataURL={posterPlaceholder}
          unoptimized={true}
          layout="fill"
        />
      )}
    </div>
  );
};

export default Poster;
