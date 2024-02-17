import Head from "next/head";

import Button from "@/components/Buttons/Buttons";
import Content from "@/components/Content/Content";
import Heading from "@/components/Heading/Heading";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Not Found | StreamHub</title>
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
          404
        </Heading>
        <Content>Oops...looks like you&apos;ve taken a wrong turn. 😅</Content>
        <Button variant="primary" asLink link="/">
          Take me home
        </Button>
      </main>
    </>
  );
};

export default Custom404;
