import Link from "next/link";
import { useEffect, useState } from "react";

import Nav from "@/components/atoms/Nav/Nav";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";

import styles from "../Header/Header.module.scss";

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollYPosition = window.scrollY;
      setPrevScrollY(currentScrollYPosition);
      if (currentScrollYPosition === 0) {
        setIsVisible(null);
      } else if (currentScrollYPosition > prevScrollY) {
        setIsVisible(false);
      } else if (currentScrollYPosition < prevScrollY) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [prevScrollY]);
  return (
    <header
      className={isVisible === null ? styles.header : isVisible ? styles.visible : styles.hidden}
    >
      <div className={styles.container}>
        <Link href={"/"}>
          <a aria-label="Go to home page" className={styles.logo}>
            ReelBuddy
          </a>
        </Link>

        <SearchBar />
        <div className={styles.loginContainer}>
          <span className={styles.loginButton}>Login</span>
          <span className={styles.separator}> | </span>
          <span className={styles.signupButton}>Signup</span>
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
