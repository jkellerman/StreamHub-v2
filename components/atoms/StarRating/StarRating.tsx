import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Rating } from "react-simple-star-rating";
import styles from "../StarRating/StarRating.module.css";

interface StarRatingProps {
  star_rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ star_rating }) => {
  // Get film rating between 1-5 to 1 decimal

  const filmRating = (number: number): number => {
    const rating = Math.round((number / 2) * 10) / 10;
    return rating;
  };

  return (
    <>
      {star_rating > 0 && (
        <div className={styles.container}>
          <span>{filmRating(star_rating)}</span>
          <Rating
            iconsCount={5}
            initialValue={filmRating(star_rating)}
            allowFraction
            className={styles.stars}
            emptyIcon={<FaRegStar />}
            fillIcon={<FaStar />}
            readonly
            fillColor="var(--gold)"
            emptyColor="var(--gold)"
          />
        </div>
      )}
    </>
  );
};

export default StarRating;
