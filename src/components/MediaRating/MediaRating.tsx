import React, { useEffect, useState } from "react";

import ProgressRating from "@/components/ProgressRating/ProgressRating";
import { FetchDetails } from "@/utils/tmdbDataHelpers";

import TmdbLogo from "../Logo/Tmdb/TmdbLogo";

import styles from "./MediaRating.module.scss";

interface MediaRatingProps {
  id: number;
  type: string;
}

const MediaRating: React.FC<MediaRatingProps> = ({ id, type }) => {
  const endpoint = `/api/details/${type}/${id}`;
  const { data } = FetchDetails(endpoint);
  const [progress, setProgress] = useState(0);

  const voteAverage: number = data && data.vote_average * 10;

  useEffect(() => {
    if (data) {
      setProgress(voteAverage);
    }
  }, [voteAverage, data]);

  // if (!data) {
  //   return <div className={styles.container}></div>; // or render a loading state, or fallback content
  // }

  return (
    <>
      <div className={styles.container}>
        <ProgressRating vote_average={voteAverage ? voteAverage : null} progress={progress} />
        <div className={styles.logoContainer}>
          <div className={styles.statsContainer}>
            <TmdbLogo />
            total user votes: {data ? data.vote_count : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaRating;
