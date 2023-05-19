import Image from "next/future/image";

import Button from "@/components/atoms/Buttons/Button";
import primevideo from "@/public/assets/amazon_prime.svg";
import appletv from "@/public/assets/apple_tv_plus.svg";
import disney from "@/public/assets/disney_plus.svg";
import netflix from "@/public/assets/netflix.svg";

import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subheading}>Get recommendations for:</div>
        <div className={styles.logosContainer}>
          <Image src={netflix} alt="logo" unoptimized className={styles.logo} />

          <Image src={disney} alt="logo" unoptimized className={styles.logo} />
          <Image src={primevideo} alt="logo" unoptimized className={styles.logo} />
          <Image src={appletv} alt="logo" unoptimized className={styles.logo} />
          <span className={styles.more}>& more</span>
        </div>
        <h1 className={styles.heading}>Your Ultimate Entertainment Companion</h1>
        <p className={styles.description}>
          Browse, search or use a randomized generator to get the perfect movie or series to watch
          tonight. Simple!
        </p>
        <Button text="Let Fate Decide" />
        <button className={styles.button}>Explore</button>
      </div>
      <hr className={styles.hr} />
    </>
  );
};

export default Hero;
