import React from "react";

import styles from "../CategoryHeading/CategoryHeading.module.scss";

interface CategoryHeadingProps {
  category: string;
  subheading?: string;
  recommendations?: boolean;
}

const CategoryHeading: React.FC<CategoryHeadingProps> = ({
  category,
  subheading,
  recommendations,
}) => {
  return (
    <>
      {!recommendations && (
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>{category}</h2>
          {subheading && <div className={styles.subheading}>{subheading}</div>}
        </div>
      )}
      {recommendations && (
        <h3 className={styles.headingContainer}>
          <span className={styles.heading}>{category}</span>
        </h3>
      )}
    </>
  );
};

export default CategoryHeading;
