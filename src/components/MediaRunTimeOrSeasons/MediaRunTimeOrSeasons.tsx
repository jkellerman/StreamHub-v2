import React from "react";

import { Media } from "@/types/media";
import { toHoursAndMinutes } from "@/utils/utils";

import styles from "../MediaRunTimeOrSeasons/MediaRunTimeOrSeasons.module.scss";

const MediaRunTimeOrSeasons: React.FC<Media.MediaRunTimeOrSeasonsProps> = ({
  runtime,
  seasons,
}) => {
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
