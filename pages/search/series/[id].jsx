import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useRouter } from "next/router";
import CardList from "@/components/CardList/CardList";
import useInfiniteScroll from "hooks/useInfiniteScroll";

const SearchSeries = () => {
  const {
    query: { id },
  } = useRouter();
  const endpoint = `/api/search/series/${id}`;
  const { cards, isLoading } = useInfiniteScroll(endpoint);
  return (
    <>
      <Head>
        <title>{`${id} | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${id}`} />
      </Head>
      <main>
        <SearchBar series />
        <section>
          {!isLoading && (
            <h1>
              {cards.length !== 0
                ? `Results found for '${id.replace(/-/g, " ")}'`
                : `No Results found for '${id.replace(/-/g, " ")}'`}
            </h1>
          )}
          <CardList cards={cards} isLoading={isLoading} />
        </section>
      </main>
    </>
  );
};

export default SearchSeries;
