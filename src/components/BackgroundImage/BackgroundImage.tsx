/* eslint-disable @next/next/no-img-element */
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import React from "react";

import { BACKGROUND_URL_IMAGE_XL } from "@/constants/tmdb";

import styles from "./BackgroundImage.module.scss";
interface BackgroundImageProps {
  title: string;
  backdrop: string;
  placeholder: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ backdrop, title, placeholder }) => {
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
              width={3840}
              height={2160}
              layout="fill"
              placeholder="blur"
              blurDataURL={placeholder}
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
