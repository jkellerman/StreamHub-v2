import Head from "next/head";
import Search from "@/components/Search/Search";
import MediaType from "@/components/MediaType/MediaType";
import Dropdown from "@/components/Dropdown/Dropdown";

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
        <Dropdown />
        <MediaType type="series" endpoint="api/series" />
      </main>
    </>
  );
};

export default series;
