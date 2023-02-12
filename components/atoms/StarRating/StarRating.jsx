import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { filmRating } from "@/utils/utils";
import styles from "../StarRating/StarRating.module.css";

const StarRating = ({ rating }) => {
  return (
    <>
      {rating > 0 && (
        <div className={styles.container}>
          <span>{filmRating(rating)}</span>
          <Rating
            className={styles.stars}
            start={0}
            stop={10}
            step={2}
            initialRating={rating}
            emptySymbol={<FaRegStar />}
            fullSymbol={<FaStar />}
            readonly={true}
          />
        </div>
      )}
    </>
  );
};

export default StarRating;
