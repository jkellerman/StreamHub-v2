import Image from "next/image";
import React from "react";

import { POSTER_URL_IMAGE } from "@/constants/tmdb";
import { shimmer, toBase64 } from "@/utils/placeholder";

import styles from "../Poster/Poster.module.scss";

interface PosterProps {
  poster: string;
  title: string;
  movies?: boolean;
  id?: number;
  name?: string;
}

const Poster: React.FC<PosterProps> = ({ poster, title }) => {
  return (
    <div className={styles.posterWrapper}>
      {poster && (
        <Image
          src={`${POSTER_URL_IMAGE}${poster}`}
          alt={`${title} poster`}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(240, 140))}`}
          unoptimized={true}
          layout="fill"
        />
      )}
    </div>
  );
};

export default Poster;
