import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import Trending from "@/components/Trending/Trending";
import Category from "@/components/Category/Category";
import { useState } from "react";
import Categories from "@/components/Categories/Categories";

export default function Home() {
  return (
    <>
      <Head>
        <title>Entertainment | Trending Movies and Series</title>
        <meta name="description" content="New movies and series" />
      </Head>
      <main>
        <SearchBar all />
        <Categories />
      </main>
    </>
  );
}
