import Image from "next/future/image";
import Link from "next/link";
import React from "react";
import slugify from "slugify";

import { POSTER_URL_IMAGE } from "@/constants/tmdb";
import { useRegion } from "@/src/context/regionContext";
import { shimmer, toBase64 } from "@/utils/placeholder";

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

  if (generator) {
    return (
      <>
        <div className={styles.generatorContainer}>
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
        </div>
      </>
    );
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
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(240, 140))}`}
              width={110}
              height={165}
              className={styles.card}
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
