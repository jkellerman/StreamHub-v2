/* eslint-disable @next/next/no-img-element */
import React from "react";

import {
  BACKGROUND_URL_IMAGE_L,
  BACKGROUND_URL_IMAGE_M,
  BACKGROUND_URL_IMAGE_S,
  BACKGROUND_URL_IMAGE_XL,
} from "@/constants/tmdb";
import useFetchDetails from "@/hooks/useFetchDetails";

import styles from "./BackgroundImage.module.scss";

interface BackgroundImageProps {
  endpoint: string;
  title: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ endpoint, title }) => {
  const { data } = useFetchDetails(endpoint);
  return (
    <div className={styles.container}>
      {" "}
      <div className={styles.overlay}></div>
      <div className={styles.imageContainer}>
        {data && (
          <picture>
            <source
              media="(min-width:1200px)"
              srcSet={`${BACKGROUND_URL_IMAGE_XL}${data.backdrop_path}`}
            />
            <source
              media="(min-width:700px)"
              srcSet={`${BACKGROUND_URL_IMAGE_L}${data.backdrop_path}`}
            />
            <source
              media="(max-width:300px)"
              srcSet={`${BACKGROUND_URL_IMAGE_S}${data.backdrop_path}`}
            />
            <img
              src={`${BACKGROUND_URL_IMAGE_M}${data.backdrop_path}`}
              alt={`${title} backdrop`}
              className={styles.backgroundImage}
              loading="eager"
              width={780}
              height={439}
            />
          </picture>
        )}
      </div>
    </div>
  );
};

export default BackgroundImage;
