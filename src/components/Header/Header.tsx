import { LazyMotion, domAnimation, m } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import Nav from "@/components/Nav/Nav";
import { enterY } from "@/utils/animations";

import styles from "../Header/Header.module.scss";
import Icon from "../Icon/Icon";
import MainLogo from "../Logo/Main/Main";

const Search = dynamic(() => import("@/components/Search/Search"));

interface HeaderProps {
  animate?: boolean;
}

const Header: React.FC<HeaderProps> = ({ animate }) => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  const [prevScrollY, setPrevScrollY] = useState(0);
  const scrollThreshold = 50;

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
      {animate ? (
        <LazyMotion features={domAnimation}>
          <m.div className={styles.container} variants={enterY} initial="hidden" animate="visible">
            <div className={styles.logoContainer}>
              <MainLogo />
              <Icon icon="user" />
            </div>
            <Nav />

            <Search />
            <div className={styles.loginContainer}>
              <div className={styles.userIconWrapper}>
                <Icon icon="user" />
              </div>
            </div>
          </m.div>
        </LazyMotion>
      ) : (
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <MainLogo />
            <Icon icon="user" />
          </div>
          <Nav />

          <Search />
          <div className={styles.loginContainer}>
            <div className={styles.userIconWrapper}>
              <Icon icon="user" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
