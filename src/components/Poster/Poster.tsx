import Image from "next/image";
import React from "react";

import { POSTER_URL_IMAGE } from "@/constants/tmdb";

import styles from "../Poster/Poster.module.scss";

interface PosterProps {
  poster: string;
  title: string;
  movies?: boolean;
  id?: number;
  name?: string;
  placeholder: string;
}

const Poster: React.FC<PosterProps> = ({ poster, title, placeholder }) => {
  return (
    <>
      {poster ? (
        <div className={styles.posterWrapper}>
          <Image
            src={`${POSTER_URL_IMAGE}${poster}`}
            alt={`${title} poster`}
            placeholder="blur"
            blurDataURL={placeholder}
            unoptimized={true}
            layout="fill"
          />
        </div>
      ) : (
        <div className={`${styles.posterWrapper} ${styles.noPoster}`}></div>
      )}
    </>
  );
};

export default Poster;
