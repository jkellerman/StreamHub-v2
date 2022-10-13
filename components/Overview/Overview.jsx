import styles from "@/components/Overview/Overview.module.css";
import StarRating from "../StarRating/StarRating";

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
          <span className={styles.date}>{release_date.slice(0, 4)}</span>
        ) : (
          <span className={styles.date}>{air_date.slice(0, 4)}</span>
        )}
        {overview.length <= 275 && (
          <p className={styles.overview}>{overview}</p>
        )}
        {overview.length > 275 && (
          <p className={styles.overview}>
            {readMore ? overview : `${overview.substring(0, 275)}...`}
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
