import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "../Dropdown/Dropdown.module.css";
import QueryString from "qs";
import Button from "@/components/atoms/Button/Button";

const Dropdown = ({ type, selectedGenre, genreList }) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Close dropdown when click outside dropdown box
    const checkIfClickedOutside = (e) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        toggleDropdown();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownOpen]);

  useEffect(() => {
    // Prevent user from scrolling (for when mobile list is open)
    document.body.classList.toggle("no-scroll", isDropdownOpen);
  }, [isDropdownOpen]);

  return (
    <div>
      <Button
        toggleDropdown={toggleDropdown}
        name={selectedGenre.name}
        dropdown
      />

      <ul
        className={
          isDropdownOpen ? `${styles.list} ${styles.open}` : `${styles.list}`
        }
        ref={dropdownRef}
      >
        <div className={styles.listContainer}>
          {genreList.map(({ id, name }) => {
            return (
              <li
                key={id}
                className={
                  selectedGenre.name === name
                    ? styles.listItemCurrent
                    : styles.listItem
                }
              >
                <Link
                  href={`/${type}?${QueryString.stringify({
                    genre: name.toLowerCase(),
                  })}`}
                >
                  <a className={styles.link} onClick={toggleDropdown}>
                    {name}
                  </a>
                </Link>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default Dropdown;
