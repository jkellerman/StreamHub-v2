import styles from "../Hero/Hero.module.css";
import Image from "next/image";
import { BASE_URL_IMAGE } from "@/utils/utils";

const Hero = ({ image, name }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.imageContainer}>
        <Image
          src={`${BASE_URL_IMAGE}${image}`}
          alt={`${name} backdrop`}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
