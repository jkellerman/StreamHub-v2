import Image from "next/future/image";

import avatar from "@/public/assets/image-avatar.png";
import logo from "@/public/assets/logo.svg";

import NavIconButton from "../../atoms/NavIconButton/NavIconButton";
import styles from "../Nav/Nav.module.css";

const Nav = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Image
          src={logo}
          alt="logo"
          unoptimized={true}
          className={styles.logo}
        />

        <div className={styles.navLinksContainer}>
          <NavIconButton home />
          <NavIconButton movies />
          <NavIconButton series />
        </div>

        <Image
          src={avatar}
          alt="user avatar"
          unoptimized={true}
          className={styles.avatar}
        />
      </nav>
    </header>
  );
};

export default Nav;
