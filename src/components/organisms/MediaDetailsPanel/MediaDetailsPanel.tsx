import React from "react";

import Button from "@/components/atoms/Buttons/Trailer/Button";
import MediaRating from "@/components/molecules/MediaRating/MediaRating";

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
      <Button endpoint={`/api/details/${type}/${id}`} />
      <MediaRating id={id} type={type} />
    </div>
  );
};

export default MediaDetailsPanel;
