import Link from "next/link";

import { useRegion } from "@/context/regionContext";

import styles from "./Main.module.scss";

const MainLogo = () => {
  const { region } = useRegion();
  return (
    <>
      <Link href={region === "US" ? "/US" : "/"}>
        <a aria-label="home" className={styles.logo}></a>
      </Link>
    </>
  );
};

export default MainLogo;
