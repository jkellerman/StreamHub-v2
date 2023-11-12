import React from "react";

import MediaRating from "@/components/MediaRating/MediaRating";
import Trailer from "@/components/Trailer/Trailer";

import styles from "./MediaDetailsPanel.module.scss";

interface MediaDetailsPanel {
  title: string;
  children: React.ReactNode;
  id: number;
  type: string;
}

const MediaDetailsPanel: React.FC<MediaDetailsPanel> = ({ title, children, id, type }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <>{children}</>
      <Trailer endpoint={`/api/details/${type}/${id}`} variant="tertiary" />
      <MediaRating id={id} type={type} />
    </div>
  );
};

export default MediaDetailsPanel;
