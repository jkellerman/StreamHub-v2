import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/future/image";
import { useEffect, useState } from "react";

import { LOGO_URL_IMAGE } from "@/constants/tmdb";
import { useRegion } from "@/src/context/regionContext";

import Logo from "../Logo/Logo";

import styles from "./ContentProviders.module.scss";

const LOGO_SIZE = 30;

const ContentProviders = () => {
  const { providers } = useRegion();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (providers.length > 0) {
      setLoading(false);
    }
  }, [providers]);

  const removedDuplicateProviders = providers?.filter(
    (item) => item.provider_id !== 2 && item.provider_id !== 387
  );

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
            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : removedDuplicateProviders.length > 0 ? (
              <ul className={styles.list}>
                {removedDuplicateProviders.map((item, i) => (
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
            ) : (
              <div className={styles.error}>No providers available.</div>
            )}
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default ContentProviders;
