import styles from "../Search/Search.module.css";

const Search = ({ both, movies, series }) => {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
      autoComplete="off"
    >
      <img
        src="./assets/icon-search.svg"
        alt="icon-search"
        className={styles.iconSearch}
      />
      {both && (
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
