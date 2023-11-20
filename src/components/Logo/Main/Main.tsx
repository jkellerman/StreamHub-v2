import Link from "next/link";

import styles from "./Main.module.scss";
const MainLogo = () => {
  return (
    <>
      <Link href={"/"}>
        <a aria-label="home" className={styles.logo}></a>
      </Link>
    </>
  );
};

export default MainLogo;
