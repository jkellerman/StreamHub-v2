import Image from "next/image";
import React, { useState } from "react";

import { POSTER_URL_IMAGE } from "@/constants/tmdb";

import styles from "../Poster/Poster.module.scss";

interface PosterProps {
  poster: string;
  title: string;
  movies?: boolean;
  id?: number;
  name?: string;
}

const Poster: React.FC<PosterProps> = ({ poster, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {poster ? (
        <div
          className={
            isLoading
              ? `${styles.posterWrapper} ${styles.isLoading}`
              : `${styles.posterWrapper} ${styles.isLoaded}`
          }
        >
          <Image
            src={`${POSTER_URL_IMAGE}${poster}`}
            alt={`${title} poster`}
            unoptimized={true}
            layout="fill"
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
      ) : (
        <div className={`${styles.posterWrapper} ${styles.noPoster}`}></div>
      )}
    </>
  );
};

export default Poster;
