import Button from "@/components/Buttons/Buttons";

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
      <div className={styles.container}>
        <div className={styles.subheading}>Get recommendations for:</div>

        <Heading as="h1" size="lg">
          Movies and series on all streaming services
        </Heading>
        <p className={styles.description}>
          Browse, search or use a randomised generator to get the perfect movie or series to watch
          tonight. Simple!
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
      </div>
      <hr className={styles.hr} id="hr" />
    </>
  );
};

export default Hero;
