import styles from "@/components/Overview/Overview.module.css";

const Overview = ({ age_rating, overview, release_date }) => {
  return (
    <section className={styles.container}>
      <span className={styles.ageRating}>{age_rating}</span>
      <span className={styles.date}>{release_date.slice(0, 4)}</span>
      <p className={styles.overview}>{overview}</p>
    </section>
  );
};

export default Overview;
