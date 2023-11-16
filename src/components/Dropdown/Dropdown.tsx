import { ParsedUrlQuery } from "node:querystring";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useCallback } from "react";
import slugify from "slugify";

import Icon from "@/components/Icon/Icon";
import { DEFAULT_WATCH_GENRE, DEFAULT_WATCH_NETWORK } from "@/constants/app";
import useClickOutside from "@/hooks/useClickOutside";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Media } from "@/src/types";

import styles from "../Dropdown/Dropdown.module.scss";

interface DropdownProps {
  // Media page type (movies or series page)
  type: string;
  // Genre that is currently selected
  // Used for page route and highlighting genre that has been selected
  selected_genre?: Media.IGenre;
  // List of genres for movies or series
  genre_list?: Media.IGenre[];
  // For movies and series dropdown to select media type
  media?: string;
  // List of networks
  network_list?: Media.IServices[] | undefined;
  // Network that is currently selected
  // Used for page route and highlighting network that has been selected
  selected_network?: Media.IServices;
  // For rendering the appropriate trigger and dropdown
  variant?: "genre" | "media" | "service";
  // Specifies if the dropdown is on watch page
  // Needed as watch page rootpath is different to movies/series pages
  watch?: boolean;
  // Styling variations for dropdown
  style: "primary" | "secondary";
}

const Dropdown: React.FC<DropdownProps> = ({
  type,
  selected_genre,
  genre_list,
  media,
  network_list,
  selected_network,
  variant,
  watch,
  style,
}) => {
  const { query } = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => closeDropdown());

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div ref={dropdownRef}>
        <DropdownTrigger
          toggleDropdown={toggleDropdown}
          name={
            variant === "genre"
              ? selected_genre?.name
              : variant === "media"
              ? media
              : selected_network?.provider_name
          }
          isDropdownOpen={isDropdownOpen}
          style={style}
        />

        {isDropdownOpen && variant === "genre" && (
          <DropdownGenre
            genre_list={genre_list}
            selected_genre={selected_genre}
            selected_network={selected_network}
            query={query}
            type={type}
            closeDropdown={closeDropdown}
            rootPath={watch ? "/watch/" : "/"}
            style={style}
          />
        )}
        {isDropdownOpen && variant === "media" && (
          <DropdownMedia closeDropdown={closeDropdown} media={media} watch={watch} style={style} />
        )}
        {isDropdownOpen && variant === "service" && (
          <DropdownService
            network_list={network_list}
            selected_genre={selected_genre}
            selected_network={selected_network}
            query={query}
            type={type}
            closeDropdown={closeDropdown}
            rootPath={watch ? "/watch/" : "/"}
            style={style}
          />
        )}
      </div>
    </>
  );
};

export default Dropdown;

// ==============
// Dropdown Containers
// ==============
interface DropdownsContainerProps {
  children: React.ReactNode;
}

export const DropdownsOuterContainer: React.FC<DropdownsContainerProps> = ({ children }) => {
  return <div className={styles.outerContainer}>{children}</div>;
};

export const DropdownsContainer: React.FC<DropdownsContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
export const DropdownsInnerContainer: React.FC<DropdownsContainerProps> = ({ children }) => {
  return <div className={styles.innerContainer}>{children}</div>;
};

// ==============
// Dropdown Trigger
// ==============

