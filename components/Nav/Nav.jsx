import styles from "../Nav/Nav.module.css";
import Link from "next/link";
import Image from "next/future/image";
import logo from "@/public/assets/logo.svg";
import avatar from "@/public/assets/image-avatar.png";
import PathHome from "./PathHome";
import PathMovies from "./PathMovies";
import PathSeries from "./PathSeries";

const Nav = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <a aria-label="go home">
            <Image
              src={logo}
              alt="logo"
              unoptimized={true}
              className={styles.logo}
              priority={true}
            />
          </a>
        </Link>
        <div className={styles.navLinksContainer}>
          <PathHome />
          <PathMovies />
          <PathSeries />
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
