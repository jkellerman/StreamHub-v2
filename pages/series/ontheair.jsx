import Head from "next/head";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import CategoryResults from "@/components/organisms/MediaCategory/MediaCategory";

const OnTheAir = () => {
  return (
    <>
      <Head>
        <title>On The Air | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="Reelgood allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <SearchBar series />
        <CategoryResults
          endpoint="/api/series/on_the_air"
          category="on the air"
          type="series"
        />
      </main>
    </>
  );
};

export default OnTheAir;
