import Image from "next/future/image";
import attribution from "@/public/assets/attribution.svg";
import styles from "../TmdbLogo/TmdbLogo.module.css";

const TmdbLogo = () => {
  return (
    <>
      {" "}
      <div>
        <div className={styles.imageContainer}>
          <Image
            src={attribution}
            alt="MovieDB Logo"
            unoptimized={true}
            width={72}
            height={16}
            priority={true}
          />
        </div>
      </div>
    </>
  );
};

export default TmdbLogo;
