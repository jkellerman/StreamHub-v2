import styles from "../Hero/Hero.module.css";
import HeroBackground from "../../atoms/HeroBackground/HeroBackground";
import HeroContent from "../../molecules/HeroContent/HeroContent";

const Hero = ({
  image,
  tagline,
  movie_age_rating,
  series_age_rating,
  release_date,
  runtime,
  rating,
  overview,
  poster,
  air_date,
  seasons,
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
        runtime={runtime}
        rating={rating}
        overview={overview}
        poster={poster}
        air_date={air_date}
        seasons={seasons}
        title={title}
      />
    </>
  );
};

export default Hero;
