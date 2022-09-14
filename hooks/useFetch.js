import { useState, useEffect } from "react";

const useFetch = (endpoint) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${endpoint}`);
        const data = await response.json();
        const filteredArr = data.data.results.filter(
          (item) => item.backdrop_path !== null
        );
        const arr = filteredArr;
        setCards(arr);
        setIsLoading(false);
      } catch (error) {
        setError("An error occured");
      }
    };
    fetchMovies();
  }, [endpoint]);

  return { cards, isLoading, error };
};

export default useFetch;
