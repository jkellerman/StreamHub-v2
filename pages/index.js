import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import Categories from "@/components/Categories/Categories";

export default function Home() {
  return (
    <>
      <Head>
        <title>Entertainment | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="Entertainment allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <SearchBar all />
        <Categories />
      </main>
    </>
  );
}
