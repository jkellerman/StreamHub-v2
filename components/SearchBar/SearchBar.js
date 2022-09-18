import styles from "../SearchBar/SearchBar.module.css";
import Image from "next/image";
import img from "@/public/assets/icon-search.svg";
import { useState } from "react";
import { useRouter } from "next/router";

const Search = ({ all, movies, series, hero }) => {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (all) {
      router.push(`/search/all/${query.replaceAll(" ", "-")}`);
    } else if (movies) {
      router.push(`/search/movies/${query.replaceAll(" ", "-")}`);
    } else if (series) {
      router.push(`/search/series/${query.replaceAll(" ", "-")}`);
    }
  };
  return (
    <form
      className={hero ? styles.heroSearch : styles.form}
      onSubmit={handleSubmit}
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      {movies && (
        <input
          type="text"
          name="search"
          aria-label="Search"
          placeholder="Search for movies"
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      {series && (
        <input
          type="text"
          name="search"
          aria-label="Search"
          placeholder="Search for TV series"
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
    </form>
  );
};

export default Search;
