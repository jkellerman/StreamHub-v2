import Head from "next/head";
import Search from "@/components/Search/Search";
import Series from "@/components/Series/Series";

const series = () => {
  return (
    <>
      <Head>
        <title>Series | Entertainment</title>
        <meta
          name="description"
          content="Stream now for access to the best series"
        />
      </Head>
      <main>
        <Search series />
        <Series />
      </main>
    </>
  );
};

export default series;
