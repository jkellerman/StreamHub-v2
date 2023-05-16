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
      <div className={styles.detailItem}>
        <dt className={styles.heading}>{runtime && runtime >= 0 ? "runtime" : "seasons"}</dt>
        {runtime && runtime >= 0 && (
          <dd className={styles.description}>
            {runtime > 0 ? `${toHoursAndMinutes(runtime)}` : null}
          </dd>
        )}
        {seasons && <dd className={styles.description}>{seasons}</dd>}
      </div>
    </>
  );
};
{
}

export default MediaRunTimeOrSeasons;
