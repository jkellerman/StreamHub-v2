import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "../Dropdown/Dropdown.module.css";
import QueryString from "qs";
import Button from "@/components/atoms/Button/Button";
import { Genres } from "types";

interface DropdownProps {
  type: string;
  selected_genre: Genres.IGenre;
  genre_list: Genres.IGenre[];
}

const Dropdown: React.FC<DropdownProps> = ({
  type,
  selected_genre,
  genre_list,
}) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsDropDownOpen(!isDropdownOpen);
  }, [isDropdownOpen]);

  useEffect(() => {
    // Close dropdown when click outside dropdown box
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        toggleDropdown();
      }
    };
    // Prevent user from scrolling (for when mobile list is open)
    document.body.classList.toggle("no-scroll", isDropdownOpen);

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownOpen, toggleDropdown]);

  return (
    <div>
      <Button
        toggleDropdown={toggleDropdown}
        name={selected_genre.name}
        dropdown
      />

      <ul
        className={
          isDropdownOpen ? `${styles.list} ${styles.open}` : `${styles.list}`
        }
        ref={dropdownRef}
      >
        {genre_list.map(({ id, name }) => {
          return (
            <li
              key={id}
              className={
                selected_genre.name === name
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
      </ul>
    </div>
  );
};

export default Dropdown;
