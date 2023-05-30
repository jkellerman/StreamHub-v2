import React from "react";

import styles from "../MediaSummary/MediaSummary.module.scss";

interface MediaSummaryProps {
  children: React.ReactNode;
}

const MediaSummary: React.FC<MediaSummaryProps> = ({ children }) => {
  return (
    <>
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default MediaSummary;
