import styles from "@/components/DetailsTab/DetailsTab.module.css";
import {
  toHoursAndMinutes,
  POSTER_URL_IMAGE,
  shimmer,
  toBase64,
  DATE_SLICE,
} from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import StarRating from "../StarRating/StarRating";
import QueryString from "qs";

const DetailsTab = ({
  name,
  age_rating,
  release_date,
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
}) => {
  return (
    <>
      <div
        className={
          activeTab === 2
            ? `${styles.details} ${styles.active}`
            : styles.details
        }
      >
        {overview && (
          <div>
            <div className={styles.name}>overview</div>
            <p className={styles.overview}>{overview}</p>
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
                        age_rating
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
            {director ? (
              <li className={styles.listItem}>
                <div className={styles.name}>director</div>
                <div>{director}</div>
              </li>
            ) : (
              <li className={styles.listItem}>
                <div className={styles.name}>network</div>
                <div>{network}</div>
              </li>
            )}
          </ul>
          <ul className={styles.attributesList}>
            <li className={styles.listItem}>
              <div className={styles.name}>release date</div>
              <div>{release_date.slice(0, DATE_SLICE)}</div>
            </li>
            <li className={styles.listItem}>
              <div className={styles.name}>Certification</div>
              {age_rating ? (
                <div>{age_rating.certification}</div>
              ) : (
                <div>{series_age_rating}</div>
              )}
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
                <div>
                  <StarRating rating={vote_average} />
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className={styles.posterContainer}>
        <Image
          src={`${POSTER_URL_IMAGE}${poster}`}
          alt={`${name} poster`}
          unoptimized={true}
          layout="fill"
          objectFit="contain"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(240, 140)
          )}`}
          className={styles.poster}
        />
      </div>
    </>
  );
};

export default DetailsTab;
