import React from "react";
import styles from "../HeroContent/HeroContent.module.css";
import Poster from "@/components/atoms/Poster/Poster";
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
  children: React.ReactNode;
}

const HeroContent: React.FC<HeroContentProps> = ({
  title,
  tagline,
  overview,
  poster,
  children,
}) => {
  return (
    <div className={styles.container}>
      <Poster poster={poster} title={title} hero />

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.tagline}>
          {tagline !== "" ? `"${tagline}"` : null}
        </div>

        <div className={styles.list}>{children}</div>
        <MediaOverview overview={overview} hero />
      </div>
    </div>
  );
};

export default HeroContent;