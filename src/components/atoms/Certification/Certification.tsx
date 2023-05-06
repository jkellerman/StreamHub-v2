import React from "react";

import styles from "../Certification/Certification.module.css";

interface CertificationProps {
  mediaDetailsTab?: boolean;
  movie_age_rating?: string;
  series_age_rating?: string;
}

const Certification: React.FC<CertificationProps> = ({
  mediaDetailsTab,
  movie_age_rating,
  series_age_rating,
}) => {
  return (
    <>
      {movie_age_rating && (
        <span className={mediaDetailsTab ? undefined : `${styles.ageRating}`}>
          {movie_age_rating}
        </span>
      )}

      {series_age_rating && series_age_rating.length !== 0 && (
        <span className={mediaDetailsTab ? undefined : `${styles.ageRating}`}>
          {series_age_rating}
        </span>
      )}
    </>
  );
};

export default Certification;
