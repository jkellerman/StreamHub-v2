import QueryString from "qs";
import { useState, useEffect, useRef } from "react";

const useInfiniteScroll = (endpoint) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [newImages, setNewImages] = useState(false);

  // fetch films/series everytime page in url changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const queryString = QueryString.stringify(
          { page },
          { addQueryPrefix: true }
        );
        const response = await fetch(`${endpoint}${queryString}`);
        const data = await response.json();
        const filteredArr = data.data.results.filter(
          (item) => item.backdrop_path !== null && !item.known_for_department
        );
        const arr = filteredArr;

        setCards((prev) => [...prev, ...arr]);
        setNewImages(false);
        setIsLoading(false);
      } catch (error) {
        setShouldFetch(false);
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [endpoint, page]);

  useEffect(() => {
    if (!newImages) return;
    setPage((OldPage) => {
      return OldPage + 1;
    });
  }, [newImages]);

  // Event for when scrolled to the bottom of the page
  const event = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 200
    ) {
      setShouldFetch(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  // If navigated to new page, set page number from api to 1
  useEffect(() => {
    setPage(1);
    setCards([]);
  }, [endpoint]);

  return { cards, isLoading };
};

export default useInfiniteScroll;
