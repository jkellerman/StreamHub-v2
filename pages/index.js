import Head from "next/head";
import styles from "../styles/Home.module.css";
import Search from "../components/Search/Search";
import TrendingMovies from "../components/categories/Trending/TrendingCards";

export default function Home() {
  return (
    <>
      <Head>
        <title>Entertainment | New Movies and TV series</title>
        <meta name="description" content="New movies and series" />
      </Head>
      <main>
        <Search all />
        <TrendingMovies />
      </main>
    </>
  );
}
