import Head from "next/head";
import Search from "../components/Search/Search";

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
      </main>
    </>
  );
};

export default movies;
