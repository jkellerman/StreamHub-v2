import Head from "next/head";
import { useRouter } from "next/router";

import Button from "@/components/Buttons/Buttons";

const Custom500 = () => {
  const router = useRouter();

  const handleReload = () => {
    router.reload();
  };
  return (
    <>
      <Head>
        <title>500 - Server Error | StreamHub</title>
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
          500
        </h1>
        <p style={{ marginBottom: "2rem", fontSize: "1.25rem" }}>
          500: Server&apos;s having a moment. 😅 Our bad, we&apos;re on it!
        </p>
        <Button variant="primary" onClick={handleReload}>
          Try again
        </Button>
      </main>
    </>
  );
};

export default Custom500;
