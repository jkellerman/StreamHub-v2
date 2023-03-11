import React from "react";
import styles from "../MediaDetails/MediaDetails.module.css";

import { Media, Genres } from "types";

interface MediaDetailsProps {
  children: React.ReactNode;
}

const MediaDetails: React.FC<MediaDetailsProps> = ({ children }) => {
  return (
    <>
      <section className={styles.details}>
        <dl>{children}</dl>
      </section>
      <hr />
    </>
  );
};

export default MediaDetails;
