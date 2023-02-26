import { useState, useEffect } from "react";
import QueryString from "qs";
import { Media } from "types";

interface IMovieData {
  backdrop_path: string;
  known_for_department: string;
  origin_country?: string[];
}

const useInfiniteScroll = (endpoint: string) => {
  const [cards, setCards] = useState<Media.IMediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  // Need two separate useEffects to fetch movie data for endpoint and the page number. If endpoint and page are called together, endpoint may be called before page when switching between genre pages, which results in page duplication due to page number carry-over from previous page.

  // When refactoring keep an eye on page number in terminal

  useEffect(() => {
    setPage(1);
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${endpoint}?page=1`);
        const data = await response.json();
        const filteredArr = data.data.results.filter(
          (item: IMovieData) =>
            item.backdrop_path !== null &&
            !item.known_for_department &&
            !item.origin_country?.includes("IN")
        );
        setTotalPages(data.data.total_pages);
        setCards(filteredArr);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 75
    ) {
      setShouldFetch(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!shouldFetch) return;
    if (totalPages && page <= totalPages) {
      setPage((OldPage) => {
        return OldPage + 1;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetch]);

  useEffect(() => {
    if (page === 1) return;
    const fetchMoreMovies = async () => {
      const queryString = QueryString.stringify(
        { page },
        { addQueryPrefix: true }
      );
      try {
        const response = await fetch(`${endpoint}${queryString}`);
        const data = await response.json();
        const filteredArr = data.data.results.filter(
          (item: IMovieData) =>
            item.backdrop_path !== null && !item.known_for_department
        );
        setCards((prev) => {
          return [...prev, ...filteredArr];
        });
        setIsLoading(false);
        setShouldFetch(false);
      } catch (error) {
        setIsLoading(false);
        setShouldFetch(false);
      }
    };
    fetchMoreMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { cards, isLoading };
};

export default useInfiniteScroll;
