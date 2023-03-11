import React from "react";
import styles from "../MediaDetails/MediaDetails.module.css";
import MediaDirectorOrNetwork from "@/components/atoms/MediaDirectorOrNetwork/MediaDirectorOrNetwork";
import Cast from "@/components/atoms/Cast/Cast";
import MediaGenres from "@/components/atoms/MediaGenres/MediaGenres";
import MediaRunTimeOrSeasons from "@/components/atoms/MediaRunTimeOrSeasons/MediaRunTimeOrSeasons";
import { Media, Genres } from "types";

interface MediaDetailsProps {
  director?: Media.IDirectorOrNetwork;
  network?: Media.IDirectorOrNetwork;
  cast: Media.ICastMember[];
  genres: Genres.IGenre[];
  seasons?: number;
  movies?: boolean;
  runtime?: number;
}

const MediaDetails: React.FC<MediaDetailsProps> = ({
  director,
  cast,
  genres,
  runtime,
  network,
  seasons,
  movies,
}) => {
  return (
    <>
      <section className={styles.details}>
        <dl>
          <MediaDirectorOrNetwork director={director} network={network} />
          <Cast cast={cast} />
          <MediaGenres genres={genres} movies={movies} />
          <MediaRunTimeOrSeasons runtime={runtime} seasons={seasons} />
        </dl>
      </section>
      <hr />
    </>
  );
};

export default MediaDetails;
