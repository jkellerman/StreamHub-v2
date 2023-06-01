import React, { useEffect, useState } from "react";

import ProgressRating from "@/components/atoms/ProgressRating/ProgressRating";
import useFetchDetails from "@/hooks/useFetchDetails";

import TmdbLogo from "../../atoms/Logo/Tmdb/TmdbLogo";

import styles from "./MediaRating.module.scss";

interface MediaRatingProps {
  id: number;
  type: string;
}

const MediaRating: React.FC<MediaRatingProps> = ({ id, type }) => {
  const endpoint = `/api/details/${type}/${id}`;
  const { data } = useFetchDetails(endpoint);
  const [progress, setProgress] = useState(0);

  const voteAverage: number = data && data.vote_average * 10;

  useEffect(() => {
    if (data) {
      setProgress(voteAverage);
    }
  }, [voteAverage, data]);

  if (!data) {
    return null; // or render a loading state, or fallback content
  }

  return (
    <div className={styles.container}>
      <ProgressRating vote_average={voteAverage} progress={progress} />
      <span className={styles.logoContainer}>
        <TmdbLogo />
        user rating
      </span>
    </div>
  );
};

export default MediaRating;
