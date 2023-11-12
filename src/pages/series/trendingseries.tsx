import Head from "next/head";

import MediaCategory from "@/components/MediaCategory/MediaCategory";

const TrendingSeries = () => {
  return (
    <>
      <Head>
        <title>Trending | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="ReelHub allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <MediaCategory endpoint="/api/trending/all/week" category="trending series" type="series" />
      </main>
    </>
  );
};

export default TrendingSeries;
