import { useState, useEffect } from "react";
import QueryString from "qs";

const useInfiniteScroll = (endpoint) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 50
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
    if (page <= totalPages) {
      setPage((OldPage) => {
        return OldPage + 1;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetch]);

  // Below, need two useEffects because if you call endpoint and page together, switching between genre pages results in page duplication due to page number carry-over from previous page.

  // Warning: Attempts to remove duplication will likely break the code. When refactoring keep an eye on page number in terminal.

  useEffect(() => {
    setPage(1);
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${endpoint}?page=1`);
        const data = await response.json();
        const filteredArr = data.data.results.filter(
          (item) => item.backdrop_path !== null && !item.known_for_department
        );
        setTotalPages(data.data.total_pages);
        setCards(filteredArr);
        setShouldFetch(false);
        setIsLoading(false);
      } catch (error) {
        setShouldFetch(false);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint]);

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
          (item) => item.backdrop_path !== null && !item.known_for_department
        );
        setCards((prev) => {
          return [...prev, ...filteredArr];
        });
        setShouldFetch(false);
        setIsLoading(false);
      } catch (error) {
        setShouldFetch(false);
        setIsLoading(false);
      }
    };
    fetchMoreMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { cards, isLoading };
};

export default useInfiniteScroll;
