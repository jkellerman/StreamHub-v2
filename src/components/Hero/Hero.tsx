import { LazyMotion, domAnimation, m } from "framer-motion";

import Button from "@/components/Buttons/Buttons";
import { opacity } from "@/utils/animations";

import Heading from "../Heading/Heading";
import Icon from "../Icon/Icon";

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
      <LazyMotion features={domAnimation}>
        <m.div className={styles.container} variants={opacity} initial="hidden" animate="visible">
          <div className={styles.subheading}>Get recommendations for:</div>

          <Heading as="h1" size="lg">
            Movies and series on all streaming services
          </Heading>
          <p className={styles.description}>
            Browse, search or let StreamHub recommend the perfect movie or series to watch tonight.
          </p>

          <Button variant="primary" asLink link="/watch/movies">
            What to watch tonight?
          </Button>

          <div className={styles.buttonWrapper}>
            <Button variant="secondary" onClick={handleScroll}>
              <Icon icon="chevronDown" width="17" height="17" />
              Explore
            </Button>
          </div>
        </m.div>
        <hr className={styles.hr} id="hr" />
      </LazyMotion>
    </>
  );
};

export default Hero;
