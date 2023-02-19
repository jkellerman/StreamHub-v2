import React from "react";
import styles from "../HeroContent/HeroContent.module.css";
import StarRating from "../../atoms/StarRating/StarRating";
import Poster from "@/components/atoms/Poster/Poster";
import Certification from "@/components/atoms/Certification/Certification";
import ReleaseDate from "@/components/atoms/ReleaseDate/ReleaseDate";
import MediaOverview from "@/components/atoms/MediaOverview/MediaOverview";

interface HeroContentProps {
  title: string;
  tagline: string;
  movie_age_rating?: string;
  series_age_rating?: string;
  release_date?: string;
  star_rating: number;
  overview: string;
  poster: string;
  air_date?: string;
}

const HeroContent: React.FC<HeroContentProps> = ({
  title,
  tagline,
  movie_age_rating,
  series_age_rating,
  release_date,
  star_rating,
  overview,
  poster,
  air_date,
}) => {
  return (
    <div className={styles.container}>
      <Poster poster={poster} title={title} hero />

      <div className={styles.content}>
        {/* Title and tagline */}
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.tagline}>
          {tagline !== "" ? `"${tagline}"` : null}
        </div>

        {/* age certification, release year and runtime & rating */}

        <div className={styles.list}>
          <Certification
            movie_age_rating={movie_age_rating}
            series_age_rating={series_age_rating}
          />
          <ReleaseDate air_date={air_date} release_date={release_date} styled />
          <StarRating star_rating={star_rating} />
        </div>
        <MediaOverview overview={overview} hero />
      </div>
    </div>
  );
};

export default HeroContent;
