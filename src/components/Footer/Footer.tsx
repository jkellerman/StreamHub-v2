import Link from "next/link";

import styles from "../Footer/Footer.module.scss";
import Icon from "../Icon/Icon";
import MainLogo from "../Logo/Main/Main";
import TmdbLogo from "../Logo/Tmdb/TmdbLogo";

const footerData = [
  {
    title: "What to watch",
    links: [
      { name: "Get a random pick", link: "/generator/series" },
      { name: "Browse Series", link: "/series" },
      { name: "Browse Movies", link: "/movies" },
    ],
  },

  {
    title: "Series",
    links: [
      { name: "Shows on Netflix", link: "/series/network/netflix" },
      { name: "Shows on Disney+", link: "/series/network/disney+" },
      { name: "Shows on Prime Video", link: "/series/network/amazon-prime-video" },
    ],
  },
  {
    title: "Movies",
    links: [
      { name: "Movies on Netflix", link: "/movies/network/netflix" },
      { name: "Movies on Disney+", link: "/movies/network/disney+" },
      { name: "Movies on Prime Video", link: "/movies/network/amazon-prime-video" },
    ],
  },
];

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smooth scrolling
    });
  };
  return (
    <footer className={styles.footer}>
      <button className={styles.btt} onClick={scrollToTop} aria-label="back-to-top">
        <Icon icon="arrowUp" />
      </button>
      <div className={styles.footerContainer}>
        <div className={styles.footerInnerContainer}>
          <Nav />
          <Attribution />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;

const Nav: React.FC = () => {
  return (
    <div className={styles.navContainer}>
      {footerData.map((group, index) => (
        <div key={index}>
          <div className={styles.groupTitle}>{group.title}</div>
          <ul className={styles.group}>
            {group.links.map((link, linkIndex) => (
              <li key={linkIndex} className={styles.listItem}>
                <Link href={link.link}>
                  <a>{link.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const Attribution: React.FC = () => {
  return (
    <div className={styles.attributionContainer}>
      <div className={styles.groupTitle}>TMDB</div>

      <div className={styles.attribution}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>

      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="tmdb"
      >
        <TmdbLogo />
      </a>
    </div>
  );
};

const FooterBottom: React.FC = () => {
  return (
    <div className={styles.footerBottomContainer}>
      <MainLogo />
      <span className={styles.disclaimer}>Personal Project, Developed by Josh Kellerman</span>
    </div>
  );
};
