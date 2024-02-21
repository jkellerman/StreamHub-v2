import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/future/image";

import Logo from "@/components/Logo/Logo";
import { LOGO_URL_IMAGE } from "@/constants/tmdb";
import appletv from "@/public/assets/appletv.webp";
import disney from "@/public/assets/disney.webp";
import netflix from "@/public/assets/netflix.webp";
import primevideo from "@/public/assets/primevideo.webp";

import styles from "./ContentProviders.module.scss";
const LOGO_SIZE = 30;

interface ContentProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

interface ContentProvidersProps {
  contentProviders?: ContentProvider[];
  watchPage?: boolean;
}

const ContentProviders: React.FC<ContentProvidersProps> = ({ contentProviders, watchPage }) => {
  return (
    <>
      {watchPage ? (
        <div className={styles.logosWrapper}>
          <Logo logo="justWatch" />
          <Image
            src={netflix}
            alt="netflix logo"
            unoptimized={true}
            priority
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            className={styles.logo}
          />
          <Image
            src={disney}
            alt="disney logo"
            unoptimized={true}
            priority
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            className={styles.logo}
          />
          <Image
            src={primevideo}
            alt="amazon prime video logo"
            unoptimized={true}
            priority
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            className={styles.logo}
          />
          <Image
            src={appletv}
            alt="appletv logo"
            unoptimized={true}
            priority
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            className={styles.logo}
          />
          & more
        </div>
      ) : (
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
                  {contentProviders?.map((item, i) => (
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
      )}
    </>
  );
};

export default ContentProviders;
