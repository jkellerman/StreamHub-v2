import Head from "next/head";
import styles from "@/components/organisms/MediaCategoryHomePage/MediaCategoryHomePage.module.css";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import { useRouter } from "next/router";
import CardList from "@/components/molecules/CardList/CardList";
import useInfiniteScroll from "hooks/useInfiniteScroll";

const SearchMovies = () => {
  const {
    query: { id },
  } = useRouter();
  const endpoint = `/api/search/movies/${id}`;
  const { cards, isLoading } = useInfiniteScroll(endpoint);
  return (
    <>
      <Head>
        <title>{`${id?.toString().replace(/-/g, " ")} | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${id}`} />
      </Head>
      <main>
        <SearchBar movies />
        <section>
          {!isLoading && (
            <h1 className={styles.heading}>
              {cards.length !== 0
                ? `Results found for '${id?.toString().replace(/-/g, " ")}'`
                : `No Results found for '${id?.toString().replace(/-/g, " ")}'`}
            </h1>
          )}
          <CardList cards={cards} isLoading={isLoading} />
        </section>
      </main>
    </>
  );
};

export default SearchMovies;
