import Button from "../Buttons/Buttons";
import Heading from "../Heading/Heading";

import styles from "./CallToActionSection.module.scss";

const CTA: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.headingWrapper}>
        <Heading as="h1" size="m">
          Need help deciding what to watch?
        </Heading>
      </div>

      <Button variant="primary" asLink link="/watch/movies">
        Get recommendations
      </Button>
    </section>
  );
};

export default CTA;
