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
import MediaRunTimeOrSeasons from "@/components/atoms/MediaRunTimeOrSeasons/MediaRunTimeOrSeasons";

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
            ? `${styles.mediaDetails} ${styles.active}`
            : styles.mediaDetails
        }
      >
        {overview && (
          <div className={styles.overviewContainer}>
            <div className={styles.heading}>overview</div>
            <MediaOverview overview={overview} />
          </div>
        )}

        <div className={styles.attributes}>
          <dl className={styles.list}>
            <MediaGenres genres={genres} movies={movies} />
            <Cast cast={cast} />
            <MediaDirectorOrNetwork director={director} network={network} />
          </dl>

          <dl className={styles.attributesList}>
            <div className={`${styles.listItem} ${styles.releaseDate}`}>
              <dt className={styles.heading}>release date</dt>
              <ReleaseDate
                release_date={release_date}
                air_date={air_date}
                mediaDetailsTab
              />
            </div>

            <div className={styles.listItem}>
              <dt className={styles.heading}>Certification</dt>
              <Certification
                movie_age_rating={movie_age_rating}
                series_age_rating={series_age_rating}
                mediaDetailsTab
              />
            </div>

            <MediaRunTimeOrSeasons runtime={runtime} seasons={seasons} />

            {vote_average > 0 && (
              <div className={styles.listItem}>
                <dt className={styles.heading}>Rating</dt>
                <StarRating rating={vote_average} />
              </div>
            )}
          </dl>
        </div>
      </div>
      <Poster poster={poster} title={title} />
    </>
  );
};

export default MediaDetailsTab;
