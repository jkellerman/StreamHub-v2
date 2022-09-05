import styles from "../Hero/Hero.module.css";
import Image from "next/image";
import { BASE_URL_IMAGE } from "@/utils/utils";

const Hero = ({ image, name }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.imageContainer}>
        <Image
          src={`${BASE_URL_IMAGE}${image}`}
          alt={name}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
