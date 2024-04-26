import Image from "next/future/image";

import Logo from "@/components/Logo/Logo";
import appletv from "@/public/assets/appletv.webp";
import disney from "@/public/assets/disney.webp";
import netflix from "@/public/assets/netflix.webp";
import primevideo from "@/public/assets/primevideo.webp";

import styles from "./ContentProviders.module.scss";
const LOGO_SIZE = 30;

const providers = [netflix, disney, primevideo, appletv];

const ContentProviders: React.FC = () => {
  return (
    <>
      <div className={styles.logosWrapper}>
        <Logo logo="justWatch" />
        {providers.map((item, i) => (
          <Image
            key={i}
            src={item}
            alt="netflix logo"
            unoptimized={true}
            priority
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            className={styles.logo}
          />
        ))}
        & more
      </div>
    </>
  );
};

export default ContentProviders;
