import styles from "@/components/Overview/Overview.module.css";
import StarRating from "../StarRating/StarRating";

const Overview = ({ age_rating, overview, release_date, vote_average }) => {
  return (
    <>
      <section className={styles.container}>
        <span className={styles.ageRating}>
          {age_rating !== "" ? `${age_rating}` : "NR"}
        </span>
        <span className={styles.date}>{release_date.slice(0, 4)}</span>
        <p className={styles.overview}>{overview}</p>
      </section>
      {vote_average > 0 && (
        <div className={styles.ratingContainer}>
          <StarRating rating={vote_average} />
        </div>
      )}
    </>
  );
};

export default Overview;
