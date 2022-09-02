import { useState, useRef, useEffect } from "react";
import styles from "../Dropdown/Dropdown.module.css";
import Link from "next/link";
import DropdownButton from "../DropdownButton/DropdownButton";
import MovieGenres from "@/data/movies.json";
import SeriesGenres from "@/data/series.json";

const Dropdown = ({ type, name, popular }) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const dropDownRef = useRef();

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isDropdownOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target)
      ) {
        setIsDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className={styles.dropdown}>
      <DropdownButton
        toggleDropdown={toggleDropdown}
        popular={popular}
        name={name}
      />

      {type === "movies" && isDropdownOpen && (
        <ul className={styles.list} ref={dropDownRef}>
          <li className={popular ? styles.listItemCurrent : styles.listItem}>
            <Link href="/movies">
              <a className={styles.link} onClick={toggleDropdown}>
                Popular
              </a>
            </Link>
          </li>

          {MovieGenres.genres.map((genre) => {
            return (
              <li
                key={genre.id}
                className={
                  name === genre.name ? styles.listItemCurrent : styles.listItem
                }
              >
                <Link href={`/movies/genre/${genre.id}`}>
                  <a className={styles.link} onClick={toggleDropdown}>
                    {genre.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {type === "series" && isDropdownOpen && (
        <ul className={styles.list} ref={dropDownRef}>
          <li className={popular ? styles.listItemCurrent : styles.listItem}>
            <Link href="/series">
              <a className={styles.link} onClick={toggleDropdown}>
                Popular
              </a>
            </Link>
          </li>
          {SeriesGenres.genres.map((genre) => {
            return (
              <li
                key={genre.id}
                className={
                  name === genre.name ? styles.listItemCurrent : styles.listItem
                }
              >
                <Link href={`/series/genre/${genre.id}`}>
                  <a className={styles.link} onClick={toggleDropdown}>
                    {genre.name}
                  </a>
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
