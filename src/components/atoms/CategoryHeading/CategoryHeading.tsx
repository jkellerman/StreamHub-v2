import Image from "next/future/image";
import Link from "next/link";
import React from "react";

import chevron from "@/public/assets/right-chevron.svg";

import styles from "../CategoryHeading/CategoryHeading.module.scss";

interface CategoryHeadingProps {
  type: string;
  category: string;
  services?: string;
}

const CategoryHeading: React.FC<CategoryHeadingProps> = ({ type, category, services }) => {
  return (
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
      {services === "all" && (
        <div className={styles.subheading}>The most popular on all streaming services.</div>
      )}
    </div>
  );
};

export default CategoryHeading;
