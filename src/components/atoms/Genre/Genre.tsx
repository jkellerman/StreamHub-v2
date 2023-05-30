import Link from "next/link";
import QueryString from "qs";

import styles from "./Genre.module.scss";

interface GenreProps {
  id: number;
  name: string;
  movies?: boolean;
}

const Genre: React.FC<GenreProps> = ({ id, name, movies }) => {
  return (
    <span className={styles.name} key={id}>
      <Link
        href={
          movies
            ? `/movies?${QueryString.stringify({
                genre: name.toLowerCase(),
              })}`
            : `/series?${QueryString.stringify({
                genre: name.toLowerCase(),
              })}`
        }
      >
        <a className={`${styles.genre} `}>{name}</a>
      </Link>
    </span>
  );
};

export default Genre;
