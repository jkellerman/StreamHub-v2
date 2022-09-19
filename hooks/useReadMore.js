import { useState } from "react";

const useReadMore = () => {
  const [readMore, setReadMore] = useState(false);

  const handleToggle = () => {
    setReadMore(!readMore);
  };

  const closeReadMore = () => {
    setReadMore(false);
  };

  return { readMore, handleToggle, closeReadMore };
};

export default useReadMore;
