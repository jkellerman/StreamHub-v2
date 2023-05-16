/* eslint-disable @next/next/no-img-element */
import React from "react";

import {
  BACKGROUND_URL_IMAGE_S,
  BACKGROUND_URL_IMAGE_M,
  BACKGROUND_URL_IMAGE_L,
  BACKGROUND_URL_IMAGE_XL,
} from "@/constants/tmdb";

import styles from "../MediaBackground/MediaBackground.module.scss";

interface HeroBackgroundProps {
  backdrop: string;
  title: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ backdrop, title }) => {
  return (
    <>
      {" "}
      <div className={styles.overlay}></div>
      <div className={styles.imageContainer}>
        <picture>
          <source media="(min-width:1200px)" srcSet={`${BACKGROUND_URL_IMAGE_XL}${backdrop}`} />
          <source media="(min-width:700px)" srcSet={`${BACKGROUND_URL_IMAGE_L}${backdrop}`} />
          <source media="(max-width:300px)" srcSet={`${BACKGROUND_URL_IMAGE_S}${backdrop}`} />
          <img
            src={`${BACKGROUND_URL_IMAGE_M}${backdrop}`}
            alt={`${title} backdrop`}
            className={styles.backgroundImage}
            loading="eager"
            width={1280}
            height={720}
          />
        </picture>
      </div>
    </>
  );
};

export default HeroBackground;
