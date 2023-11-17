import React from "react";

interface CertificationProps {
  movie_age_rating?: string;
  series_age_rating?: string;
}

const Certification: React.FC<CertificationProps> = ({ movie_age_rating, series_age_rating }) => {
  return (
    <>
      {movie_age_rating && <span>{`Rated (${movie_age_rating})`}</span>}

      {series_age_rating && series_age_rating.length !== 0 && (
        <span>{`Rated (${series_age_rating})`}</span>
      )}
    </>
  );
};

export default Certification;
