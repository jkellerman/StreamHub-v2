import Image from "next/future/image";
import Link from "next/link";

import Button from "@/components/atoms/Buttons/Button";
import primevideo from "@/public/assets/amazon_prime.jpg";
import disney from "@/public/assets/disney_plus.svg";
import netflix from "@/public/assets/netflix.svg";
import now from "@/public/assets/now.webp";

import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subheading}>Get recommendations for:</div>
        <div className={styles.logosContainer}>
          <div className={styles.logoWrapper}>
            <Image src={netflix} alt="logo" className={styles.logo} priority />
          </div>
          <div className={styles.logoWrapper}>
            <Image src={primevideo} alt="logo" className={styles.logo} priority />
          </div>
          <div className={styles.logoWrapper}>
            <Image src={disney} alt="logo" className={styles.logo} priority />
          </div>
          <div className={styles.logoWrapper}>
            <Image src={now} alt="logo" className={styles.logo} priority />
          </div>
          <span className={styles.more}>& more</span>
        </div>
        <h1 className={styles.heading}>Your Ultimate Entertainment Companion</h1>
        <p className={styles.description}>
          Browse, search or use a randomized generator to get the perfect movie or series to watch
          tonight. Simple!
        </p>
        <Button text="What to watch tonight?" />
        <Link href="/">
          <a className={styles.exploreLink}>Explore</a>
        </Link>
      </div>
      <hr className={styles.hr} />
    </>
  );
};

export default Hero;
