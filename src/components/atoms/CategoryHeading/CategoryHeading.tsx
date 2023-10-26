import Link from "next/link";
import React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import styles from "../CategoryHeading/CategoryHeading.module.scss";
import Icon from "../Icon/Icon";

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
  const isMobile = useMediaQuery(`(max-width: 504px)`);
  const sm = "14";
  const lg = "18";

  const iconHeight = isMobile ? sm : lg;
  const iconWidth = isMobile ? sm : lg;
  return (
    <>
      {!recommendations && (
        <div className={styles.headingContainer}>
          <Link href={`/${type}/${category.replace(/\s/g, "")}`}>
            <a className={styles.heading}>
              {category}
              <span className={styles.chevron}>
                <Icon icon="chevronRight" width={iconWidth} height={iconHeight} />
              </span>
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
