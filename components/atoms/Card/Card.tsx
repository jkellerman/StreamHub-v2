import React from "react";
import Link from "next/link";
import Image from "next/future/image";
import styles from "../Card/Card.module.css";
import { shimmer, toBase64 } from "@/utils/placeholder";
import { BACKDROP_URL_IMAGE } from "@/constants/tmdb";

interface CardProps {
  id: number;
  image: string;
  series_name?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ id, image, series_name, title }) => {
  return (
    <Link
      href={
        title
          ? `/movie/${id}?${title.replace(/ /g, "")}`
          : `/show/${id}?${series_name?.replace(/ /g, "")}`
      }
    >
      <a className={styles.container}>
        <Image
          src={`${BACKDROP_URL_IMAGE}${image}`}
          alt={`${series_name || title}`}
          unoptimized={true}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(240, 140)
          )}`}
          width={780}
          height={439}
          className={styles.card}
        />
      </a>
    </Link>
  );
};

export default Card;
