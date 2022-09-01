import { useState, useRef, useEffect } from "react";
import styles from "../Dropdown/Dropdown.module.css";
import Link from "next/link";
import DropdownButton from "../DropdownButton/DropdownButton";

const Dropdown = ({ movies, series, genres }) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const dropDownRef = useRef();

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };

  const checkIfClickedOutside = (e) => {
    if (
      isDropdownOpen &&
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target)
    ) {
      setIsDropDownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className={styles.dropdown}>
      <DropdownButton toggleDropDown={toggleDropDown} genres={genres} />
      {movies && isDropdownOpen && (
        <ul className={styles.list} ref={dropDownRef}>
          <li className={movies ? styles.listItemCurrent : styles.listItem}>
            <Link href="/movies">
              <a className={styles.link} onClick={toggleDropDown}>
                Popular
              </a>
            </Link>
          </li>
          {movies.map((genre) => {
            return (
              <li
                key={genre.id}
                className={genres ? styles.listItemCurrent : styles.listItem}
              >
                <Link href={`movies/genre/${genre.id}`}>
                  <a className={styles.link} onClick={toggleDropDown}>
                    {genre.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {series && isDropdownOpen && (
        <ul className={styles.list} ref={dropDownRef}>
          <li className={series ? styles.listItemCurrent : styles.listItem}>
            <Link href="/series">
              <a className={styles.link} onClick={toggleDropDown}>
                Popular
              </a>
            </Link>
          </li>
          {series.map((genre) => {
            return (
              <li
                key={genre.id}
                className={genres ? styles.listItemCurrent : styles.listItem}
              >
                <Link href={`series/genre/${genre.id}`}>
                  <a className={styles.link} onClick={toggleDropDown}>
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
