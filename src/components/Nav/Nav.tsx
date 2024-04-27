import Link from "next/link";
import React from "react";

import styles from "../Nav/Nav.module.scss";

const navListData = [
  { name: "Series", link: "/series" },
  { name: "Movies", link: "/movies" },
  { name: "Generator", link: "/generator/series" },
];

const Nav = () => {
  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navListData.map((item, index) => (
            <li key={index} className={styles.navListItem}>
              <Link href={item.link}>
                <a aria-label={item.name}>{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
