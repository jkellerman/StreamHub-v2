import React from "react";
import styles from "../MediaDetails/MediaDetails.module.css";

import { Media, Genres } from "types";

interface MediaDetailsProps {
  children: React.ReactNode;
}

const MediaDetails: React.FC<MediaDetailsProps> = ({ children }) => {
  return (
    <>
      <div className={styles.details}>
        <dl>{children}</dl>
      </div>
      <hr />
    </>
  );
};

export default MediaDetails;
