import { useState, useRef, useEffect } from "react";
import styles from "../Dropdown/Dropdown.module.css";
import Link from "next/link";
import DropdownButton from "../DropdownButton/DropdownButton";

const Dropdown = ({ type, name, popular, movieGenreList, seriesGenreList }) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const dropDownRef = useRef();

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Close dropdown when click outside dropdown box
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

  useEffect(() => {
    // Prevent user from scrolling (for when mobile list is open)
    const body = document.querySelector("body");
    if (isDropdownOpen) return body.classList.add("noScroll");
    return body.classList.remove("noScroll");
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
          <div className={styles.listContainer}>
            <li className={popular ? styles.listItemCurrent : styles.listItem}>
              <Link href="/movies">
                <a className={styles.link} onClick={toggleDropdown}>
                  Popular
                </a>
              </Link>
            </li>

            {movieGenreList.genres.map((genre) => {
              return (
                <li
                  key={genre.id}
                  className={
                    name === genre.name
                      ? styles.listItemCurrent
                      : styles.listItem
                  }
                >
                  <Link
                    href={`/movies/genre/${genre.id}?name=${genre.name}`.replace(
                      /\s+/g,
                      "-"
                    )}
                  >
                    <a className={styles.link} onClick={toggleDropdown}>
                      {genre.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </div>
        </ul>
      )}

      {type === "series" && isDropdownOpen && (
        <ul className={styles.list} ref={dropDownRef}>
          <div className={styles.listContainer}>
            <li className={popular ? styles.listItemCurrent : styles.listItem}>
              <Link href="/series">
                <a className={styles.link} onClick={toggleDropdown}>
                  Popular
                </a>
              </Link>
            </li>
            {seriesGenreList.genres.map((genre) => {
              return (
                <li
                  key={genre.id}
                  className={
                    name === genre.name
                      ? styles.listItemCurrent
                      : styles.listItem
                  }
                >
                  <Link
                    href={`/series/genre/${genre.id}?name=${genre.name}`.replace(
                      /\s+/g,
                      "-"
                    )}
                  >
                    <a className={styles.link} onClick={toggleDropdown}>
                      {genre.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </div>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
