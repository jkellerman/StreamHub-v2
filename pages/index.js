import Head from "next/head";
import Search from "@/components/Search/Search";
import Trending from "@/components/Categories/Trending/Trending";
import PopularShows from "@/components/Categories/PopularShows/PopularShows";
import UpcomingMovies from "@/components/Categories/UpcomingMovies/UpcomingMovies";
import TopRatedMovies from "@/components/Categories/TopRatedMovies/TopRatedMovies";
import OnTheAir from "@/components/Categories/OnTheAir.js/OnTheAir";

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
        <UpcomingMovies />
        <TopRatedMovies />
        <OnTheAir />
      </main>
    </>
  );
}
