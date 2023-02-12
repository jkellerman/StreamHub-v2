import Link from "next/link";
import styles from "../MediaGenres/MediaGenres.module.css";
import QueryString from "qs";

const MediaQueries = ({ genres, movies }) => {
  return (
    <div className={styles.detailItem}>
      <div>
        <dt className={styles.heading}>genres</dt>
      </div>
      <div className={styles.group}>
        {genres.map((genre) => {
          return (
            <dd className={styles.name} key={genre.id}>
              <Link
                href={
                  movies
                    ? `/movies?${QueryString.stringify({
                        genre: genre.name.toLowerCase(),
                      })}`
                    : `/series?${QueryString.stringify({
                        genre: genre.name.toLowerCase(),
                      })}`
                }
              >
                <a className={`${styles.genre} `}>{genre.name}</a>
              </Link>
            </dd>
          );
        })}
      </div>
    </div>
  );
};

export default MediaQueries;
