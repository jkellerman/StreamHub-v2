import React from "react";

import Certification from "@/components/Certification/Certification";
import MediaRunTimeOrSeasons from "@/components/MediaRunTimeOrSeasons/MediaRunTimeOrSeasons";
import ReleaseDate from "@/components/ReleaseDate/ReleaseDate";
import { Genres } from "@/types/genres";

import MediaGenres from "../MediaGenres/MediaGenres";

import styles from "./MediaDetails.module.scss";

interface MediaDetailsProps {
  movie_age_rating?: string;
  series_age_rating?: string;
  genres: Genres.IGenre[];
  runtime?: number;
  seasons?: number;
  release_date?: string;
  air_date?: string;
}

const MediaDetails: React.FC<MediaDetailsProps> = ({
  genres,
  movie_age_rating,
  release_date,
  runtime,
  series_age_rating,
  air_date,
  seasons,
}) => {
  return (
    <>
      <div className={styles.detailsContainer}>
        <MediaGenres genres={genres} movies />
        <Certification movie_age_rating={movie_age_rating} series_age_rating={series_age_rating} />
        <ReleaseDate release_date={release_date} air_date={air_date} />
        <MediaRunTimeOrSeasons runtime={runtime} seasons={seasons} />
      </div>
    </>
  );
};

export default MediaDetails;
