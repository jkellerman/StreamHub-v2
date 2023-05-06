import Head from "next/head";

import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import MediaCategory from "@/components/organisms/MediaCategory/MediaCategory";

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
        <SearchBar series />
        <MediaCategory
          endpoint="/api/series/top_rated"
          category="top rated shows"
          type="series"
        />
      </main>
    </>
  );
};

export default TopRatedShows;
