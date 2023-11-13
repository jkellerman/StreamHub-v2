import Link from "next/link";

import styles from "./Main.module.scss";
const MainLogo = () => {
  return (
    <>
      <Link href={"/"}>
        <a aria-label="Go to home page" className={styles.logo}>
          ReelHub
        </a>
      </Link>
    </>
  );
};

export default MainLogo;
