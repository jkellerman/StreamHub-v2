import Head from "next/head";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import { useRouter } from "next/router";
import CardList from "@/components/molecules/CardList/CardList";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import styles from "@/components/organisms/MediaCategoriesHomePage/MediaCategoriesHomePage.module.css";

const Search = () => {
  const {
    query: { id },
  } = useRouter();
  const endpoint = `/api/search/all/${id}`;
  const { cards, isLoading } = useInfiniteScroll(endpoint);
  return (
    <>
      <Head>
        <title>{`${id} | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${id}`} />
      </Head>
      <main>
        <SearchBar all />
        <section>
          {!isLoading && (
            <h1 className={styles.heading}>
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

export default Search;
