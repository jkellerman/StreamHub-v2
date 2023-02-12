import styles from "../MediaDetailsTab/MediaDetailsTab.module.css";
import { toHoursAndMinutes } from "@/utils/utils";
import Link from "next/link";
import StarRating from "../../atoms/StarRating/StarRating";
import QueryString from "qs";
import Poster from "@/components/atoms/Poster/Poster";
import Certification from "@/components/atoms/Certification/Certification";
import ReleaseDate from "@/components/atoms/ReleaseDate/ReleaseDate";
import MediaOverview from "@/components/atoms/MediaOverview/MediaOverview";
import MediaDirectorOrNetwork from "@/components/atoms/MediaDirectorOrNetwork/MediaDirectorOrNetwork";

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
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div className={styles.name}>genres</div>
              <div className={styles.value}>
                {genres.map((genre) => {
                  return (
                    <Link
                      key={genre.id}
                      href={
                        movie_age_rating
                          ? `/movies?${QueryString.stringify({
                              genre: genre.name.toLowerCase(),
                            })}`
                          : `/series?${QueryString.stringify({
                              genre: genre.name.toLowerCase(),
                            })}`
                      }
                    >
                      <a className={styles.genre}>{genre.name}</a>
                    </Link>
                  );
                })}
              </div>
            </li>
            <li className={styles.listItem}>
              <div className={styles.name}>cast</div>
              <div>
                {cast.map((member) => {
                  return <div key={member.id}>{member.name}</div>;
                })}
              </div>
            </li>
            <MediaDirectorOrNetwork director={director} network={network} />
          </ul>
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
