import { useRouter } from "next/router";
import React from "react";

import MediaRating from "@/components/MediaRating/MediaRating";
import Trailer from "@/components/Trailer/Trailer";

import Button from "../Buttons/Buttons";
import Heading from "../Heading/Heading";
import Icon from "../Icon/Icon";

import styles from "./MediaDetailsPanel.module.scss";

interface MediaDetailsPanel {
  title: string;
  children: React.ReactNode;
  id: number;
  type: string;
}

const MediaDetailsPanel: React.FC<MediaDetailsPanel> = ({ title, children, id, type }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.btn}>
        <Button variant="quinary" onClick={goBack}>
          <Icon icon="arrowLeft" fill="var(--tertiary-light)" />
          Back
        </Button>
      </div>

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