interface DropdownTriggerProps {
  toggleDropdown: () => void;
  name?: string;
  isDropdownOpen: boolean;
  style: "primary" | "secondary";
}

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  toggleDropdown,
  name,
  isDropdownOpen,
  style,
}) => {
  const isMobile = useMediaQuery(`(max-width: 504px)`);
  const sm = "15";
  const lg = "15";

  const iconHeight = isMobile ? sm : lg;
  const iconWidth = isMobile ? sm : lg;

  const triggerClasses = [styles.trigger, styles[style]];

  return (
    <button type="button" className={`${triggerClasses.join(" ")}`} onClick={toggleDropdown}>
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

// ==============
// Dropdown List for Genre selection
// ==============

interface DropdownGenreProps extends Omit<Omit<DropdownProps, "network_list">, "variant"> {
  query: ParsedUrlQuery;
  closeDropdown: () => void;
  rootPath: string;
  style: "primary" | "secondary";
}

const DropdownGenre: React.FC<DropdownGenreProps> = ({
  genre_list,
  selected_genre,
  selected_network,
  query,
  type,
  closeDropdown,
  rootPath,
  style,
}) => {
  const listClasses = [
    styles.list,
    style === "primary"
      ? styles["primary-list"]
      : style === "secondary"
      ? styles["secondary-list"]
      : "",
  ];

  return (
    <ul className={`${listClasses.join(" ")}`}>
      {genre_list?.map(({ id, name }) => {
        return (
          <li
            key={id}
            className={selected_genre?.name === name ? styles.listItemCurrent : styles.listItem}
          >
            <Link
              href={
                name === DEFAULT_WATCH_GENRE.name &&
                !query.slugs?.includes(
                  `${selected_network?.provider_name.toLowerCase().replaceAll(" ", "-")}`
                )
                  ? `${rootPath}${type}`
                  : name === DEFAULT_WATCH_GENRE.name &&
                    query.slugs?.includes(
                      `${selected_network?.provider_name.toLowerCase().replaceAll(" ", "-")}`
                    )
                  ? `${rootPath}${type}/network/${slugify(
                      selected_network?.provider_name as string,
                      {
                        lower: true,
                      }
                    ).replace(/and/g, "&")}`
                  : !query.slugs?.includes(
                      `${selected_network?.provider_name.toLowerCase().replaceAll(" ", "-")}`
                    )
                  ? `${rootPath}${type}/genre/${slugify(name, { lower: true }).replace(
                      /and/g,
                      "&"
                    )}`
                  : `${rootPath}${type}/genre/${slugify(name, { lower: true }).replace(
                      /and/g,
                      "&"
                    )}/${slugify(selected_network?.provider_name as string, {
                      lower: true,
                    }).replace(/and/g, "&")}`
              }
              scroll={false}
            >
              <a className={styles.link} onClick={closeDropdown}>
                {name}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

// ==============
// Dropdown List for Media (movies or series)
// ==============

interface DropdownMediaProps {
  media?: string;
  closeDropdown: () => void;
  watch?: boolean;
  style: "primary" | "secondary";
}

const DropdownMedia: React.FC<DropdownMediaProps> = ({ closeDropdown, watch, media, style }) => {
  const listClasses = [
    styles.list,
    style === "primary"
      ? styles["primary-list"]
      : style === "secondary"
      ? styles["secondary-list"]
      : "",
  ];
  return (
    <ul className={`${listClasses.join(" ")}`}>
      <DropdownMediaListItem
        media="movies"
        closeDropdown={closeDropdown}
        watch={watch}
        isCurrent={media === "movies"}
      />
      <DropdownMediaListItem
        media="series"
        closeDropdown={closeDropdown}
        watch={watch}
        isCurrent={media === "series"}
      />
    </ul>
  );
};

// ==============
// Dropdown ListItem for DropdownMedia List
// ==============

interface DropdownMediaListItemProps {
  media?: string;
  closeDropdown: () => void;
  watch?: boolean;
  isCurrent: boolean;
}

const DropdownMediaListItem: React.FC<DropdownMediaListItemProps> = ({
  media,
  closeDropdown,
  watch,
  isCurrent,
}) => {
  const listItemClassName = isCurrent ? styles.listItemCurrent : styles.listItem;
  return (
    <>
      <li className={listItemClassName}>
        <Link href={watch ? `/watch/${media}` : `/${media}`} scroll={false}>
          <a className={styles.link} onClick={closeDropdown}>
            {media}
          </a>
        </Link>
      </li>
    </>
  );
};

// ==============
// Dropdown List for service selection
// ==============

interface DropdownServiceProps extends Omit<Omit<DropdownProps, "genre_list">, "variant"> {
  query: ParsedUrlQuery;
  closeDropdown: () => void;
  rootPath: string;
  style: "primary" | "secondary";
}

const DropdownService: React.FC<DropdownServiceProps> = ({
  network_list,
  selected_network,
  selected_genre,
  query,
  type,
  closeDropdown,
  rootPath,
  style,
}) => {
  const listClasses = [
    styles.list,
    style === "primary"
      ? styles["primary-list"]
      : style === "secondary"
      ? styles["secondary-list"]
      : "",
  ];
  return (
    <ul className={`${listClasses.join(" ")}`}>
      {network_list?.map(({ provider_id, provider_name }) => {
        return (
          <li
            key={provider_id}
            className={
              selected_network?.provider_name === provider_name
                ? styles.listItemCurrent
                : styles.listItem
            }
          >
            <Link
              href={
                provider_name === DEFAULT_WATCH_NETWORK.provider_name &&
                !query.slugs?.includes(
                  `${selected_genre?.name?.toLowerCase().replaceAll(" ", "-")}`
                )
                  ? `${rootPath}${type}`
                  : provider_name === DEFAULT_WATCH_NETWORK.provider_name &&
                    query.slugs?.includes(
                      `${selected_genre?.name.toLowerCase().replaceAll(" ", "-")}`
                    )
                  ? `${rootPath}${type}/genre/${slugify(selected_genre?.name as string, {
                      lower: true,
                    }).replace(/and/g, "&")}`
                  : !query.slugs?.includes(
                      `${selected_genre?.name.toLowerCase().replaceAll(" ", "-")}`
                    )
                  ? `${rootPath}${type}/network/${slugify(provider_name, {
                      lower: true,
                    }).replace(/and/g, "&")}`
                  : `${rootPath}${type}/genre/${slugify(selected_genre?.name as string, {
                      lower: true,
                    }).replace(/and/g, "&")}/${slugify(provider_name, {
                      lower: true,
                    }).replace(/and/g, "&")}`
              }
            >
              <a className={styles.link} onClick={closeDropdown}>
                {provider_name}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
