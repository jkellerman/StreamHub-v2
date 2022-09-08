import styles from "@/components/Details/Details.module.css";
import Link from "next/link";
import { toHoursAndMinutes } from "@/utils/utils";

const Details = ({ director, cast, genres, genreList, runtime }) => {
  return (
    <section className={styles.details}>
      <div className={styles.container}>
        <h4 className={styles.heading}>director</h4>
        <div className={styles.description}>{director}</div>
      </div>
      <div className={styles.container}>
        <h4 className={styles.heading}>cast</h4>
        <ul className={styles.castContainer}>
          {cast.map((member) => {
            return (
              <li className={styles.description} key={member.id}>
                {member.name},&nbsp;
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`${styles.container}`}>
        <h4 className={styles.heading}>genres</h4>
        <div className={styles.linksContainer}>
          {genres.map((genre) => {
            const genreParam = genreList.genres.find(
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
        <h4 className={styles.heading}>runtime</h4>
        <div className={styles.description}>{toHoursAndMinutes(runtime)}</div>
      </div>
    </section>
  );
};

export default Details;
