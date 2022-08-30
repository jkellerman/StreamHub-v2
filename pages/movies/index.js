import Head from "next/head";
import Search from "@/components/Search/Search";
import MediaType from "@/components/MediaType/MediaType";
import Dropdown from "@/components/Dropdown/Dropdown";

const movies = () => {
  return (
    <>
      <Head>
        <title>Movies | Entertainment</title>
        <meta
          name="description"
          content="Stream now for access to the best movies"
        />
      </Head>
      <main>
        <Search movies />
        <Dropdown />
        <MediaType type="movies" endpoint="api/movies" />
      </main>
    </>
  );
};

export default movies;
