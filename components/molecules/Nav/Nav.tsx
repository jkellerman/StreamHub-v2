import styles from "../Nav/Nav.module.css";

import Image from "next/future/image";
import logo from "@/public/assets/logo.svg";
import avatar from "@/public/assets/image-avatar.png";
import NavIconButton from "../../atoms/NavIconButton/NavIconButton";

const Nav = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Image
          src={logo}
          alt="logo"
          unoptimized={true}
          className={styles.logo}
          priority={true}
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
          priority={true}
        />
      </nav>
    </header>
  );
};

export default Nav;
