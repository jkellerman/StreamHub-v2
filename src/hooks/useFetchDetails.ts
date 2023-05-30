import { useQuery } from "@tanstack/react-query";

const useFetchDetails = (endpoint: string) => {
  const fetchDetails = async () => {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.data;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["details", endpoint],
    queryFn: fetchDetails,
  });

  return {
    data: data || undefined,
    isError,
    isLoading,
  };
};

export default useFetchDetails;
