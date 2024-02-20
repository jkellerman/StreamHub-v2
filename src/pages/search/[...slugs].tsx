import Head from "next/head";
import { useRouter } from "next/router";

import CTA from "@/components/CallToActionSection/CallToActionSection";
import CardList from "@/components/CardList/CardList";
import styles from "@/components/CardList/CardList.module.scss";
import Header from "@/components/Header/Header";
import Heading from "@/components/Heading/Heading";
import usePagination from "@/hooks/usePagination";

const Search = () => {
  const {
    query: { slugs },
  } = useRouter();
  const slugsArray = Array.isArray(slugs) ? slugs : [slugs];

  const endpoint = `/api/search/${slugsArray.join("/")}`;
  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    usePagination(endpoint);
  return (
    <>
      <Head>
        <title>{`${slugsArray[1]?.toString().replace(/-/g, " ")} | StreamHub`}</title>
        <meta name="description" content={`Where to watch ${slugsArray[1]}`} />
      </Head>
      <Header />
      <main>
        <section>
          {!isLoading && (
            <div className={styles.header}>
              <Heading as="h1" size="xs">
                {cards.length !== 0 &&
                  `Movies and TV series with '${slugsArray[1]?.toString().replace(/-/g, " ")}'`}
              </Heading>
            </div>
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
        <CTA />
      </main>
    </>
  );
};

export default Search;
