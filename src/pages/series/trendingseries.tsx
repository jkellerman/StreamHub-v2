import Head from "next/head";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import MediaCategory from "@/components/organisms/MediaCategory/MediaCategory";

const TrendingSeries = () => {
  return (
    <>
      <Head>
        <title>Trending | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="StreamHub allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <SearchBar series />
        <MediaCategory
          endpoint="/api/trending/tv/week"
          category="trending series"
          type="series"
        />
      </main>
    </>
  );
};

export default TrendingSeries;
