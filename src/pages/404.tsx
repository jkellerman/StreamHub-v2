import Head from "next/head";
import Link from "next/link";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Not Found | ReelHub</title>
      </Head>
      <main>
        <h1>404 - Page Not Found</h1>
        <Link href="/" passHref>
          <a style={{ marginLeft: "1rem" }}>Go home</a>
        </Link>
      </main>
    </>
  );
};

export default Custom404;
