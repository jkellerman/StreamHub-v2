import Image from "next/future/image";
import React from "react";

import movie from "@/public/assets/icon-category-movie.svg";
import tv from "@/public/assets/icon-category-tv.svg";

import styles from "../CardDetails/CardDetails.module.scss";
import ReleaseDate from "../ReleaseDate/ReleaseDate";

interface CardDetailsProps {
  air_date?: string;
  series_name?: string;
  release_date?: string;
  title?: string;
}

const CardDetails: React.FC<CardDetailsProps> = ({
  air_date,
  series_name,
  release_date,
  title,
}) => {
  return (
    <div>
      <div className={styles.details}>
        <ReleaseDate release_date={release_date} air_date={air_date} />
        &nbsp;&nbsp;•&nbsp;
        {title ? (
          <Image
            src={movie}
            alt="movie-icon"
            unoptimized={true}
            className={styles.iconMovies}
          />
        ) : (
          <Image
            src={tv}
            alt="tv-icon"
            unoptimized={true}
            className={styles.iconSeries}
          />
        )}
        <span className={styles.type}>
          &nbsp; {series_name ? "series" : "movie"}
        </span>
      </div>
      <h2 className={styles.title}>{series_name || title}</h2>
    </div>
  );
};

export default CardDetails;
