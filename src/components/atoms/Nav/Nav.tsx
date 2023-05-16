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
              <a aria-label="Go to TV shows page">TV Series</a>
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link href={"/movies"}>
              <a aria-label="go to movies page">Movies</a>
            </Link>
          </li>
          <span className={styles.separator}>|</span>
          <li className={styles.navListItem}>
            <Link href={"/"}>
              <a aria-label="go to movies page">Roulette</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
