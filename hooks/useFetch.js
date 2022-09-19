import useSWR from "swr";

const useSWRFetch = (endpoint, type) => {
  const fetcher = async () => {
    const response = await fetch(`${endpoint}`);
    const data = response.json();
    return data;
  };

  const { data, error } = useSWR(`${type}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSWRFetch;
