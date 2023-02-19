import React from "react";
import styles from "../MediaSummary/MediaSummary.module.css";
import StarRating from "../../atoms/StarRating/StarRating";
import Certification from "@/components/atoms/Certification/Certification";
import ReleaseDate from "@/components/atoms/ReleaseDate/ReleaseDate";
import MediaOverview from "@/components/atoms/MediaOverview/MediaOverview";

interface MediaSummaryProps {
  movie_age_rating?: string;
  overview: string;
  release_date?: string;
  star_rating: number;
  series_age_rating?: string;
  air_date?: string;
}

const MediaSummary: React.FC<MediaSummaryProps> = ({
  movie_age_rating,
  overview,
  release_date,
  star_rating,
  series_age_rating,
  air_date,
}) => {
  return (
    <>
      <section className={styles.container}>
        <Certification
          movie_age_rating={movie_age_rating}
          series_age_rating={series_age_rating}
        />
        <ReleaseDate release_date={release_date} air_date={air_date} styled />
        <MediaOverview overview={overview} mediaSummary />
      </section>
      {star_rating > 0 && (
        <>
          <hr />
          <div className={styles.ratingContainer}>
            <StarRating star_rating={star_rating} />
          </div>
          <hr />
        </>
      )}
    </>
  );
};

export default MediaSummary;
