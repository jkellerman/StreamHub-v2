import Image from "next/future/image";
import img from "@/public/assets/justwatch.svg";
import styles from "../../atoms/JustWatchLogo/JustWatchLogo.module.css";

interface JustWatchLogoProps {
  tab?: boolean;
}

const JustWatchLogo: React.FC<JustWatchLogoProps> = ({ tab }) => {
  return (
    <>
      <div className={tab ? styles.justWatchLogoContainer : undefined}>
        <Image
          src={img}
          alt="just watch logo"
          unoptimized={true}
          width={100}
          height={50}
          className={tab ? styles.logo : undefined}
        />
      </div>
    </>
  );
};

export default JustWatchLogo;
