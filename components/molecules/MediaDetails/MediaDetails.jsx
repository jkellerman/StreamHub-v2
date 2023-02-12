import styles from "../MediaDetails/MediaDetails.module.css";
import Link from "next/link";
import { toHoursAndMinutes } from "@/utils/utils";
import MediaDirectorOrNetwork from "@/components/atoms/MediaDirectorOrNetwork/MediaDirectorOrNetwork";

const Details = ({
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
        </dl>

        {/* Cast */}
        <div className={styles.container}>
          <span className={styles.heading}>cast</span>
          <ul className={styles.castContainer}>
            {cast.map((member, index) => {
              return (
                <li className={styles.description} key={member.id}>
                  {index === cast.length - 1 ? member.name : `${member.name},`}
                  &nbsp;
                </li>
              );
            })}
          </ul>
        </div>

        {/* Genre Links */}
        <div className={`${styles.container}`}>
          <span className={styles.heading}>genres</span>
          <div className={styles.linksContainer}>
            {genres.map((genre) => {
              return (
                <Link
                  key={genre.id}
                  href={
                    movies
                      ? `/movies/genre/${genre.id}?name=${genre.name}`
                      : `/series/genre/${genre.id}?name=${genre.name}`
                  }
                >
                  <a className={`${styles.description} ${styles.genre}`}>
                    {genre.name}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>

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

export default Details;
