import { useRouter } from "next/router";

const Movie = () => {
  const router = useRouter();
  const movieId = router.query.id;
  return <h1>Single Movie {movieId}</h1>;
};

export default Movie;
