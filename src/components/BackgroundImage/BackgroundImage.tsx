/* eslint-disable @next/next/no-img-element */
import React from "react";

import {
  BACKGROUND_URL_IMAGE_L,
  BACKGROUND_URL_IMAGE_M,
  BACKGROUND_URL_IMAGE_S,
  BACKGROUND_URL_IMAGE_XL,
} from "@/constants/tmdb";

import styles from "./BackgroundImage.module.scss";

interface BackgroundImageProps {
  title: string;
  backdrop: string | undefined;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ backdrop, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {backdrop && (
          <picture>
            <source media="(min-width:1200px)" srcSet={`${BACKGROUND_URL_IMAGE_XL}${backdrop}`} />
            <source media="(min-width:700px)" srcSet={`${BACKGROUND_URL_IMAGE_L}${backdrop}`} />
            <source media="(max-width:300px)" srcSet={`${BACKGROUND_URL_IMAGE_S}${backdrop}`} />
            <img
              src={`${BACKGROUND_URL_IMAGE_M}${backdrop}`}
              alt={`${title} backdrop`}
              className={styles.backgroundImage}
              width={780}
              height={439}
            />
          </picture>
        )}
      </div>

      <div className={styles.overlay}></div>
    </div>
  );
};

export default BackgroundImage;
