import Head from "next/head";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Not Found | Entertainment App</title>
      </Head>
      <main>
        <SearchBar all />
        <h1>404 - Page Not Found</h1>
        <Link href="/" passHref>
          <button
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
            Go home
          </button>
        </Link>
      </main>
    </>
  );
};

export default Custom404;
