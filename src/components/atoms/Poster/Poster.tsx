import Image from "next/image";
import Link from "next/link";
import React from "react";

import { POSTER_URL_IMAGE } from "@/constants/tmdb";
import { shimmer, toBase64 } from "@/utils/placeholder";

import styles from "../Poster/Poster.module.css";

interface PosterProps {
  poster: string;
  title: string;
  hero?: boolean;
  recommendation?: boolean;
  movies?: boolean;
  id?: number;
  name?: string;
}

const Poster: React.FC<PosterProps> = ({
  poster,
  title,
  hero,
  recommendation,
  movies,
  id,
  name,
}) => {
  return (
    <>
      {recommendation && (
        <Link
          href={
            movies
              ? `/movie/${id}?${title.replace(/\s+/g, "")}`
              : `/show/${id}?${name?.replace(/\s+/g, "")}`
          }
          rel="preload"
        >
          <a className={styles.recommendationContainer}>
            <Image
              src={`${POSTER_URL_IMAGE}${poster}`}
              alt={`${title} poster`}
              unoptimized={true}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(240, 140)
              )}`}
              layout="fill"
              objectFit="cover"
            />
          </a>
        </Link>
      )}
      {!recommendation && (
        <div
          className={
            hero ? `${styles.heroPoster}` : `${styles.mediaDetailsTabPoster}`
          }
        >
          <Image
            src={`${POSTER_URL_IMAGE}${poster}`}
            alt={`${title} poster`}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(240, 140)
            )}`}
            unoptimized={true}
            layout="fill"
          />
        </div>
      )}
    </>
  );
};

export default Poster;
