import { useState } from "react";

import { randomNumber } from "@/utils/utils";

const useGenerator = (endpoint: string, pageNumber: number, type: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchCards = async () => {
    setIsError(false);
    setIsLoading(true);
    const pageNum = randomNumber(pageNumber);

    try {
      const url = `${endpoint}/${pageNum}`;
      const response = await fetch(url);

      const data = await response.json();

      const randomIndex = randomNumber(data.data.results.length);
      const result = data.data.results[randomIndex].id;
      // Make an api call to the movie id that matches the random id we get from our cardList
      // Need to do this so we can get all the details we need for the movie/show
      const idUrl = `/api/details/${type}/${result}`;

      const idEndpointResponse = await fetch(idUrl);
      if (!idEndpointResponse.ok) {
        setIsError(true);
      }
      const idData = await idEndpointResponse.json();

      setData(idData.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);

      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, fetchCards };
};

export default useGenerator;
