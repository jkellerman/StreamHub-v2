import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";

const Custom500 = () => {
  return (
    <>
      <Head>
        <title>500 - Server-side error occurred | Entertainment App</title>
      </Head>
      <main>
        <SearchBar all />
        <h1>500 - Server-side error occurred</h1>
      </main>
    </>
  );
};

export default Custom500;
