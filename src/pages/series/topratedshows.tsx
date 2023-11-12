import Head from "next/head";

import MediaCategory from "@/components/MediaCategory/MediaCategory";

const TopRatedShows = () => {
  return (
    <>
      <Head>
        <title>Top Rated Shows | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="ReelHub allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <MediaCategory
          endpoint="/api/media/movie/upcoming"
          category="top rated shows"
          type="series"
        />
      </main>
    </>
  );
};

export default TopRatedShows;
