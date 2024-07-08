import { ParsedUrlQuery } from "node:querystring";

import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useCallback, useRef } from "react";
import slugify from "slugify";

import Icon from "@/components/Icon/Icon";
import { DEFAULT_GENRE, DEFAULT_NETWORK, DEFAULT_GENERATOR_NETWORK } from "@/constants/app";
import { LOGO_URL_IMAGE } from "@/constants/tmdb";
import useClickOutside from "@/hooks/useClickOutside";
import { Id, Provider, Service } from "@/types/tmdb";

import styles from "../Dropdown/Dropdown.module.scss";

interface DropdownProps {
  /**
   * Media page type (movies or series page)
   */
  type: string;
  /**
   * Genre that is currently selected
   * Used for page route and highlighting genre that has been selected
   */
  selected_genre?: Id;
  /**
   * List of genres for movies or series
   */
  genre_list?: Id[];
  /**
   * For movies and series dropdown to select media type
   */
  media?: string;
  /**
   * List of networks
   */
  network_list?: Provider[] | undefined;
  /**
   * Network that is currently selected
   * Used for page route and highlighting network that has been selected
   */
  selected_network?: Service;
  /**
   * For rendering the appropriate trigger and dropdown
   */
  variant?: "genre" | "media" | "service";
  /**
   * Specifies if the dropdown is on watch page
   * Needed as watch page rootpath is different to movies/series pages
   */
  generator?: boolean;
  /**
   * Styling variations for dropdown
   */
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
  generator,
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

