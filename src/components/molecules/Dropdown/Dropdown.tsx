import Link from "next/link";
import QueryString from "qs";
import React, { useState, useCallback } from "react";

import Button from "@/components/atoms/Buttons/Dropdown/Button";
import useClickOutside from "@/hooks/useClickOutside";
import { Genres } from "@/src/types";

import styles from "../Dropdown/Dropdown.module.scss";

interface DropdownProps {
  type: string;
  selected_genre: Genres.IGenre;
  genre_list: Genres.IGenre[];
}

const Dropdown: React.FC<DropdownProps> = ({ type, selected_genre, genre_list }) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLUListElement>(() => setIsDropDownOpen(false));

  const toggleDropdown = useCallback(() => {
    setIsDropDownOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Button
        toggleDropdown={toggleDropdown}
        name={selected_genre.name}
        isDropdownOpen={isDropdownOpen}
      />

      {isDropdownOpen && (
        <ul className={styles.list} ref={dropdownRef}>
          {genre_list.map(({ id, name }) => {
            return (
              <li
                key={id}
                className={selected_genre.name === name ? styles.listItemCurrent : styles.listItem}
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
      )}
    </>
  );
};

export default Dropdown;
