import styles from "../MediaSummary/MediaSummary.module.css";
import StarRating from "../../atoms/StarRating/StarRating";
import Certification from "@/components/atoms/Certification/Certification";
import ReleaseDate from "@/components/atoms/ReleaseDate/ReleaseDate";
import MediaOverview from "@/components/atoms/MediaOverview/MediaOverview";

const MediaSummary = ({
  movie_age_rating,
  overview,
  release_date,
  vote_average,
  series_age_rating,
  air_date,
}) => {
  return (
    <>
      <section className={styles.container}>
        <Certification
          movie_age_rating={movie_age_rating}
          series_age_rating={series_age_rating}
        />
        <ReleaseDate release_date={release_date} air_date={air_date} styled />
        <MediaOverview overview={overview} mediaSummary />
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

export default MediaSummary;
