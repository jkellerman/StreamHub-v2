import Link from "next/link";
import QueryString from "qs";
import React, { useState, useCallback } from "react";

import Icon from "@/components/Icon/Icon";
import useClickOutside from "@/hooks/useClickOutside";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Genres, Media } from "@/src/types";

import styles from "../Dropdown/Dropdown.module.scss";

interface DropdownProps {
  type: string;
  selected_genre?: Genres.IGenre;
  genre_list?: Genres.IGenre[];
  media?: string;
  services_list?: Media.IServices[] | undefined;
  selected_service?: Media.IServices;
}

const Dropdown: React.FC<DropdownProps> = ({
  type,
  selected_genre,
  genre_list,
  media,
  services_list,
  selected_service,
}) => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLUListElement>(() => setIsDropDownOpen(false));

  const toggleDropdown = useCallback(() => {
    setIsDropDownOpen((prev) => !prev);
  }, []);

  return (
    <>
      {selected_genre && (
        <DropdownTrigger
          toggleDropdown={toggleDropdown}
          name={selected_genre.name}
          isDropdownOpen={isDropdownOpen}
        />
      )}
      {media && (
        <DropdownTrigger
          toggleDropdown={toggleDropdown}
          name={type}
          isDropdownOpen={isDropdownOpen}
        />
      )}
      {selected_service && (
        <DropdownTrigger
          toggleDropdown={toggleDropdown}
          name={selected_service.provider_name}
          isDropdownOpen={isDropdownOpen}
        />
      )}

      {isDropdownOpen && selected_genre && (
        <ul className={styles.list} ref={dropdownRef}>
          {genre_list?.map(({ id, name }) => {
            return (
              <li
                key={id}
                className={selected_genre?.name === name ? styles.listItemCurrent : styles.listItem}
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
      {isDropdownOpen && media && (
        <ul className={styles.mediaList} ref={dropdownRef}>
          <li className={media === "movies" ? styles.listItemCurrent : styles.listItem}>
            <Link href={"/movies"}>
              <a className={styles.link} onClick={toggleDropdown}>
                Movies
              </a>
            </Link>
          </li>
          <li className={media === "series" ? styles.listItemCurrent : styles.listItem}>
            <Link href={"/series"}>
              <a className={styles.link} onClick={toggleDropdown}>
                TV series
              </a>
            </Link>
          </li>
        </ul>
      )}

      {isDropdownOpen && selected_service && (
        <ul className={styles.servicesList} ref={dropdownRef}>
          {services_list?.map(({ provider_id, provider_name }) => {
            return (
              <li
                key={provider_id}
                className={
                  selected_service?.provider_name === provider_name
                    ? styles.listItemCurrent
                    : styles.listItem
                }
              >
                <Link
                  href={`/${type}?${QueryString.stringify({
                    genre: provider_name.toLowerCase(),
                  })}`}
                >
                  <a className={styles.link} onClick={toggleDropdown}>
                    {provider_name}
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

// ==============
// Dropdown Container
// ==============
interface DropdownsContainerProps {
  children: React.ReactNode;
}

export const DropdownsContainer: React.FC<DropdownsContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

// ==============
// Dropdown Trigger
// ==============

interface DropdownTriggerProps {
  toggleDropdown: () => void;
  name: string;
  isDropdownOpen: boolean;
}

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  toggleDropdown,
  name,
  isDropdownOpen,
}) => {
  const isMobile = useMediaQuery(`(max-width: 504px)`);
  const sm = "15";
  const lg = "20";

  const iconHeight = isMobile ? sm : lg;
  const iconWidth = isMobile ? sm : lg;
  return (
    <button type="button" className={styles.button} onClick={toggleDropdown}>
      <>
        {name}
        <div
          className={
            isDropdownOpen
              ? `${styles.chevron} ${styles.open}`
              : `${styles.chevron} ${styles.closed}`
          }
        >
          <span className={styles.icon}>
            <Icon icon="chevronDown" width={iconWidth} height={iconHeight} />
          </span>
        </div>
      </>
    </button>
  );
};
