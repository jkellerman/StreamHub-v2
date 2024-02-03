import { LazyMotion, domAnimation, m } from "framer-motion";
import React from "react";

import { opacity } from "@/utils/animations";

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
        <LazyMotion features={domAnimation}>
          <m.div
            className={styles.headingContainer}
            variants={opacity}
            initial="hidden"
            animate="visible"
          >
            <h2 className={styles.heading}>{category}</h2>
            {subheading && <div className={styles.subheading}>{subheading}</div>}
          </m.div>
        </LazyMotion>
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
