/* eslint-disable @next/next/no-img-element */
import { LazyMotion, domAnimation, m } from "framer-motion";
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
      <LazyMotion features={domAnimation}>
        <m.div
          className={styles.imageContainer}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.7,
            },
          }}
        >
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
        </m.div>
      </LazyMotion>

      <div className={styles.overlay}></div>
    </div>
  );
};

export default BackgroundImage;
