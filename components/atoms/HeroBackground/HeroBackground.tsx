import React from "react";
import Image from "next/future/image";
import { BACKGROUND_URL_IMAGE } from "@/constants/tmdb";
import styles from "../HeroBackground/HeroBackground.module.css";

interface HeroBackgroundProps {
  image: string;
  title: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ image, title }) => {
  return (
    <>
      {" "}
      <div className={styles.overlay}></div>
      <div className={styles.imageContainer}>
        <Image
          src={`${BACKGROUND_URL_IMAGE}${image}`}
          alt={`${title} backdrop`}
          unoptimized={true}
          priority={true}
          width={0}
          height={0}
          className={styles.backgroundImage}
        />
      </div>
    </>
  );
};

export default HeroBackground;
