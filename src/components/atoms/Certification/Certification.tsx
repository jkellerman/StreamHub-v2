import React from "react";

import styles from "../Certification/Certification.module.scss";

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
          {`Rated (${movie_age_rating})`}
        </span>
      )}

      {series_age_rating && series_age_rating.length !== 0 && (
        <span className={mediaDetailsTab ? undefined : `${styles.ageRating}`}>
          {`Rated (${series_age_rating})`}
        </span>
      )}
    </>
  );
};

export default Certification;
