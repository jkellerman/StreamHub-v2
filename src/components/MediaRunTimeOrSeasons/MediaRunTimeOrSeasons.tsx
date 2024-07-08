import React from "react";

import { toHoursAndMinutes } from "@/utils/utils";

interface MediaRunTimeOrSeasonsProps {
  runtime?: number;
  seasons?: number;
}

const MediaRunTimeOrSeasons: React.FC<MediaRunTimeOrSeasonsProps> = ({ runtime, seasons }) => {
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
