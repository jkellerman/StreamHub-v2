/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

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
  const [imageLoaded, setImageLoaded] = useState(false);

  // This useEffect manages image loading. Need a placeholder for better user experience when the large background Image loads.
  // We can't use Next.js built-in Image component because there's a limit on optimised images without costs. Need to use <picture><source/></picture> to get different size images for different screen sizes
  useEffect(() => {
    if (backdrop) {
      const img = new Image();
      img.src = `${BACKGROUND_URL_IMAGE_M}${backdrop}`;
      img.onload = () => {
        setImageLoaded(true);
      };
    }
  }, [backdrop]);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {backdrop && <BlurredPlaceholder imageLoaded={imageLoaded} />}
        <picture>
          <source media="(min-width:1200px)" srcSet={`${BACKGROUND_URL_IMAGE_XL}${backdrop}`} />
          <source media="(min-width:700px)" srcSet={`${BACKGROUND_URL_IMAGE_L}${backdrop}`} />
          <source media="(max-width:300px)" srcSet={`${BACKGROUND_URL_IMAGE_S}${backdrop}`} />
          <img
            src={`${BACKGROUND_URL_IMAGE_M}${backdrop}`}
            alt={`${title} backdrop`}
            className={`${styles.backgroundImage} ${imageLoaded ? styles.loaded : ""}`}
            width={780}
            height={439}
          />
        </picture>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
};

export default BackgroundImage;

interface BlurredPlaceholderProps {
  imageLoaded: boolean;
}

export const BlurredPlaceholder: React.FC<BlurredPlaceholderProps> = ({ imageLoaded }) => {
  return <div className={styles.blurredPlaceholder} style={{ opacity: imageLoaded ? 0 : 1 }}></div>;
};