  // Data is stored in session storage if user navigates back to generator page, if selecting preferences, there is no need to store data in session so set up function to remove data when selected preferences.
  const clearSessionStorage = () => {
    sessionStorage.clear();
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
              : selected_network?.provider_name.replace(" Plus", "+")
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
            rootPath={generator ? "/generator/" : "/"}
            style={style}
            generator={generator}
          />
        )}
        {isDropdownOpen && variant === "media" && (
          <DropdownMedia
            closeDropdown={closeDropdown}
            media={media}
            generator={generator}
            style={style}
            clearSessionStorage={clearSessionStorage}
          />
        )}
        {isDropdownOpen && variant === "service" && (
          <DropdownService
            network_list={network_list}
            selected_genre={selected_genre}
            selected_network={selected_network}
            query={query}
            type={type}
            closeDropdown={closeDropdown}
            rootPath={generator ? "/generator/" : "/"}
            style={style}
            generator={generator}
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
  const iconSize = "15";

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
            <Icon icon="chevronDown" width={iconSize} height={iconSize} />
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
  const defaultServiceOption = DEFAULT_GENRE;

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
        let href;
        switch (true) {
          case name === defaultServiceOption.name &&
            !query.slugs?.includes(
              `${selected_network?.provider_name
                .replace(" Plus", "+")
                .toLowerCase()
                .replaceAll(" ", "-")}`
            ):
            href = `${rootPath}${type}`;
            break;
          case name === defaultServiceOption.name &&
            query.slugs?.includes(
              `${selected_network?.provider_name
                .replace(" Plus", "+")
                .toLowerCase()
                .replaceAll(" ", "-")}`
            ):
            href = `${rootPath}${type}/network/${slugify(
              selected_network?.provider_name.replace(" Plus", "+") as string,
              { lower: true }
            ).replace(/and/g, "&")}`;
            break;
          case !query.slugs?.includes(
            `${selected_network?.provider_name
              .replace(" Plus", "+")
              .toLowerCase()
              .replaceAll(" ", "-")}`
          ):
            href = `${rootPath}${type}/genre/${slugify(name, { lower: true }).replace(
              /and/g,
              "&"
            )}`;
            break;
          default:
            href = `${rootPath}${type}/genre/${slugify(name, { lower: true }).replace(
              /and/g,
              "&"
            )}/${slugify(selected_network?.provider_name.replace(" Plus", "+") as string, {
              lower: true,
            }).replace(/and/g, "&")}`;
            break;
        }

        return (
          <li
            key={id}
            className={selected_genre?.name === name ? styles.listItemCurrent : styles.listItem}
          >
            <Link href={href} scroll={false}>
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
  generator?: boolean;
  style: "primary" | "secondary";
  clearSessionStorage: () => void;
}

const DropdownMedia: React.FC<DropdownMediaProps> = ({
  closeDropdown,
  generator,
  media,
  style,
  clearSessionStorage,
}) => {
  const listClasses = [
    styles.list,
    styles.mediaDropdown,
    style === "primary"
      ? styles["primary-list"]
      : style === "secondary"
      ? styles["secondary-list"]
      : "",
  ];
  return (
    <ul className={`${listClasses.join(" ")}`}>
      <DropdownMediaListItem
        media="series"
        closeDropdown={closeDropdown}
        generator={generator}
        isCurrent={media === "series"}
        clearSessionStorage={clearSessionStorage}
      />
      <DropdownMediaListItem
        media="movies"
        closeDropdown={closeDropdown}
        generator={generator}
        isCurrent={media === "movies"}
        clearSessionStorage={clearSessionStorage}
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
  generator?: boolean;
  isCurrent: boolean;
  clearSessionStorage: () => void;
}

const DropdownMediaListItem: React.FC<DropdownMediaListItemProps> = ({
  media,
  closeDropdown,
  generator,
  isCurrent,
  clearSessionStorage,
}) => {
  const listItemClassName = isCurrent ? styles.listItemCurrent : styles.listItem;
  return (
    <>
      <li className={listItemClassName}>
        <Link href={generator ? `/generator/${media}` : `/${media}`} scroll={false}>
          <a
            className={styles.link}
            onClick={() => {
              closeDropdown();
              clearSessionStorage();
            }}
          >
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
  generator?: boolean;
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
  generator,
}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [listItemWidth, setListItemWidth] = useState<number | undefined>();
  const [isListAtStart, setIsListAtStart] = useState(true);
  const [isListAtEnd, setIsListAtEnd] = useState(false);
  const visibleColumns = 2; // Columns visible in services dropdown
  const gap = 2; // gap at end of scroll

  const getListItemRef = useCallback((node: HTMLLIElement | null) => {
    if (node) {
      setListItemWidth(node.offsetWidth);
    }
  }, []);

  const getScrollPosition = () => {
    if (listRef.current) {
      if (listRef.current.scrollLeft > 0) {
        setIsListAtStart(false);
      }

      if (listRef.current.scrollLeft === 0) {
        setIsListAtStart(true);
      }

      if (
        listRef.current.scrollLeft + listRef.current?.offsetWidth + gap >=
        listRef.current?.scrollWidth
      ) {
        setIsListAtEnd(true);
      } else {
        setIsListAtEnd(false);
      }
    }
  };

  const handleClickNext = () => {
    if (listItemWidth && listRef.current) {
      if (
        listRef.current.scrollLeft + listRef.current?.offsetWidth + gap >=
        listRef.current?.scrollWidth
      )
        return;

      listRef.current.scrollLeft += listItemWidth * visibleColumns;
    }
  };
  const handleClickPrev = () => {
    if (listItemWidth && listRef.current) {
      if (listRef.current.scrollLeft === 0) return;

      listRef.current.scrollLeft -= listItemWidth * visibleColumns;
    }
  };

  const defaultServiceOption = generator ? DEFAULT_GENERATOR_NETWORK : DEFAULT_NETWORK;
  const listClasses = [
    styles.servicesList,
    style === "primary"
      ? styles["primary-list"]
      : style === "secondary"
      ? styles["secondary-list"]
      : "",
  ];
  return (
    <div className={`${listClasses.join(" ")}`}>
      <ul ref={listRef} onScroll={getScrollPosition}>
        {network_list?.map(({ provider_id, provider_name, logo_path }) => {
          let href;
          switch (true) {
            case provider_name === defaultServiceOption.provider_name &&
              !query.slugs?.includes(`${selected_genre?.name?.toLowerCase().replaceAll(" ", "-")}`):
              href = `${rootPath}${type}`;
              break;
            case provider_name === defaultServiceOption.provider_name &&
              query.slugs?.includes(`${selected_genre?.name.toLowerCase().replaceAll(" ", "-")}`):
              href = `${rootPath}${type}/genre/${slugify(selected_genre?.name as string, {
                lower: true,
              }).replace(/and/g, "&")}`;
              break;
            case !query.slugs?.includes(
              `${selected_genre?.name.toLowerCase().replaceAll(" ", "-")}`
            ):
              href = `${rootPath}${type}/network/${slugify(provider_name.replace(" Plus", "+"), {
                lower: true,
              }).replace(/and/g, "&")}`;
              break;
            default:
              href = `${rootPath}${type}/genre/${slugify(selected_genre?.name as string, {
                lower: true,
              }).replace(/and/g, "&")}/${slugify(provider_name.replace(" Plus", "+"), {
                lower: true,
              }).replace(/and/g, "&")}`;
              break;
          }

          return (
            <li
              key={provider_id}
              className={
                selected_network?.provider_name === provider_name
                  ? styles.listItemCurrent
                  : styles.listItem
              }
              ref={getListItemRef}
            >
              <Link href={href} scroll={false}>
                <a className={styles.link} onClick={closeDropdown}>
                  {provider_name.replace(" Plus", "+")}
                </a>
              </Link>
              {logo_path ? (
                <Image
                  src={`${LOGO_URL_IMAGE}${logo_path}`}
                  alt="network-logo"
                  unoptimized={true}
                  className={styles.icon}
                  width={20}
                  height={20}
                />
              ) : (
                <div className={styles.placeholder}></div>
              )}
            </li>
          );
        })}
      </ul>

      <span className={styles.navContainer}>
        <button
          type="button"
          onClick={handleClickPrev}
          className={styles.navButton}
          aria-label="left"
          disabled={isListAtStart}
        >
          <Icon icon="chevronLeft" fill={isListAtStart ? "var(--tertiary)" : "var(--quinary)"} />
        </button>
        <button
          type="button"
          onClick={handleClickNext}
          className={styles.navButton}
          aria-label="right"
          disabled={isListAtEnd}
        >
          <Icon icon="chevronRight" fill={isListAtEnd ? "var(--tertiary)" : "var(--quinary)"} />
        </button>
      </span>
    </div>
  );
};
