import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import SearchResults from "@/components/SearchResults/SearchResults";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>{`${id} | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${id}`} />
      </Head>
      <main>
        <SearchBar all />
        <SearchResults all endpoint={`/api/search/all/${id}`} />
      </main>
    </>
  );
};

export default Search;
