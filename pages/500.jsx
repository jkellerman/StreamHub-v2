import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useRouter } from "next/router";

const Custom500 = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>500 - Server-side error occurred | Entertainment App</title>
      </Head>
      <main>
        <SearchBar all />
        <h1>Currently unavailable</h1>
        <button
          onClick={() => router.back()}
          style={{
            background: "var(--Greyish-blue)",
            color: "white",
            border: "1px solid var(--Greyish-blue)",
            borderRadius: "20px",
            textTransform: "capitalize",
            fontSize: "inherit",
            marginLeft: "1rem",
            padding: "0.5em 1.25em",
            cursor: "pointer",
          }}
        >
          Go back
        </button>
      </main>
    </>
  );
};

export default Custom500;
