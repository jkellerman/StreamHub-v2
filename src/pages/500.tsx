import Head from "next/head";
import { useRouter } from "next/router";

import Button from "@/components/Buttons/Buttons";
import Content from "@/components/Content/Content";
import Heading from "@/components/Heading/Heading";

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
          fontWeight: "600",
        }}
      >
        <Heading as="h1" size="xxl">
          500
        </Heading>
        <Content>500: Server&apos;s having a moment. 😅 Our bad, we&apos;re on it!</Content>
        <Button variant="primary" onClick={handleReload}>
          Try again
        </Button>
      </main>
    </>
  );
};

export default Custom500;
