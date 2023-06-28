import Image from "next/future/image";
import Link from "next/link";
import React from "react";

import chevron from "@/public/assets/right-chevron.svg";

import styles from "../CategoryHeading/CategoryHeading.module.scss";

interface CategoryHeadingProps {
  type: string;
  category: string;
  subheading?: string;
  recommendations?: boolean;
}

const CategoryHeading: React.FC<CategoryHeadingProps> = ({
  type,
  category,
  subheading,
  recommendations,
}) => {
  return (
    <>
      {!recommendations && (
        <div className={styles.headingContainer}>
          <Link href={`/${type}/${category.replace(/\s/g, "")}`}>
            <a className={styles.heading}>
              {category}

              <Image
                src={chevron}
                alt="chevron-right"
                width={14}
                height={14}
                className={styles.chevron}
              />
            </a>
          </Link>
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
