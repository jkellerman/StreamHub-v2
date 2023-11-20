import React from "react";

import styles from "./Certification.module.scss";

interface CertificationProps {
  movie_age_rating?: string;
  series_age_rating?: string;
}

const Certification: React.FC<CertificationProps> = ({ movie_age_rating, series_age_rating }) => {
  return (
    <>
      {movie_age_rating && <span className={styles.certification}>{movie_age_rating}</span>}

      {series_age_rating && series_age_rating.length !== 0 && (
        <span className={styles.certification}>{series_age_rating}</span>
      )}
    </>
  );
};

export default Certification;
