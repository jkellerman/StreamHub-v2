import styles from "../Nav/Nav.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import avatar from "@/public/assets/image-avatar.png";
import PathHome from "./PathHome";
import PathMovies from "./PathMovies";
import PathSeries from "./PathSeries";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a aria-label="home" className={styles.imageContainer}>
          <Image src={logo} alt="logo" layout="fill" objectFit="contain" />
        </a>
      </Link>
      <div className={styles.navLinksContainer}>
        <PathHome />
        <PathMovies />
        <PathSeries />
      </div>
      <div className={styles.avatarContainer}>
        <Image
          src={avatar}
          alt="user avatar"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </nav>
  );
};

export default Nav;
