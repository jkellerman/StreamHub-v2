import styles from "../Content/Content.module.css";
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
  release_date,
  runtime,
  rating,
  overview,
  poster,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.posterContainer}>
        <Image
          src={`${BASE_URL_IMAGE}${poster}`}
          alt={`${title} poster`}
          layout="fill"
          objectFit="cover"
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
            <li className={styles.ageRating}>
              {age_rating !== "" ? `${age_rating}` : "NR"}
            </li>
            <li>{release_date.slice(0, 4)}</li>
            <li className={rating > 0 ? styles.runtime : styles.displayRuntime}>
              {toHoursAndMinutes(runtime)}
            </li>
            <li>{rating > 0 && <StarRating rating={rating} />}</li>
          </ul>
        </div>
        <p className={styles.overview}>{overview}</p>
      </div>
    </div>
  );
};

export default Content;
