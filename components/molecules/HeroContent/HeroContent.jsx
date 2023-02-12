import styles from "../HeroContent/HeroContent.module.css";
import StarRating from "../../atoms/StarRating/StarRating";
import Poster from "@/components/atoms/Poster/Poster";
import Certification from "@/components/atoms/Certification/Certification";
import ReleaseDate from "@/components/atoms/ReleaseDate/ReleaseDate";

const HeroContent = ({
  title,
  tagline,
  movie_age_rating,
  series_age_rating,
  release_date,
  rating,
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
          <StarRating rating={rating} />
        </div>

        {/* Overview */}
        <p className={styles.overview}>{overview}</p>
      </div>
    </div>
  );
};

export default HeroContent;
