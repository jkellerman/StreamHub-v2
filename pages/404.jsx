import Head from "next/head";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div>
      <Head>
        <title>404 - Not Found | Entertainment App</title>
      </Head>
      <main>
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
            }}
          >
            Go home
          </button>
        </Link>
      </main>
    </div>
  );
};

export default Custom404;
