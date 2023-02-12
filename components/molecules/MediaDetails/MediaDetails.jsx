import styles from "../MediaDetails/MediaDetails.module.css";
import { toHoursAndMinutes } from "@/utils/utils";
import MediaDirectorOrNetwork from "@/components/atoms/MediaDirectorOrNetwork/MediaDirectorOrNetwork";
import Cast from "@/components/atoms/Cast/Cast";
import MediaGenres from "@/components/atoms/MediaGenres/MediaGenres";

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
        <dl className={styles.list}>
          <MediaDirectorOrNetwork director={director} network={network} />
          <Cast cast={cast} />
          <MediaGenres genres={genres} movies={movies} />
        </dl>

        {/* Runtime/Seasons */}
        {runtime >= 0 ? (
          <div className={styles.container}>
            <span className={styles.heading}>runtime</span>
            <span className={styles.description}>
              {runtime > 0 ? `${toHoursAndMinutes(runtime)}` : null}{" "}
            </span>
          </div>
        ) : (
          <div className={styles.container}>
            <span className={styles.heading}>seasons</span>

            <span className={styles.description}>
              {seasons > 1 ? `${seasons} seasons` : `${seasons} season`}
            </span>
          </div>
        )}
      </section>
      <hr />
    </>
  );
};

export default MediaDetails;
