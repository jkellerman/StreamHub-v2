import React from "react";

import styles from "../ReleaseDate/ReleaseDate.module.css";

const DATE_SLICE = 4;

interface ReleaseDateProps {
  release_date?: string;
  air_date?: string;
  styled?: boolean;
  mediaDetailsTab?: boolean;
}

const ReleaseDate: React.FC<ReleaseDateProps> = ({
  release_date,
  air_date,
  styled,
  mediaDetailsTab,
}) => {
  return (
    <>
      {release_date && (
        <span className={styled ? styles.date : undefined}>
          {mediaDetailsTab ? release_date : release_date.slice(0, DATE_SLICE)}
        </span>
      )}

      {air_date && (
        <span className={styled ? styles.date : undefined}>
          {mediaDetailsTab ? air_date : air_date.slice(0, DATE_SLICE)}
        </span>
      )}
    </>
  );
};

export default ReleaseDate;
