import styles from "@/components/Details/Details.module.css";
import Link from "next/link";
import { toHoursAndMinutes } from "@/utils/utils";

const Details = ({
  director,
  cast,
  genres,
  genre_list,
  runtime,
  network,
  seasons,
}) => {
  return (
    <section className={styles.details}>
      <div className={styles.container}>
        <h4 className={styles.heading}>{director ? "director" : "network"}</h4>
        <div className={styles.description}>
          {director ? director : `${network}`}
        </div>
      </div>
      <div className={styles.container}>
        <h4 className={styles.heading}>cast</h4>
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
        <h4 className={styles.heading}>genres</h4>
        <div className={styles.linksContainer}>
          {genres.map((genre) => {
            const genreParam = genre_list.genres.find(
              (param) => param.name === genre.name
            );
            return (
              <Link
                key={genre.id}
                href={`/movies/genre/${genreParam.id}?name=${genreParam.name}`}
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
        <h4 className={styles.heading}>{runtime ? "runtime" : "seasons"}</h4>
        {runtime && (
          <div className={styles.description}>{toHoursAndMinutes(runtime)}</div>
        )}
        {seasons && (
          <div className={styles.description}>
            {seasons > 1 ? `${seasons} seasons` : `${seasons} season`}
          </div>
        )}
      </div>
    </section>
  );
};

export default Details;
