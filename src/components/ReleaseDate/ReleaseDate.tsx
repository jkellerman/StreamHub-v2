import React from "react";

import { DATE_SLICE } from "@/constants/app";

interface ReleaseDateProps {
  release_date?: string;
  air_date?: string;
}

const ReleaseDate: React.FC<ReleaseDateProps> = ({ release_date, air_date }) => {
  return (
    <>
      {release_date && <span>{release_date.slice(0, DATE_SLICE)}</span>}

      {air_date && <span>{air_date.slice(0, DATE_SLICE)}</span>}
    </>
  );
};

export default ReleaseDate;
