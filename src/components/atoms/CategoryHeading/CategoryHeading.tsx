import React from "react";
import styles from "../CategoryHeading/CategoryHeading.module.css";
import Link from "next/link";

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
}) => {
  return (
    <div className={styles.headingContainer}>
      <div className={styles.headingAndIconWrapper}>
        <h1 className={styles.heading}>{category}</h1>
      </div>

      {home && (
        <Link href={`/${type}/${category.replace(/\s/g, "")}`}>
          <a className={styles.categoryLink}>more {type}</a>
        </Link>
      )}
    </div>
  );
};

export default CategoryHeading;
