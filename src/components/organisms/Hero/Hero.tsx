import React from "react";

import BackgroundImage from "../../atoms/BackgroundImage/BackgroundImage";
import styles from "../Hero/Hero.module.scss";

interface HeroProps {
  backdrop: string;
  title: string;
}

const Hero: React.FC<HeroProps> = ({ backdrop, title }) => {
  return (
    <>
      <div className={styles.hero}>
        <BackgroundImage backdrop={backdrop} title={title} />
      </div>
    </>
  );
};

export default Hero;
