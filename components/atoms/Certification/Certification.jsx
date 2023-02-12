import styles from "../Certification/Certification.module.css";

const Certification = ({
  mediaDetailsTab,
  movie_age_rating,
  series_age_rating,
}) => {
  return (
    <>
      {movie_age_rating && (
        <span className={mediaDetailsTab ? null : `${styles.ageRating}`}>
          {movie_age_rating}
        </span>
      )}

      {series_age_rating && series_age_rating.length !== 0 && (
        <span className={mediaDetailsTab ? null : `${styles.ageRating}`}>
          {series_age_rating}
        </span>
      )}
    </>
  );
};

export default Certification;
