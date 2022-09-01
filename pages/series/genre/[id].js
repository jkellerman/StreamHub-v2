import { useRouter } from "next/router";

const seriesGenre = () => {
  const router = useRouter();
  const genreId = router.query.id;
  return <h1>Genre {genreId}</h1>;
};

export default seriesGenre;
