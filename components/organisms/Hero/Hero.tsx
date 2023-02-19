import React from "react";
import styles from "../Hero/Hero.module.css";
import HeroBackground from "../../atoms/HeroBackground/HeroBackground";
import HeroContent from "../../molecules/HeroContent/HeroContent";

interface HeroProps {
  image: string;
  tagline: string;
  series_age_rating?: string;
  air_date?: string;
  star_rating: number;
  overview: string;
  poster: string;
  title: string;
  movie_age_rating?: string;
  release_date?: string;
}

const Hero: React.FC<HeroProps> = ({
  image,
  tagline,
  movie_age_rating,
  series_age_rating,
  release_date,
  star_rating,
  overview,
  poster,
  air_date,
  title,
}) => {
  return (
    <>
      <section className={styles.hero}>
        <HeroBackground image={image} title={title} />
      </section>
      <HeroContent
        tagline={tagline}
        movie_age_rating={movie_age_rating}
        series_age_rating={series_age_rating}
        release_date={release_date}
        star_rating={star_rating}
        overview={overview}
        poster={poster}
        air_date={air_date}
        title={title}
      />
    </>
  );
};

export default Hero;
