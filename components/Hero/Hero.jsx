import styles from "../Hero/Hero.module.css";
import Image from "next/future/image";
import { BACKGROUND_URL_IMAGE } from "@/utils/utils";
import HeroContent from "../HeroContent/HeroContent";

const Hero = ({
  image,
  tagline,
  age_rating,
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
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.imageContainer}>
        <Image
          src={`${BACKGROUND_URL_IMAGE}${image}`}
          alt={`${title} backdrop`}
          unoptimized={true}
          priority={true}
          width={1000}
          height={300}
          className={styles.backgroundImage}
        />
      </div>
      <HeroContent
        tagline={tagline}
        age_rating={age_rating}
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
    </section>
  );
};

export default Hero;
