import Link from "next/link";
import React from "react";

import styles from "../Nav/Nav.module.scss";

const Nav = () => {
  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>
            <Link href={"/series"}>
              <a aria-label="series">Series</a>
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link href={"/movies"}>
              <a aria-label="movies">Movies</a>
            </Link>
          </li>

          <li className={styles.navListItem}>
            <Link href={"/watch/movies"}>
              <a aria-label="what to watch">What to watch</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
