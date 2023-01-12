import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import SearchResults from "@/components/SearchResults/SearchResults";
import { useRouter } from "next/router";

const MoviesSearch = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>{`${id} | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${id}`} />
      </Head>
      <main>
        <SearchBar movies />
        <SearchResults movies endpoint={`/api/search/movies/${id}`} />
      </main>
    </>
  );
};

export default MoviesSearch;
