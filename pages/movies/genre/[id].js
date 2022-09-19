import { useRouter } from "next/router";
import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import Genre from "@/components/Genre/Genre";

const MovieGenre = ({ genreList }) => {
  const router = useRouter();
  const { id } = router.query;
  const genre = genreList.genres.find((genre) => genre.id.toString() === id);
  const { name } = genre;

  return (
    <>
      <Head>
        <title>{`Watch ${name} online | Entertainment`}</title>
        <meta
          name="description"
          content={`Search and discover the best ${name} movies from Netflix, Amazon Prime, Disney+ and many more services.`}
        />
      </Head>
      <main>
        <SearchBar movies />
        <Genre
          type="movies"
          endpoint={`/api/movies/genre/${id}`}
          name={name}
          movieGenreList={genreList}
        />
      </main>
    </>
  );
};

export default MovieGenre;

export async function getStaticPaths() {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-GB`
  );
  const data = await response.json();
  const paths = data.genres.map((genre) => {
    return {
      params: {
        id: `${genre.id}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-GB&sort_by=popularity.desc&page=1&with_genres=${id}`
  );
  const genrePage = await response.json();

  const response2 = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-GB`
  );
  const genreList = await response2.json();

  return {
    props: {
      genrePage,
      genreList,
    },
  };
}
