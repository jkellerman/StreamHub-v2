import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import CategoryResults from "@/components/CategoryResults/CategoryResults";

const UpcomingMovies = () => {
  return (
    <>
      <Head>
        <title>Upcoming Movies | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="Reelgood allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <SearchBar all />
        <CategoryResults
          endpoint="/api/movies/upcoming"
          category="upcoming movies"
          type="movies"
        />
      </main>
    </>
  );
};

export default UpcomingMovies;
