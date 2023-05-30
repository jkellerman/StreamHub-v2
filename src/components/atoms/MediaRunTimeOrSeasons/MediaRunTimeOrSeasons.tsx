import React from "react";

import styles from "../MediaRunTimeOrSeasons/MediaRunTimeOrSeasons.module.scss";

interface MediaRunTimeOrSeasonsProps {
  runtime?: number;
  seasons?: number;
}

const MediaRunTimeOrSeasons: React.FC<MediaRunTimeOrSeasonsProps> = ({ runtime, seasons }) => {
  const toHoursAndMinutes = (totalMinutes: number): string => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${hours} hr ${minutes} mins`;
  };
  return (
    <>
      {runtime && runtime >= 0 && (
        <span className={styles.stat}>{runtime > 0 ? `${toHoursAndMinutes(runtime)}` : null}</span>
      )}
      {seasons && (
        <span className={styles.stat}>
          {seasons > 1 ? `${seasons} seasons` : `${seasons} season`}
        </span>
      )}
    </>
  );
};
{
}

export default MediaRunTimeOrSeasons;
