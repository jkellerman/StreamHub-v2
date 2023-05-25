import React from "react";

import styles from "../CardDetails/CardDetails.module.scss";

const DATE_SLICE = 4;

interface CardDetailsProps {
  movieTitle?: string;
  seriesName?: string;
  movieYear?: string;
  seriesYear?: string;
}

const CardDetails: React.FC<CardDetailsProps> = ({
  movieTitle,
  seriesName,
  movieYear,
  seriesYear,
}) => {
  return (
    <figcaption className={styles.title}>
      {`${seriesName || movieTitle} (${
        movieYear?.slice(0, DATE_SLICE) || seriesYear?.slice(0, DATE_SLICE)
      })`}
    </figcaption>
  );
};

export default CardDetails;
