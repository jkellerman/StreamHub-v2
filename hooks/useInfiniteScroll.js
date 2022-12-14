import { useState, useEffect } from "react";

const useInfiniteScroll = (endpoint) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [shouldFetch, setShouldFetch] = useState(false);
  const url = `${endpoint}/${page}`;
  // const mounted = useRef(false); // mounted useRef needed in react 18 strict mode when running locally to stop page 1 from endpoint rendering twice when component mounts

  // fetch films/series everytime page in url changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const filteredArr = data.data.results.filter(
          (item) => item.backdrop_path !== null && !item.known_for_department
        );
        setCards((prev) => {
          if (page === 1)
            return filteredArr; // function stops here when page is set back to one after genre page switches, otherwise new cards for new genre page won't render
          else return [...prev, ...filteredArr];
        });
        setShouldFetch(false);
        setIsLoading(false);
      } catch (error) {
        setShouldFetch(false);
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [url]);

  useEffect(() => {
    // if (!mounted.current) {
    //   mounted.current = true;
    //   return;
    // } // Using mounted ref to stop double fetching when running locally in React 18 strict mode (see comment above)
    if (!shouldFetch) return;
    setPage((OldPage) => {
      return OldPage + 1;
    });
  }, [shouldFetch]);

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

  // If navigated to new page, set page number to 1
  useEffect(() => {
    setPage(1);
  }, [endpoint]);

  return { cards, isLoading };
};

export default useInfiniteScroll;
