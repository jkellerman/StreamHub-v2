import Image from "next/future/image";

import poster1 from "@/public/assets/poster1.webp";
import poster2 from "@/public/assets/poster2.webp";
import { shimmer, toBase64 } from "@/utils/placeholder";

import Button from "../Buttons/Buttons";
import Content from "../Content/Content";
import Heading from "../Heading/Heading";

import styles from "./CallToActionSection.module.scss";

const CTA: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.outerContainer}>
        <div className={styles.posterWrapper}>
          <div className={styles.illustration}>
            <Image
              className={styles.card}
              src={poster1}
              alt="poster"
              unoptimized={true}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(240, 140))}`}
              width={110}
              height={165}
            />
            <Image
              className={styles.cardTwo}
              src={poster2}
              alt="poster"
              unoptimized={true}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(240, 140))}`}
              width={110}
              height={165}
            />
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <Heading as="h1" size="m">
              Don&apos;t know what to watch next?
            </Heading>

            <Content>
              Lost in the labyrinth of endless streaming choices? Fear not! Get a random
              recommendation for a movie or series to watch tonight on your preferred streaming
              service.
            </Content>
          </div>
          <Button variant="primary" asLink link="/watch/series">
            Get a random pick
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
