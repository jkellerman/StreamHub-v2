import React from "react";

import MediaBackground from "../../atoms/MediaBackground/MediaBackground";
import styles from "../Hero/Hero.module.scss";

interface HeroProps {
  backdrop: string;
  title: string;
}

const Hero: React.FC<HeroProps> = ({ backdrop, title }) => {
  return (
    <>
      <div className={styles.hero}>
        <MediaBackground backdrop={backdrop} title={title} />
      </div>
    </>
  );
};

export default Hero;
