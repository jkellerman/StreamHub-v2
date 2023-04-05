import React from "react";
import styles from "@/components/molecules/TrendingCardDetails/TrendingCardDetails.module.css";
import ReleaseDate from "../../atoms/ReleaseDate/ReleaseDate";
import Image from "next/future/image";
import movie from "@/public/assets/icon-category-movie.svg";
import tv from "@/public/assets/icon-category-tv.svg";

interface TrendingCardDetailsProps {
  movie_title?: string;
  release_date?: string;
  type: string;
  series_name?: string;
  air_date?: string;
}

const TrendingCardDetails: React.FC<TrendingCardDetailsProps> = ({
  movie_title,
  release_date,
  type,
  series_name,
  air_date,
}) => {
  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.title}>
        {series_name}
        {movie_title}
      </h2>
      <div className={styles.details}>
        <ReleaseDate release_date={release_date} air_date={air_date} />
        &nbsp;&nbsp;•&nbsp;
        {type === "movie" ? (
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
        <span>&nbsp;{type === "tv" ? "series" : type}</span>
      </div>
    </div>
  );
};

export default TrendingCardDetails;
