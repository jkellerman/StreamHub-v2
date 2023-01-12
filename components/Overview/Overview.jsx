import styles from "@/components/Overview/Overview.module.css";
import StarRating from "../StarRating/StarRating";
import { DATE_SLICE } from "@/utils/utils";

const OVERVIEW_CUTOFF = 275;

const Overview = ({
  age_rating,
  overview,
  release_date,
  vote_average,
  series_age_rating,
  air_date,
  readMore,
  handleToggle,
}) => {
  return (
    <>
      <section className={styles.container}>
        {age_rating === "" ||
          (age_rating && (
            <span className={styles.ageRating}>
              {age_rating !== "" ? `${age_rating}` : "NR"}
            </span>
          ))}

        {series_age_rating && (
          <span className={styles.ageRating}>
            {series_age_rating.length > 0 ? `${series_age_rating}` : "NR"}
          </span>
        )}

        {release_date ? (
          <span className={styles.date}>
            {release_date.slice(0, DATE_SLICE)}
          </span>
        ) : (
          <span className={styles.date}>{air_date.slice(0, DATE_SLICE)}</span>
        )}
        {overview.length <= OVERVIEW_CUTOFF && (
          <p className={styles.overview}>{overview}</p>
        )}
        {overview.length > OVERVIEW_CUTOFF && (
          <p className={styles.overview}>
            {readMore
              ? overview
              : `${overview.substring(0, OVERVIEW_CUTOFF)}...`}
            <button
              className={styles.readMoreToggle}
              onClick={() => handleToggle()}
            >
              {readMore ? "show less" : "read more"}
            </button>
          </p>
        )}
      </section>
      {vote_average > 0 && (
        <>
          <hr />
          <div className={styles.ratingContainer}>
            <StarRating rating={vote_average} />
          </div>
          <hr />
        </>
      )}
    </>
  );
};

export default Overview;
