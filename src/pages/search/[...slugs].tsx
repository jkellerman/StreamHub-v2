import Head from "next/head";
import { useRouter } from "next/router";

import CardList from "@/components/CardList/CardList";
import styles from "@/components/CardList/CardList.module.scss";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const Search = () => {
  const {
    query: { slugs },
  } = useRouter();
  const slugsArray = Array.isArray(slugs) ? slugs : [slugs];

  const endpoint = `/api/search/${slugsArray.join("/")}`;
  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteScroll(endpoint);
  return (
    <>
      <Head>
        <title>{`${slugsArray[1]?.toString().replace(/-/g, " ")} | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${slugsArray[1]}`} />
      </Head>
      <main>
        <section>
          {!isLoading && (
            <h1 className={styles.header}>
              {cards.length !== 0
                ? `Results found for '${slugsArray[1]?.toString().replace(/-/g, " ")}'`
                : `No Results found for '${slugsArray[1]?.toString().replace(/-/g, " ")}'`}
            </h1>
          )}
          <CardList
            cards={cards}
            isLoading={isLoading}
            isError={isError}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </section>
      </main>
    </>
  );
};

export default Search;
