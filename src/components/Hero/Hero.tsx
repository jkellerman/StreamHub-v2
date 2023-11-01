import Image from "next/future/image";

import Button from "@/components/Buttons/Buttons";
import primevideo from "@/public/assets/amazon_prime.jpg";
import disney from "@/public/assets/disney_plus.svg";
import netflix from "@/public/assets/netflix.svg";
import now from "@/public/assets/now.webp";

import styles from "./Hero.module.scss";

const Hero = () => {
  const handleScroll = () => {
    const hrElement = document.querySelector<HTMLElement>("#hr");
    if (hrElement) {
      hrElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subheading}>Get recommendations for:</div>
        <div className={styles.logosContainer}>
          <div className={styles.logoWrapper}>
            <Image src={netflix} alt="logo" className={styles.logo} priority unoptimized />
          </div>
          <div className={styles.logoWrapper}>
            <Image src={primevideo} alt="logo" className={styles.logo} priority unoptimized />
          </div>
          <div className={styles.logoWrapper}>
            <Image src={disney} alt="logo" className={styles.logo} priority unoptimized />
          </div>
          <div className={styles.logoWrapper}>
            <Image src={now} alt="logo" className={styles.logo} priority unoptimized />
          </div>
          <span className={styles.more}>& more</span>
        </div>
        <h1 className={styles.heading}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
        <p className={styles.description}>
          Browse, search or use a randomized generator to get the perfect movie or series to watch
          tonight. Simple!
        </p>

        <Button variant="primary" asLink link="/">
          What to watch tonight?
        </Button>

        <Button variant="tertiary" onClick={handleScroll}>
          Explore
        </Button>
      </div>
      <hr className={styles.hr} id="hr" />
    </>
  );
};

export default Hero;
