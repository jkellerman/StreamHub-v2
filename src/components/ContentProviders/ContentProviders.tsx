import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/future/image";

import { LOGO_URL_IMAGE } from "@/constants/tmdb";

import Logo from "../Logo/Logo";

import styles from "./ContentProviders.module.scss";

const LOGO_SIZE = 30;

interface ContentProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

interface ContentProvidersProps {
  contentProviders: ContentProvider[];
}

const ContentProviders: React.FC<ContentProvidersProps> = ({ contentProviders }) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.2,
          },
        }}
      >
        <p className={styles.text}>View Content From:</p>
        <div className={styles.logoContainer}>
          <Logo logo="justWatch" />

          <div className={styles.providersWrapper}>
            <ul className={styles.list}>
              {contentProviders.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  <Image
                    src={`${LOGO_URL_IMAGE}${item.logo_path}`}
                    alt={item.provider_name.replace(" Plus", "+")}
                    unoptimized={true}
                    priority
                    width={LOGO_SIZE}
                    height={LOGO_SIZE}
                    className={styles.logo}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default ContentProviders;
