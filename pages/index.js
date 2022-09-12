import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import Trending from "@/components/Trending/Trending";
import Category from "@/components/Category/Category";

export default function Home() {
  return (
    <>
      <Head>
        <title>Entertainment | Trending Movies and Series</title>
        <meta name="description" content="New movies and series" />
      </Head>
      <main>
        <SearchBar all />
        <Trending />
        <Category
          endpoint="api/series/popular-shows"
          category="popular shows"
        />
        <Category
          endpoint="api/movies/upcoming-movies"
          category="upcoming movies"
        />
        <Category
          endpoint="api/movies/top-rated-movies"
          category=" top rated movies"
        />
        <Category endpoint="api/series/on-the-air" category="on the air" />
      </main>
    </>
  );
}
