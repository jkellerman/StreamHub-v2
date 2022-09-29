import useFetch from "hooks/useFetch";
import { sliceArray } from "@/utils/utils";
import Trending from "../Trending/Trending";
import Category from "../Category/Category";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const Categories = () => {
  const { data, isError } = useFetch("api/trending");

  if (isError) return "An error occured, reload page";
  if (!data) return <LoadingAnimation />;
  const filteredArr = data.data.results.filter(
    (type) => type.media_type !== "person"
  );

  const arr = sliceArray(filteredArr, 10);
  return (
    <>
      <Trending arr={arr} />
      <Category endpoint="api/series/popular-shows" type="popular shows" />
      <Category endpoint="api/movies/popular-movies" type="popular movies" />
      <Category endpoint="api/series/top-rated-shows" type="top rated shows" />
      <Category endpoint="api/movies/upcoming-movies" type="upcoming movies" />
      <Category endpoint="api/series/on-the-air" type="on the air" />
      <Category
        endpoint="api/movies/top-rated-movies"
        type=" top rated movies"
      />
    </>
  );
};

export default Categories;
