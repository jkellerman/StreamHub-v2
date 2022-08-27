import Head from "next/head";
import Search from "@/components/Search/Search";
import Type from "@/components/Type/Type";

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
        <Type type="series" endpoint="api/series" />
      </main>
    </>
  );
};

export default series;
