import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

interface IMovieData {
  backdrop_path: string;
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

export const Pagination = (endpoint: string) => {
  const fetchData = async ({ pageParam = 1 }) => {
    const res = await fetch(`${endpoint}?page=${pageParam}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    const filteredArr = data.data.results.filter(
      (item: IMovieData) => item.backdrop_path !== null && !item.known_for_department
    );

    return {
      data: filteredArr,
      totalPages: data.data.total_pages,
    };
  };

  const { data, isError, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["movies/series", endpoint],
      queryFn: fetchData,
      getNextPageParam: (lastPage, pages) =>
        lastPage.totalPages === pages.length ? undefined : pages.length + 1,
    });

  return {
    cards: data?.pages?.flatMap((page) => page.data) ?? [],
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};
