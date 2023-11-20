import React from "react";

import { Media } from "@/types/media";
import { toHoursAndMinutes } from "@/utils/utils";

const MediaRunTimeOrSeasons: React.FC<Media.MediaRunTimeOrSeasonsProps> = ({
  runtime,
  seasons,
}) => {
  return (
    <>
      {runtime && runtime >= 0 && (
        <span>{runtime > 0 ? `${toHoursAndMinutes(runtime)}` : null}</span>
      )}
      {seasons && <span>{seasons > 1 ? `${seasons} seasons` : `${seasons} season`}</span>}
    </>
  );
};
{
}

export default MediaRunTimeOrSeasons;
