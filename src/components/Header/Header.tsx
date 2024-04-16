import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import Nav from "@/components/Nav/Nav";

import styles from "../Header/Header.module.scss";
import Icon from "../Icon/Icon";
import MainLogo from "../Logo/Main/Main";

const Search = dynamic(() => import("@/components/Search/Search"));

interface HeaderProps {
  animate?: boolean;
}

const Header: React.FC<HeaderProps> = ({ animate }) => {
  const [isVisible, setIsVisible] = useState<boolean | null>(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);

  const scrollThreshold = 250;

  useEffect(() => {
    const handleScrollEvent = () => {
      const currentScrollYPosition = window.scrollY;
      setPrevScrollY(currentScrollYPosition);
      if (currentScrollYPosition === 0) {
        setIsAtStart(true);
      }
      if (currentScrollYPosition > prevScrollY && currentScrollYPosition > scrollThreshold) {
        setIsVisible(false);
        setIsAtStart(false);
      }

      if (currentScrollYPosition < prevScrollY) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [prevScrollY, isVisible]);
  return (
    <>
      <header className={isAtStart ? styles.header : isVisible ? styles.visible : styles.hidden}>
        {animate ? (
          <div className={`${styles.container} ${styles.animate}`}>
            <div className={styles.mobileContainer}>
              <MainLogo />
              <Search />
              <Icon icon="user" width="20" height="20" />
            </div>
            <div className={styles.navContainer}>
              <Nav />
            </div>
            <div className={styles.mainContainer}>
              <MainLogo />
              <div className={styles.innerContainer}>
                <Nav />
                <Search />
                <div className={styles.loginContainer}>
                  <Icon icon="user" width="20" height="20" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.mobileContainer}>
              <MainLogo />
              <Search />
              <Icon icon="user" width="20" height="20" />
            </div>
            <div className={styles.navContainer}>
              <Nav />
            </div>
            <div className={styles.mainContainer}>
              <MainLogo />
              <div className={styles.innerContainer}>
                <Nav />
                <Search />
                <div className={styles.loginContainer}>
                  <Icon icon="user" width="20" height="20" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
