import React from "react";
import Image from "next/future/image";
import { BACKGROUND_URL_IMAGE } from "@/constants/tmdb";
import styles from "../HeroBackground/HeroBackground.module.css";

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
        <Image
          src={`${BACKGROUND_URL_IMAGE}${backdrop}`}
          alt={`${title} backdrop`}
          unoptimized
          priority
          width={3840}
          height={2160}
          className={styles.backgroundImage}
        />
      </div>
    </>
  );
};

export default HeroBackground;
