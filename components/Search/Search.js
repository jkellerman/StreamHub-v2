import styles from "../Search/Search.module.css";
import Image from "next/image";
import img from "@/public/assets/icon-search.svg";

const Search = ({ all, movies, series }) => {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
      autoComplete="off"
    >
      <div className={styles.imageContainer}>
        <Image src={img} alt="icon-search" layout="fill" objectFit="contain" />
      </div>
      {all && (
        <input
          type="text"
          name="search"
          aria-label="Search"
          placeholder="Search for movies or TV series"
          className={styles.input}
        />
      )}
      {movies && (
        <input
          type="text"
          name="search"
          aria-label="Search"
          placeholder="Search for movies"
          className={styles.input}
        />
      )}
      {series && (
        <input
          type="text"
          name="search"
          aria-label="Search"
          placeholder="Search for TV series"
          className={styles.input}
        />
      )}
    </form>
  );
};

export default Search;
