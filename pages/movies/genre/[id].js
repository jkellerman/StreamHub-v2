import { useRouter } from "next/router";

const MovieGenre = ({ arr }) => {
  const router = useRouter();
  const genreId = router.query.id;
  return (
    <>
      <Head>
        <title>{genreId} | Entertainment</title>
        <meta
          name="description"
          content={`Search for the best ${genreId} movies`}
        />
      </Head>
      <main>
        <Search movies />
        <Dropdown movies={arr} />
        <MediaType type="movies" endpoint={`api/movies/genre/${genreId}`} />
      </main>
    </>
  );
};

export default MovieGenre;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { id: "1" },
      },
    ],
  };
}

export async function getStaticProps() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-GB`;
  const response = await fetch(url);
  const data = await response.json();
  const arr = data.genres.filter(
    (genre) =>
      genre.name !== "Mystery" &&
      genre.name !== "TV Movie" &&
      genre.name !== "History"
  );

  return {
    props: {
      arr,
    },
  };
}
