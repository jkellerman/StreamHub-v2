import Head from "next/head";
import Search from "@/components/Search/Search";
import MediaType from "@/components/MediaType/MediaType";

const Series = () => {
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
        <MediaType type="series" endpoint="api/series" popular />
      </main>
    </>
  );
};

export default Series;
