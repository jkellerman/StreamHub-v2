import Image from "next/future/image";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

import img from "@/public/assets/icon-search.svg";

import styles from "../SearchBar/SearchBar.module.css";

interface SearchProps {
  all?: boolean;
  movies?: boolean;
  series?: boolean;
  hero?: boolean;
}

const Search: React.FC<SearchProps> = ({ all, movies, series, hero }) => {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (all) {
      router.push(`/search/multi/${query.replaceAll(" ", "-")}`);
    } else if (movies) {
      router.push(`/search/movie/${query.replaceAll(" ", "-")}`);
    } else if (series) {
      router.push(`/search/tv/${query.replaceAll(" ", "-")}`);
    }
    setQuery("");
  };
  return (
    <form
      className={hero ? styles.heroSearch : styles.form}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Image
        src={img}
        alt="icon-search"
        unoptimized={true}
        className={styles.searchIcon}
        priority
      />
      <input
        type="text"
        name="search"
        aria-label="Search"
        placeholder={
          all
            ? "Search for movies or TV series"
            : movies
            ? "Search for movies"
            : "Search for TV series"
        }
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Search;
