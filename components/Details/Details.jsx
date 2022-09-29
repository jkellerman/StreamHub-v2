import styles from "@/components/Details/Details.module.css";
import Link from "next/link";
import { toHoursAndMinutes } from "@/utils/utils";

const Details = ({
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
        <div className={styles.container}>
          <div className={styles.heading}>
            {director ? "director" : "network"}
          </div>
          <div className={styles.description}>
            {director ? director : `${network}`}
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.heading}>cast</div>
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
        <div className={`${styles.container}`}>
          <div className={styles.heading}>genres</div>
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
        <div className={styles.container}>
          <div className={styles.heading}>
            {runtime ? "runtime" : "seasons"}
          </div>
          {runtime && (
            <div className={styles.description}>
              {toHoursAndMinutes(runtime)}
            </div>
          )}
          {seasons && (
            <div className={styles.description}>
              {seasons > 1 ? `${seasons} seasons` : `${seasons} season`}
            </div>
          )}
        </div>
      </section>
      <hr />
    </>
  );
};

export default Details;
