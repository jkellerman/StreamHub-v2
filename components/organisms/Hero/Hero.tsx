import React from "react";
import styles from "../Hero/Hero.module.css";
import HeroBackground from "../../atoms/HeroBackground/HeroBackground";

interface HeroProps {
  backdrop: string;
  title: string;
  children: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ backdrop, title, children }) => {
  return (
    <>
      <section className={styles.hero}>
        <HeroBackground backdrop={backdrop} title={title} />
      </section>
      {children}
    </>
  );
};

export default Hero;
