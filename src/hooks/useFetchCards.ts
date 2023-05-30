import { useQuery } from "@tanstack/react-query";

interface IMovieData {
  known_for_department: string;
}

const useFetchCards = (endpoint: string) => {
  const fetchCards = async () => {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    const filteredArr = data.data.results.filter((item: IMovieData) => !item.known_for_department); // filters actors
    return {
      data: filteredArr,
    };
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["movies/series", endpoint],
    queryFn: fetchCards,
  });

  return {
    cards: data || undefined,
    isLoading,
    isError,
  };
};

export default useFetchCards;
