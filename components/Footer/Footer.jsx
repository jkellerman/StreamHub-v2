import Image from "next/future/image";
import attribution from "@/public/attribution.svg";
import styles from "../Footer/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.span}>Powered by</span>
        <div className={styles.logo}>
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
      </a>
      <div className={styles.attribution}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
    </footer>
  );
};

export default Footer;
