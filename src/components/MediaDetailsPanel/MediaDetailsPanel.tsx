import React from "react";

import MediaRating from "@/components/MediaRating/MediaRating";
import Trailer from "@/components/Trailer/Trailer";

import Heading from "../Heading/Heading";

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
      <Heading as="h1" size="lg">
        {title}
      </Heading>
      <>{children}</>
      <Trailer endpoint={`/api/details/${type}/${id}`} variant="tertiary" />
      <MediaRating id={id} type={type} />
    </div>
  );
};

export default MediaDetailsPanel;
