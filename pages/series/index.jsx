import Head from "next/head";
import QueryString from "qs";
import { useRouter } from "next/router";

import Dropdown from "@/components/Dropdown/Dropdown";
import SearchBar from "@/components/SearchBar/SearchBar";
import CardList from "@/components/CardList/CardList";

import { DEFAULT_SERIES_GENRE } from "@/constants/app";
import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";

const Series = ({ genreList }) => {
  const { query, pathname } = useRouter();
  const genre = genreList.find(({ name }) => name.toLowerCase() === query.genre) || DEFAULT_SERIES_GENRE;
  const isDefaultGenre = genre.name === DEFAULT_SERIES_GENRE.name;
  const endpoint = !isDefaultGenre ? `api/series/genre/${genre.id}` : "api/series/popular"
  const pageType = pathname.replace(/\//g, '')

  return (
    <>
      <Head>
        <title>Watch TV series Online | Reelgood</title>
        <meta
          name="description"
          content="Find out where to watch TV shows from Netflix, Amazon Prime, Disney+ and many more services."
        />
      </Head>
      <main>
        <SearchBar series />
        <section>
          <Dropdown 
            type={pageType}
            selectedGenre={genre}
            genreList={genreList}
          />
          <h1>{pageType}</h1>
          <CardList
            endpoint={endpoint}
          />
        </section>
      </main>
    </>
  );
};

export default Series;

export async function getStaticProps() {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/tv/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList: [
        DEFAULT_SERIES_GENRE,
        ...genreList.genres
      ],
    },
  };
}
