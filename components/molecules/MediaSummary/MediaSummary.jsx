import styles from "../MediaSummary/MediaSummary.module.css";
import StarRating from "../../atoms/StarRating/StarRating";
import { DATE_SLICE } from "@/utils/utils";
import useReadMore from "hooks/useReadMore";
import Certification from "@/components/atoms/Certification/Certification";

const MediaSummary = ({
  movie_age_rating,
  overview,
  release_date,
  vote_average,
  series_age_rating,
  air_date,
}) => {
  const { readMore, handleToggle } = useReadMore();

  return (
    <>
      <section className={styles.container}>
        {/* Age rating */}

        <Certification
          movie_age_rating={movie_age_rating}
          series_age_rating={series_age_rating}
        />

        {/* Release year */}

        {release_date ? (
          <span className={styles.date}>
            {release_date.slice(0, DATE_SLICE)}
          </span>
        ) : (
          <span className={styles.date}>{air_date.slice(0, DATE_SLICE)}</span>
        )}

        {/* Overview */}

        <p
          className={
            !readMore
              ? `${styles.overview}`
              : `${styles.overview} ${styles.expand}`
          }
        >
          {overview}
        </p>
        {overview.split(" ").length > 32 && (
          <button className={styles.readMoreToggle} onClick={handleToggle}>
            {!readMore ? "Read more" : "Show Less"}
          </button>
        )}
      </section>

      {/* rating */}

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

export default MediaSummary;
