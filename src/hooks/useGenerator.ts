import { useEffect, useState } from "react";

import { randomNumber } from "@/utils/utils";

import { Media } from "../types";

const useGenerator = (endpoint: string, type: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [noResults, setNoResults] = useState(false);

  // Fetch the total number of pages when an endpoint changes
  // Each endpoint has different total number of pages, need to get this number so we always return a recommendation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = endpoint;
        const response = await fetch(url);
        const data = await response.json();
        const filteredArr =
          data &&
          data.data.results.filter(
            (item: Media.IMovieData) => item.backdrop_path !== null && !item.known_for_department
          );

        if (filteredArr.length !== 0) {
          setTotalPages(data.data.total_pages);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [endpoint]);

  const fetchRecommendation = async () => {
    setIsError(false);
    setNoResults(false);
    setIsLoading(true);

    if (!totalPages) {
      setNoResults(true);
      setIsLoading(false);
      return;
    }
    // Get totalPages number
    // We want to return the most popular movies/series for better recommendations therefore
    // If totalPages >= 10, select a random number between 1 & 10
    // Else, pageNum === totalPages
    const upperBound = 10;
    const lowerBound = 1;
    const pageNum =
      totalPages && totalPages >= upperBound
        ? randomNumber(upperBound, lowerBound)
        : randomNumber(totalPages, lowerBound);
    const randomPageEndpoint = endpoint.replace("/network/", "/random/");

    try {
      const url = `${randomPageEndpoint}/${pageNum}`;
      const response = await fetch(url);
      const data = await response.json();
      const randomIndex = randomNumber(data.data.results.length - 1);
      const result = data.data.results[randomIndex].id;

      // Make an api call to the movie id that matches the random id we get from our cardList
      // Need to do this so we can get all the details we need for the individual movie/series
      const idUrl = `/api/details/${type}/${result}`;

      const idEndpointResponse = await fetch(idUrl);
      if (!idEndpointResponse.ok) {
        setIsError(true);
      }
      const idData = await idEndpointResponse.json();

      setData(idData.data);
      setIsLoading(false);
      setNoResults(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      setNoResults(false);
    }
  };

  return { data, isLoading, isError, noResults, fetchRecommendation };
};

export default useGenerator;
