import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import CardList from "@/components/CardList/CardList";
import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import QueryString from "qs";
import { useRouter } from "next/router";
import Dropdown from "@/components/Dropdown/Dropdown";
import { DEFAULT_MOVIES_GENRE } from "@/constants/app";

const Movies = ({ genreList }) => {
  const { query, pathname } = useRouter();
  const genre = genreList.find(({ name }) => name.toLowerCase() === query.genre) || DEFAULT_MOVIES_GENRE;
  const isDefaultGenre = genre.name === DEFAULT_MOVIES_GENRE.name;
  const endpoint = !isDefaultGenre ? `api/movies/genre/${genre.id}` : "api/movies/popular"
  const pageType = pathname.replace(/\//g, '')

  return (
    <>
      <Head>
        <title>{`Watch ${genre.name} Movies Online | Reelgood`}</title>
        <meta
          name="description"
          content="Find out where to watch movies from Netflix, Amazon Prime, Disney+ and many more services"
        />
      </Head>
      <main>
        <SearchBar movies />
        <section>
          <Dropdown
            type={pageType}
            selectedGenre={genre}
            genreList={genreList}
          />
          <h1>{pageType}</h1>
          <CardList
            endpoint={endpoint}
            movieGenreList={genreList}
          />
        </section>
      </main>
    </>
  );
};

export default Movies;

export async function getServerSideProps() {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/movie/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList: [
        DEFAULT_MOVIES_GENRE,
        ...genreList.genres
      ]
    },
  };
}
