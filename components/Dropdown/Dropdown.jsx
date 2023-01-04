import { useState, useRef, useEffect } from "react";
import styles from "../Dropdown/Dropdown.module.css";
import Link from "next/link";
import DropdownButton from "../DropdownButton/DropdownButton";
import QueryString from "qs";

const Dropdown = ({ type, selectedGenre, genreList }) => {
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
        name={selectedGenre.name}
      />

      {isDropdownOpen && (
        <ul className={styles.list} ref={dropDownRef}>
          <div className={styles.listContainer}>
            {genreList.map(({ id, name}) => {
              return (
                <li
                  key={id}
                  className={
                    selectedGenre.name === name
                      ? styles.listItemCurrent
                      : styles.listItem
                  }
                >
                  <Link href={`/${type}?${QueryString.stringify({genre: name.toLowerCase()})}`}>
                    <a className={styles.link} onClick={toggleDropdown}>
                      {name}
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
