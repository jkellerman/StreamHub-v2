import React from "react";
import styles from "../MediaDetailsTab/MediaDetailsTab.module.css";
import StarRating from "../../atoms/StarRating/StarRating";
import Poster from "@/components/atoms/Poster/Poster";
import Certification from "@/components/atoms/Certification/Certification";
import ReleaseDate from "@/components/atoms/ReleaseDate/ReleaseDate";
import MediaOverview from "@/components/atoms/MediaOverview/MediaOverview";
import MediaDirectorOrNetwork from "@/components/atoms/MediaDirectorOrNetwork/MediaDirectorOrNetwork";
import Cast from "@/components/atoms/Cast/Cast";
import MediaGenres from "@/components/atoms/MediaGenres/MediaGenres";
import MediaRunTimeOrSeasons from "@/components/atoms/MediaRunTimeOrSeasons/MediaRunTimeOrSeasons";
import { Genres, Media } from "types";

interface MediaDetailsTabProps {
  movie_age_rating?: string;
  release_date?: string;
  air_date?: string;
  runtime?: number;
  star_rating: number;
  overview: string;
  poster: string;
  director?: Media.IDirectorOrNetwork;
  cast: Media.ICastMember[];
  genres: Genres.IGenre[];
  series_age_rating?: string;
  seasons?: number;
  network?: Media.IDirectorOrNetwork;
  activeTab: string;
  title: string;
  movies?: boolean;
}

const MediaDetailsTab: React.FC<MediaDetailsTabProps> = ({
  movie_age_rating,
  release_date,
  air_date,
  runtime,
  star_rating,
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

            <div className={`${styles.listItem} ${styles.certification}`}>
              <dt className={styles.heading}>certification</dt>
              <Certification
                movie_age_rating={movie_age_rating}
                series_age_rating={series_age_rating}
                mediaDetailsTab
              />
            </div>

            <MediaRunTimeOrSeasons runtime={runtime} seasons={seasons} />

            {star_rating > 0 && (
              <div className={styles.listItem}>
                <dt className={styles.heading}>rating</dt>
                <StarRating star_rating={star_rating} />
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
