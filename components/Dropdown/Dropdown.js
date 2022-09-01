import styles from "../Dropdown/Dropdown.module.css";
import Link from "next/link";

const Dropdown = ({ movies, series, genres }) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>
          {genres ? `${genres}` : "popular"}
          <svg
            width="10"
            height="7"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.chevron}
          >
            <path
              d="M1 .799l4 4 4-4"
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {movies && (
        <ul className={styles.list}>
          <li className={movies ? styles.listItemCurrent : styles.listItem}>
            <Link href="/movies">
              <a className={styles.link}>Popular</a>
            </Link>
          </li>
          {movies.map((genre) => {
            return (
              <li
                key={genre.id}
                className={genres ? styles.listItemCurrent : styles.listItem}
              >
                <Link href={`movies/genre/${genre.id}`}>
                  <a className={styles.link}>{genre.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {series && (
        <ul className={styles.list}>
          <li className={series ? styles.listItemCurrent : styles.listItem}>
            <Link href="/movies">
              <a className={styles.link}>Popular</a>
            </Link>
          </li>
          {series.map((genre) => {
            return (
              <li
                key={genre.id}
                className={genres ? styles.listItemCurrent : styles.listItem}
              >
                <Link href={`movies/genre/${genre.id}`}>
                  <a className={styles.link}>{genre.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
