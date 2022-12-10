import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import MediaType from "@/components/MediaType/MediaType";

const Movies = ({ genreList }) => {
  return (
    <>
      <Head>
        <title>Watch Movies Online | Reelgood</title>
        <meta
          name="description"
          content="Find out where to watch movies from Netflix, Amazon Prime, Disney+ and many more services"
        />
      </Head>
      <main>
        <SearchBar movies />
        <MediaType
          type="movies"
          endpoint="api/movies"
          popular
          movieGenreList={genreList}
        />
      </main>
    </>
  );
};

export default Movies;

export async function getStaticProps() {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-GB`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList,
    },
  };
}
