import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useRouter } from "next/router";
import CardList from "@/components/CardList/CardList";
import useInfiniteScroll from "hooks/useInfiniteScroll";

const Search = () => {
  const {
    query: { query },
  } = useRouter();
  const endpoint = `/api/search/all/${query}`;
  const { cards, isLoading } = useInfiniteScroll(endpoint);
  return (
    <>
      <Head>
        <title>{`${query} | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${query}`} />
      </Head>
      <main>
        <SearchBar all />
        <section>
          {!isLoading && (
            <h1>
              {cards.length !== 0
                ? `Results found for '${query.replace(/-/g, " ")}'`
                : `No Results found for '${query.replace(/-/g, " ")}'`}
            </h1>
          )}
          <CardList cards={cards} isLoading={isLoading} />
        </section>
      </main>
    </>
  );
};

export default Search;
