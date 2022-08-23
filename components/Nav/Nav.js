import styles from "../Nav/Nav.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/logo.svg";
import icon from "../../public/assets/image-avatar.png";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a aria-label="home" className={styles.imageContainer}>
          <Image
            src={logo}
            alt="logo"
            layout="fill"
            objectFit="contain"
            priority="true"
          />
        </a>
      </Link>
      <div className={styles.navLinksContainer}>
        <Link href="/">
          <a
            className={
              router.pathname === "/"
                ? `${styles.active}`
                : `${styles.inactive}`
            }
            aria-label="home"
          >
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z" />
            </svg>
          </a>
        </Link>
        <Link href="/movies">
          <a
            className={
              router.pathname === "/movies"
                ? `${styles.active}`
                : `${styles.inactive}`
            }
            aria-label="movies"
          >
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z" />
            </svg>
          </a>
        </Link>
        <Link href="/series">
          <a
            className={
              router.pathname === "/series"
                ? `${styles.active}`
                : `${styles.inactive}`
            }
            aria-label="series"
          >
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z" />
            </svg>
          </a>
        </Link>
      </div>
      <div className={styles.iconContainer}>
        <Image
          src={icon}
          alt="icon"
          layout="fill"
          objectFit="contain"
          priority="true"
        />
      </div>
    </nav>
  );
};

export default Nav;
