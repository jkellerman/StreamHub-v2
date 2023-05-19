import TmdbLogo from "@/components/atoms/Logo/Tmdb/TmdbLogo";

import styles from "../Footer/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
        <span className={styles.span}>Powered by</span>
        <TmdbLogo />
      </a>
      <div className={styles.attribution}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
    </footer>
  );
};

export default Footer;
