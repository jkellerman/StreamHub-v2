import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import SearchResults from "@/components/SearchResults/SearchResults";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const { query } = router.query;
  return (
    <>
      <Head>
        <title>{`${query} | Entertainment`}</title>
        <meta name="description" content={`Where to watch ${query}`} />
      </Head>
      <main>
        <SearchBar all />
        <SearchResults all endpoint={`/api/search/all/${query}`} />
      </main>
    </>
  );
};

export default Search;
