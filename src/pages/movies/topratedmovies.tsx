import Head from "next/head";

import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import MediaCategory from "@/components/organisms/MediaCategory/MediaCategory";

const TopRatedMovies = () => {
  return (
    <>
      <Head>
        <title>Top Rated Movies | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="Reelgood allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <SearchBar movies />
        <MediaCategory
          endpoint="/api/movies/top_rated"
          category="top rated movies"
          type="movies"
        />
      </main>
    </>
  );
};

export default TopRatedMovies;
