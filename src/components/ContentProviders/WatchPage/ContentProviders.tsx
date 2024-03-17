import Image from "next/future/image";

import Logo from "@/components/Logo/Logo";
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

const ContentProviders: React.FC<ContentProvidersProps> = () => {
  return (
    <>
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
    </>
  );
};

export default ContentProviders;
