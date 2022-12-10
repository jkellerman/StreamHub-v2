import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useRouter } from "next/router";
import styles from "@/components/DropdownButton/DropdownButton.module.css";

const Custom500 = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>500 - Server-side error occurred | Reelgood</title>
      </Head>
      <main>
        <SearchBar all />
        <h1>Currently unavailable</h1>
        <button
          onClick={() => router.back()}
          className={styles.button}
          style={{ marginLeft: "1rem" }}
        >
          Go back
        </button>
      </main>
    </>
  );
};

export default Custom500;
