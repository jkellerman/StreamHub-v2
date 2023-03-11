import React from "react";
import styles from "../MediaSummary/MediaSummary.module.css";
import StarRating from "../../atoms/StarRating/StarRating";

interface MediaSummaryProps {
  children: React.ReactNode;
  star_rating: number;
}

const MediaSummary: React.FC<MediaSummaryProps> = ({
  children,
  star_rating,
}) => {
  return (
    <>
      <section className={styles.container}>{children}</section>
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
