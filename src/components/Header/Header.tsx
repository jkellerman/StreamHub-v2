import { useEffect, useState } from "react";

import Nav from "@/components/Nav/Nav";
import Search from "@/components/Search/Search";

import styles from "../Header/Header.module.scss";
import Icon from "../Icon/Icon";
import MainLogo from "../Logo/Main/Main";

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  const [prevScrollY, setPrevScrollY] = useState(0);
  const scrollThreshold = 250;

  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollYPosition = window.scrollY;
      setPrevScrollY(currentScrollYPosition);
      if (currentScrollYPosition === 0) {
        setIsVisible(null);
      } else if (
        currentScrollYPosition > prevScrollY &&
        currentScrollYPosition >= scrollThreshold
      ) {
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
        <MainLogo />

        <Search />
        <div className={styles.loginContainer}>
          <Icon icon="user" />
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
