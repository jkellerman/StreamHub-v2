import React, { useEffect, useState } from "react";

import ProgressRating from "@/components/ProgressRating/ProgressRating";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FetchDetails } from "@/utils/tmdbDataHelpers";

import styles from "./MediaRating.module.scss";

interface MediaRatingProps {
  id: number;
  type: string;
}

const MediaRating: React.FC<MediaRatingProps> = ({ id, type }) => {
  const endpoint = `/api/details/${type}/${id}`;
  const { data } = FetchDetails(endpoint);
  const [progress, setProgress] = useState(0);

  const voteAverage: number | undefined = data && data.vote_average * 10;
  const isMobile = useMediaQuery(`(max-width: 504px)`);
  useEffect(() => {
    if (data && voteAverage) {
      setProgress(voteAverage);
    }
  }, [voteAverage, data]);

  return (
    <>
      <div className={styles.container}>
        <ProgressRating
          vote_average={voteAverage ? voteAverage : null}
          progress={progress}
          y={isMobile ? "50%" : "45%"}
        />
        <div className={styles.logoContainer}>
          <div className={styles.statsContainer}>
            total user votes: {data ? data.vote_count : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaRating;
