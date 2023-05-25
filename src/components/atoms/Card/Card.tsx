import Image from "next/future/image";
import Link from "next/link";
import React from "react";

import { POSTER_URL_IMAGE } from "@/constants/tmdb";
import { shimmer, toBase64 } from "@/utils/placeholder";

import styles from "../Card/Card.module.scss";

interface CardProps {
  id: number;
  poster: string;
  seriesName?: string;
  movieTitle?: string;
  allMedia?: boolean;
}

const Card: React.FC<CardProps> = ({ id, poster, seriesName, movieTitle, allMedia }) => {
  return (
    <Link
      href={
        movieTitle
          ? `/movie/${id}?${movieTitle.replace(/ /g, "")}`
          : `/show/${id}?${seriesName?.replace(/ /g, "")}`
      }
    >
      <a className={styles.container}>
        {allMedia && seriesName && <span className={styles.mediaType}>TV</span>}
        <Image
          src={`${POSTER_URL_IMAGE}${poster}`}
          alt={`${seriesName || movieTitle}`}
          unoptimized={true}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(240, 140))}`}
          width={110}
          height={165}
          className={styles.card}
        />
      </a>
    </Link>
  );
};

export default Card;
