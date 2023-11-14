import Head from "next/head";

import Button from "@/components/Buttons/Buttons";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Not Found | ReelHub</title>
      </Head>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(90deg, var(--quaternary-gradient))",
        }}
      >
        <h1 style={{ fontSize: "6rem", color: "var(--tertiary-light)", marginBottom: "2rem" }}>
          404
        </h1>
        <p style={{ marginBottom: "2rem", fontSize: "1.25rem" }}>
          Oops...looks like you&apos;ve taken a wrong turn.
        </p>
        <Button variant="primary" asLink link="/">
          Take me home
        </Button>
      </main>
    </>
  );
};

export default Custom404;
