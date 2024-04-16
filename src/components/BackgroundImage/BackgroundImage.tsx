/* eslint-disable @next/next/no-img-element */
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
      <div className={styles.imageContainer}>
        <Image
          src={`${BACKGROUND_URL_IMAGE_XL}${backdrop}`}
          alt={`${title} backdrop`}
          placeholder="blur"
          blurDataURL={placeholder}
          className={styles.backgroundImage}
          unoptimized
          layout="fill"
        />
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
};

export default BackgroundImage;
