import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
      (item: IMovieData) =>
        item.backdrop_path !== null && !item.known_for_department
    );
    return {
      data: filteredArr,
      totalPages: data.data.total_pages,
    };
  };

  const { data, isError, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["movies/series", endpoint],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage, pages) =>
      lastPage.totalPages === pages.length ? undefined : pages.length + 1,
  });

  // FetchNextPage when scrolled to bottom
  useEffect(() => {
    let fetching = false;
    const handleScroll = () => {
      const scrollThreshold =
        document.body.scrollHeight - window.innerHeight * 0.2;
      const scrollPosition = window.innerHeight + window.scrollY;
      if (!fetching && scrollPosition >= scrollThreshold) {
        fetching = true;
        fetchNextPage().then(() => {
          fetching = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    cards: data?.pages.flatMap((page) => page.data) || [],
    isLoading,
    isError,
  };
};

export default useInfiniteScroll;
