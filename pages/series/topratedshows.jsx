import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import CategoryResults from "@/components/CategoryResults/CategoryResults";

const TopRatedShows = () => {
  return (
    <>
      <Head>
        <title>Top Rated Shows | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="Reelgood allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <SearchBar all />
        <CategoryResults
          endpoint="/api/series/top_rated"
          category="top rated shows"
          type="series"
        />
      </main>
    </>
  );
};

export default TopRatedShows;
