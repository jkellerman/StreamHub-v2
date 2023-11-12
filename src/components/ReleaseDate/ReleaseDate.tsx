import React from "react";

import { DATE_SLICE } from "@/constants/app";

import styles from "../ReleaseDate/ReleaseDate.module.scss";

interface ReleaseDateProps {
  release_date?: string;
  air_date?: string;
  mediaDetailsTab?: boolean;
}

const ReleaseDate: React.FC<ReleaseDateProps> = ({ release_date, air_date, mediaDetailsTab }) => {
  return (
    <>
      {release_date && (
        <span className={styles.date}>
          {mediaDetailsTab ? release_date : release_date.slice(0, DATE_SLICE)}
        </span>
      )}

      {air_date && (
        <span className={styles.date}>
          {mediaDetailsTab ? air_date : air_date.slice(0, DATE_SLICE)}
        </span>
      )}
    </>
  );
};

export default ReleaseDate;
