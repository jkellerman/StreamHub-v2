import styles from "../Dropdown/Dropdown.module.css";
import Link from "next/link";

const Dropdown = ({ movies, series }) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>
          popular{" "}
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
          <li className={styles.listItem}>
            <Link href="/movies">
              <a>Popular</a>
            </Link>
          </li>
          {movies.map((genre) => {
            return (
              <li key={genre.id} className={styles.listItem}>
                {genre.name}
              </li>
            );
          })}
        </ul>
      )}

      {series && (
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/series">
              <a>Popular</a>
            </Link>
          </li>
          {series.map((genre) => {
            return (
              <li key={genre.id} className={styles.listItem}>
                {genre.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
