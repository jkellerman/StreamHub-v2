import styles from "../HeroContent/HeroContent.module.css";
import { toHoursAndMinutes, DATE_SLICE } from "@/utils/utils";
import StarRating from "../../atoms/StarRating/StarRating";
import Poster from "@/components/atoms/Poster/Poster";

const HeroContent = ({
  title,
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
        <div>
          <ul className={styles.list}>
            {age_rating && <li className={styles.ageRating}>{age_rating}</li>}

            {series_age_rating && (
              <li className={styles.ageRating}>
                {series_age_rating.length === 0 ? "NR" : `${series_age_rating}`}
              </li>
            )}

            {release_date ? (
              <li>{release_date.slice(0, DATE_SLICE)}</li>
            ) : (
              <li>{air_date.slice(0, DATE_SLICE)}</li>
            )}
            {runtime ? (
              <li
                className={rating > 0 ? styles.runtime : styles.displayRuntime}
              >
                {toHoursAndMinutes(runtime)}
              </li>
            ) : (
              <li className={styles.seasons}>
                {seasons > 1 ? `${seasons} seasons` : `${seasons} season`}
              </li>
            )}
            <li>{rating > 0 && <StarRating rating={rating} />}</li>
          </ul>
        </div>

        {/* Overview */}
        <p className={styles.overview}>{overview}</p>
      </div>
    </div>
  );
};

export default HeroContent;
