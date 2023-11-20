import { useQuery } from "@tanstack/react-query";

interface IMovieData {
  known_for_department: string;
}

export const FetchCards = (endpoint: string) => {
  const fetchData = async () => {
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
    queryFn: fetchData,
  });

  return {
    cards: data || undefined,
    isLoading,
    isError,
  };
};

export const FetchDetails = (endpoint: string) => {
  const fetchData = async () => {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["details", endpoint],
    queryFn: fetchData,
  });

  return {
    data: data || undefined,
    isError,
    isLoading,
  };
};
