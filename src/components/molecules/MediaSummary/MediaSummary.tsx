import React from "react";

import StarRating from "../../atoms/StarRating/StarRating";
import styles from "../MediaSummary/MediaSummary.module.scss";

interface MediaSummaryProps {
  children: React.ReactNode;
  star_rating: number;
}

const MediaSummary: React.FC<MediaSummaryProps> = ({ children, star_rating }) => {
  return (
    <>
      <div className={styles.container}>{children}</div>
      <hr />
      {star_rating > 0 && (
        <>
          <div className={styles.ratingContainer}>
            <StarRating star_rating={star_rating} />
          </div>
          <hr />
        </>
      )}
    </>
  );
};

export default MediaSummary;
