import { useRouter } from "next/router";

const Series = () => {
  const router = useRouter();
  const seriesId = router.query.id;
  return <h1>Single Movie {seriesId}</h1>;
};

export default Series;
