import styles from "../MediaDetailsTab/MediaDetailsTab.module.css";
import { toHoursAndMinutes } from "@/utils/utils";

import StarRating from "../../atoms/StarRating/StarRating";

import Poster from "@/components/atoms/Poster/Poster";
import Certification from "@/components/atoms/Certification/Certification";
import ReleaseDate from "@/components/atoms/ReleaseDate/ReleaseDate";
import MediaOverview from "@/components/atoms/MediaOverview/MediaOverview";
import MediaDirectorOrNetwork from "@/components/atoms/MediaDirectorOrNetwork/MediaDirectorOrNetwork";
import Cast from "@/components/atoms/Cast/Cast";
import MediaGenres from "@/components/atoms/MediaGenres/MediaGenres";

const MediaDetailsTab = ({
  movie_age_rating,
  release_date,
  air_date,
  runtime,
  vote_average,
  overview,
  poster,
  director,
  cast,
  genres,
  series_age_rating,
  seasons,
  network,
  activeTab,
  title,
  movies,
}) => {
  // TODO: improve class naming and add dd

  return (
    <>
      <div
        className={
          activeTab === "details"
            ? `${styles.details} ${styles.active}`
            : styles.details
        }
      >
        {overview && (
          <div>
            <div className={styles.name}>overview</div>
            <MediaOverview overview={overview} />
          </div>
        )}

        <div className={styles.attributes}>
          <dl className={styles.list}>
            <MediaGenres genres={genres} movies={movies} />
            <Cast cast={cast} />
            <MediaDirectorOrNetwork director={director} network={network} />
          </dl>
          <ul className={styles.attributesList}>
            <li className={styles.listItem}>
              <div className={styles.name}>release date</div>
              <ReleaseDate
                release_date={release_date}
                air_date={air_date}
                mediaDetailsTab
              />
            </li>
            <li className={styles.listItem}>
              <div className={styles.name}>Certification</div>
              <Certification
                movie_age_rating={movie_age_rating}
                series_age_rating={series_age_rating}
                mediaDetailsTab
              />
            </li>
            {runtime >= 0 ? (
              <li className={styles.listItem}>
                <div className={styles.name}>Runtime</div>
                <div>
                  {runtime > 0 ? `${toHoursAndMinutes(runtime)}` : null}{" "}
                </div>
              </li>
            ) : (
              <li className={styles.listItem}>
                <div className={styles.name}>Seasons</div>
                <div>
                  {seasons > 1 ? `${seasons} seasons` : `${seasons} season`}{" "}
                </div>
              </li>
            )}
            {vote_average > 0 && (
              <li className={styles.listItem}>
                <div className={styles.name}>Rating</div>
                <StarRating rating={vote_average} />
              </li>
            )}
          </ul>
        </div>
      </div>
      <Poster poster={poster} title={title} />
    </>
  );
};

export default MediaDetailsTab;
