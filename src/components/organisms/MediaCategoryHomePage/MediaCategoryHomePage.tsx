import React from "react";

import styles from "../MediaCategoryHomePage/MediaCategoryHomePage.module.css";

interface MediaCategoryHomePageProps {
  children: React.ReactNode;
}

const MediaCategoryHomePage: React.FC<MediaCategoryHomePageProps> = ({
  children,
}) => {
  return <section className={styles.section}>{children}</section>;
};

export default MediaCategoryHomePage;
