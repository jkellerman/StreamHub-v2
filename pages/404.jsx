import Head from "next/head";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "@/components/DropdownButton/DropdownButton.module.css";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Not Found | Reelgood</title>
      </Head>
      <main>
        <SearchBar all />
        <h1>404 - Page Not Found</h1>
        <Link href="/" passHref>
          <button className={styles.button} style={{ marginLeft: "1rem" }}>
            Go home
          </button>
        </Link>
      </main>
    </>
  );
};

export default Custom404;
