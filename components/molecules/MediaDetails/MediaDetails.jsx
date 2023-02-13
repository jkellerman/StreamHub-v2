import styles from "../MediaDetails/MediaDetails.module.css";
import MediaDirectorOrNetwork from "@/components/atoms/MediaDirectorOrNetwork/MediaDirectorOrNetwork";
import Cast from "@/components/atoms/Cast/Cast";
import MediaGenres from "@/components/atoms/MediaGenres/MediaGenres";
import MediaRunTimeOrSeasons from "@/components/atoms/MediaRunTimeOrSeasons/MediaRunTimeOrSeasons";

const MediaDetails = ({
  director,
  cast,
  genres,
  runtime,
  network,
  seasons,
  movies,
}) => {
  // TODO: improve class naming
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
