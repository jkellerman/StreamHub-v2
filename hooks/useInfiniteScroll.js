import { useState, useEffect, useRef } from "react";

const useInfiniteScroll = (endpoint) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [newImages, setNewImages] = useState(false);
  const mounted = useRef(false);
  const url = `${endpoint}/${page}`;

  // fetch films/series everytime page in url changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!url) return;
        const response = await fetch(url);
        const data = await response.json();
        const filteredArr = data.data.results.filter(
          (item) => item.backdrop_path !== null && !item.known_for_department
        );
        const arr = filteredArr;

        setCards((prev) => {
          if (page === 1) return arr;
          else return [...prev, ...arr];
        });
        setNewImages(false);
        setIsLoading(false);
      } catch (error) {
        setNewImages(false);
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [url]);

  useEffect(() => {
    // Using mounted ref to stop newImages being rendered on initial render. Here we want new images only to render on 2nd, 3rd, 4th, etc.
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    setPage((OldPage) => {
      return OldPage + 1;
    });
  }, [newImages]);

  const event = () => {
    // How far down page the event should take place
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 200
    ) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  // If navigated to new page, set page number from api to 1

  useEffect(() => {
    setPage(1);
  }, [endpoint]);

  return { cards, isLoading };
};

export default useInfiniteScroll;
