import { useInfiniteQuery } from "@tanstack/react-query";

interface IMovieData {
  backdrop_path: string;
  known_for_department: string;
}

const useInfiniteScroll = (endpoint: string) => {
  const fetchMovies = async ({ pageParam = 1 }) => {
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
      queryFn: fetchMovies,
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

export default useInfiniteScroll;
