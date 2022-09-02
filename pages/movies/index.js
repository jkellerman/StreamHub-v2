import Head from "next/head";
import Search from "@/components/Search/Search";
import MediaType from "@/components/MediaType/MediaType";

const Movies = ({ genreList }) => {
  return (
    <>
      <Head>
        <title>Movies | Entertainment</title>
        <meta
          name="description"
          content="Stream now for access to the best movies"
        />
      </Head>
      <main>
        <Search movies />
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
