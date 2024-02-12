import Button from "../Buttons/Buttons";
import Heading from "../Heading/Heading";

import styles from "./CallToActionSection.module.scss";

const CTA: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.headingWrapper}>
        <Heading as="h1" size="m">
          Don&apos;t know what to watch next?
        </Heading>
      </div>

      <Button variant="primary" asLink link="/watch/series">
        Get a random pick
      </Button>
    </section>
  );
};

export default CTA;
