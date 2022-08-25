import Head from "next/head";
import Search from "@/components/Search/Search";
import Trending from "@/components/Categories/Trending/Trending";
import PopularShows from "@/components/Categories/PopularShows/PopularShows";

export default function Home() {
  return (
    <>
      <Head>
        <title>Entertainment | Trending Movies and Series</title>
        <meta name="description" content="New movies and series" />
      </Head>
      <main>
        <Search all />
        <Trending />
        <PopularShows />
      </main>
    </>
  );
}
