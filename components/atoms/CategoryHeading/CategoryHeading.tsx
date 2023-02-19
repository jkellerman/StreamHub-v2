import React from "react";
import styles from "../CategoryHeading/CategoryHeading.module.css";
import Link from "next/link";
import Image from "next/future/image";
import movie from "@/public/assets/icon-category-movie.svg";
import tv from "@/public/assets/icon-category-tv.svg";

interface CategoryHeadingProps {
  trending?: boolean;
  type: string;
  category: string;
  home?: boolean;
}

const CategoryHeading: React.FC<CategoryHeadingProps> = ({
  type,
  category,
  home,
  trending,
}) => {
  return (
    <div className={styles.headingContainer}>
      <div className={styles.headingAndIconWrapper}>
        <h1 className={styles.heading}>{category}</h1>

        {type === "trending" && (
          <>
            <Image
              src={movie}
              alt="movie-icon"
              unoptimized={true}
              className={styles.icon}
            />
            <Image
              src={tv}
              alt="movie-icon"
              unoptimized={true}
              className={styles.icon}
            />
          </>
        )}

        {type === "movies" && (
          <Image
            src={movie}
            alt="movie-icon"
            unoptimized={true}
            className={styles.icon}
          />
        )}

        {type === "series" && (
          <Image
            src={tv}
            alt="tv-icon"
            unoptimized={true}
            className={styles.icon}
          />
        )}
      </div>
      {trending && (
        <Link href={`/trending`}>
          <a className={styles.categoryLink}>see more</a>
        </Link>
      )}
      {home && (
        <Link href={`/${type}/${category.replace(/\s/g, "")}`}>
          <a className={styles.categoryLink}>see more</a>
        </Link>
      )}
    </div>
  );
};

export default CategoryHeading;
