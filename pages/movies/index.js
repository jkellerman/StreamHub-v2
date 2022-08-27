import Head from "next/head";
import Search from "@/components/Search/Search";
import Type from "@/components/Type/Type";

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
        <Type type="movies" endpoint="api/movies" />
      </main>
    </>
  );
};

export default movies;
