import Head from "next/head";
import { useRouter } from "next/router";

import CardList from "@/components/molecules/CardList/CardList";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const Search = () => {
  const {
    query: { slugs },
  } = useRouter();
  const slugsArray = Array.isArray(slugs) ? slugs : [slugs];

  const endpoint = `/api/search/${slugsArray.join("/")}`;
  const { cards, isLoading, isError } = useInfiniteScroll(endpoint);
  return (
    <>
      <Head>
        <title>{`${slugsArray[1]?.toString().replace(/-/g, " ")} | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${slugsArray[1]}`} />
      </Head>
      <main>
        <section>
          {!isLoading && (
            <h1>
              {cards.length !== 0
                ? `Results found for '${slugsArray[1]?.toString().replace(/-/g, " ")}'`
                : `No Results found for '${slugsArray[1]?.toString().replace(/-/g, " ")}'`}
            </h1>
          )}
          <CardList cards={cards} isLoading={isLoading} isError={isError} />
        </section>
      </main>
    </>
  );
};

export default Search;
