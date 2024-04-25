import Image from "next/future/image";
import Link from "next/link";
import React, { useState } from "react";
import slugify from "slugify";

import { POSTER_URL_IMAGE } from "@/constants/tmdb";
import { useRegion } from "@/src/context/regionContext";

import styles from "../Card/Card.module.scss";

interface CardProps {
  id?: number;
  poster: string;
  seriesName?: string;
  movieTitle?: string;
  generator?: boolean;
}

const Card: React.FC<CardProps> = ({ id, poster, seriesName, movieTitle, generator }) => {
  const { region } = useRegion();
  const [isLoading, setIsLoading] = useState(true);

  if (generator && poster) {
    return (
      <div className={styles.containerGenerator}>
        <Image
          src={`${POSTER_URL_IMAGE}${poster}`}
          alt={`${seriesName || movieTitle}`}
          unoptimized={true}
          width={110}
          height={165}
          className={
            isLoading ? `${styles.card} ${styles.isLoading}` : `${styles.card} ${styles.isLoaded}`
          }
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
    );
  }
  if (generator && !poster) {
    return <div className={styles.noCard}></div>;
  }

  return (
    <>
      {poster && (
        <Link
          href={
            movieTitle
              ? `/movie/${id}/${region}?${slugify(movieTitle, { lower: true })}`
              : `/show/${id}/${region}?${slugify(seriesName as string, { lower: true })}`
          }
        >
          <a className={styles.container}>
            {seriesName && <span className={styles.mediaType}>TV</span>}
            <Image
              src={`${POSTER_URL_IMAGE}${poster}`}
              alt={`${seriesName || movieTitle}`}
              unoptimized={true}
              width={110}
              height={165}
              className={
                isLoading
                  ? `${styles.card} ${styles.isLoading}`
                  : `${styles.card} ${styles.isLoaded}`
              }
              onLoadingComplete={() => setIsLoading(false)}
            />
          </a>
        </Link>
      )}
      {!poster && (
        <Link
          href={
            movieTitle
              ? `/movie/${id}?${slugify(movieTitle, { lower: true })}`
              : `/show/${id}?${slugify(seriesName as string, { lower: true })}`
          }
        >
          <a className={styles.noCard}></a>
        </Link>
      )}
    </>
  );
};

export default Card;
