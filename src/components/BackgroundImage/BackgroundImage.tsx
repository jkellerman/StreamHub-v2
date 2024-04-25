/* eslint-disable @next/next/no-img-element */
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import React from "react";

import { BACKGROUND_URL_IMAGE_XL } from "@/constants/tmdb";
import { shimmer, toBase64 } from "@/utils/placeholder";

import styles from "./BackgroundImage.module.scss";
interface BackgroundImageProps {
  title: string;
  backdrop: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ backdrop, title }) => {
  return (
    <div className={styles.container}>
      <LazyMotion features={domAnimation}>
        {backdrop ? (
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
            <Image
              src={`${BACKGROUND_URL_IMAGE_XL}${backdrop}`}
              alt={`${title} backdrop`}
              className={styles.backgroundImage}
              layout="fill"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(240, 140))}`}
              unoptimized
            />
          </m.div>
        ) : (
          <m.div
            className={`${styles.imageContainer} ${styles.noImage}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: 0.7,
              },
            }}
          ></m.div>
        )}
      </LazyMotion>

      <div className={styles.overlay}></div>
    </div>
  );
};

export default BackgroundImage;
