import styles from "../HeroContent/HeroContent.module.css";
import {
  toHoursAndMinutes,
  BASE_URL_IMAGE,
  shimmer,
  toBase64,
} from "@/utils/utils";
import StarRating from "../StarRating/StarRating";
import Image from "next/image";

const Content = ({
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
      <div className={styles.posterContainer}>
        <Image
          src={`${BASE_URL_IMAGE}${poster}`}
          alt={`${title} poster`}
          layout="fill"
          objectFit="contain"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(240, 140)
          )}`}
          className={styles.poster}
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.tagline}>
          {tagline !== "" ? `"${tagline}"` : null}
        </div>
        <div>
          <ul className={styles.list}>
            {age_rating === "" || age_rating ? (
              <li className={styles.ageRating}>
                {age_rating === "" ? "NR" : `${age_rating}`}
              </li>
            ) : (
              <li className={styles.ageRating}>
                {series_age_rating.length === 0 ? "NR" : `${series_age_rating}`}
              </li>
            )}
            {release_date ? (
              <li>{release_date.slice(0, 4)}</li>
            ) : (
              <li>{air_date.slice(0, 4)}</li>
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
        <p className={styles.overview}>
          {overview.length > 350 ? `${overview.slice(0, 350)}...` : overview}
        </p>
      </div>
    </div>
  );
};

export default Content;
