import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { MediaDetails, MediaList } from "@/types/tmdb";

export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const FetchCards = (endpoint: string) => {
  const fetchData = async () => {
    const data = await fetcher<MediaList>(endpoint);
    const filteredArr = data.data.results.filter((item) => !item.known_for_department); // filters actors
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
    const res = await fetcher<MediaDetails>(endpoint);
    return res.data;
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
    const data = await fetcher<MediaList>(`${endpoint}?page=${pageParam}`);
    const filteredArr = data.data.results.filter(
      (item) => item.backdrop_path !== null && !item.known_for_department
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
