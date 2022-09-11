import styles from "@/components/DetailsTab/DetailsTab.module.css";
import {
  toHoursAndMinutes,
  BASE_URL_IMAGE,
  shimmer,
  toBase64,
} from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import StarRating from "../StarRating/StarRating";

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
}) => {
  return (
    <>
      <div>
        <p className={styles.overview}>{overview}</p>
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
                        `/movies/genre/${genre.id}?name=${genre.name}` ||
                        `/series/genre/${genre.id}?name=${genre.name}`
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
                  return <div>{member.name}</div>;
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
              <div>{release_date.slice(0, 4)}</div>
            </li>
            <li className={styles.listItem}>
              <div className={styles.name}>Certification</div>
              {age_rating ? (
                <div>{age_rating.certification}</div>
              ) : (
                <div>{series_age_rating}</div>
              )}
            </li>
            {runtime ? (
              <li className={styles.listItem}>
                <div className={styles.name}>Runtime</div>
                <div> {toHoursAndMinutes(runtime)} </div>
              </li>
            ) : (
              <li className={styles.listItem}>
                <div className={styles.name}>Seasons</div>
                <div>
                  {seasons > 1 ? `${seasons} seasons` : `${seasons} season`}{" "}
                </div>
              </li>
            )}
            <li className={styles.listItem}>
              <div className={styles.name}>Rating</div>
              <div>
                <StarRating rating={vote_average} />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.posterContainer}>
        <Image
          src={`${BASE_URL_IMAGE}${poster}`}
          alt={`${name} poster`}
          layout="fill"
          objectFit="cover"
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
