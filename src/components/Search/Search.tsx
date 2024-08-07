import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState, useEffect, useRef } from "react";
import slugify from "slugify";
import { useDebouncedCallback } from "use-debounce";

import Icon from "@/components/Icon/Icon";
import Spinner from "@/components/Spinner/SearchBar/Spinner";
import { POSTER_URL_IMAGE_XS } from "@/constants/tmdb";
import useClickOutside from "@/hooks/useClickOutside";
import { useRegion } from "@/src/context/regionContext";
import { MediaList } from "@/types/tmdb";
import { fetcher } from "@/utils/tmdbDataHelpers";

import styles from "../Search/Search.module.scss";

interface SearchResults {
  id: number;
  name?: string;
  title?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string;
}

interface SearchQuery {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}

const Search: React.FC = () => {
  const router = useRouter();
  const { region } = useRegion();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [isError, setIsError] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const searchResultsRef = useRef<HTMLUListElement>(null);
  const searchResultsItems = searchResultsRef.current?.children;
  const containerRef = useClickOutside<HTMLDivElement>(() => handleIsSearchBoxActive());
  const [searchIsActive, setSearchIsActive] = useState(false);

  // Handle whether searchbar is active
  const handleIsSearchBoxActive = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchIsActive(false);
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.length > 0 && activeResultIndex === -1) {
      router.push(`/search/multi/${searchQuery.replace(/ /g, "-")}`);
      setSearchQuery("");
    }
  };

  // Search Results list navigation

  const handleArrowDown = () => {
    if (searchResults?.length > 0 && activeResultIndex < searchResults.length) {
      setActiveResultIndex(activeResultIndex + 1);
      if (searchResultsItems) {
        searchResultsItems[activeResultIndex + 1].classList.add("isActive");
      }
    }
  };

  const handleArrowUp = () => {
    if (searchResultsItems?.length !== undefined && activeResultIndex > 0) {
      setActiveResultIndex(activeResultIndex - 1);
      if (searchResultsItems) {
        searchResultsItems[activeResultIndex - 1];
      }
    }
  };

  const handleEnter = () => {
    if (activeResultIndex === searchResults.length) {
      router.push(`/search/multi/${searchQuery.replace(/ /g, "-")}`);
      setSearchQuery("");
    } else if (searchResultsItems?.length !== undefined && activeResultIndex > -1) {
      const result = searchResults[activeResultIndex];
      if (result) {
        const { id, title, name } = result;
        const slug = title ?? name;
        const route = title ? `/movie/${id}/${region}` : `/show/${id}/${region}`;
        router.push(`${route}?${slug?.replace(/ /g, "-")}`);
        setSearchQuery("");
      }
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        handleArrowDown();
        break;
      case "ArrowUp":
        handleArrowUp();
        break;
      case "Enter":
        handleEnter();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResultsItems, activeResultIndex, searchResults, router, searchQuery]);

  // Fetch search results when searchQuery changes
  const fetchSearchResultsDebounced = useDebouncedCallback(async (query: string) => {
    try {
      const endpoint = `/api/search/multi/${query}`;
      const data = await fetcher<MediaList>(endpoint);

      const filteredArray = data.data.results.filter((item) => !item.known_for_department);
      const slicedArr = filteredArray.slice(0, 5);
      setSearchResults(slicedArr);
      setTimeout(() => {
        setIsLoading(false);
      }, 300); // delay loading state for better user experience
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }, 500);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setIsLoading(true);
      fetchSearchResultsDebounced(searchQuery);
    } else if (searchQuery.length === 0) {
      setSearchResults([]);
      setActiveResultIndex(-1);
      setIsLoading(null); // Reset to null is in place to prevent 'no suggestions' from rendering in between when the user types into search input and when the data is being fetched
      setIsError(false);
    }
  }, [fetchSearchResultsDebounced, searchQuery]);

  // Calculate container height for smooth transition
  useEffect(() => {
    const calculateContainerHeight = () => {
      if (searchResultsRef.current) {
        const containerHeight = searchResultsRef.current.getBoundingClientRect().height;
        const rootFontSize = 16;
        const containerHeightInRems = containerHeight / rootFontSize;
        const margin = 3;
        // Sets the size of container when there are results in the list
        if (searchResults.length > 0 && !isLoading) {
          (containerRef.current as HTMLDivElement).style.height = `${
            containerHeightInRems + margin
          }rem`;
        }
        // Sets height of container when there are no results in the list
      } else if (searchResults.length === 0 && searchQuery.length <= 2) {
        const baseHeight = 2.75;
        (containerRef.current as HTMLDivElement).style.height = `${baseHeight}rem`;
        // Sets the height of container when the user searches for movie/series but there are no suggestions.
      } else {
        const noSuggestionsHeight = 14;
        (containerRef.current as HTMLDivElement).style.height = `${noSuggestionsHeight}rem`;
      }
    };
    calculateContainerHeight();
  }, [searchQuery, searchResults, isLoading, containerRef]);

  return (
    <SearchContainer
      searchIsActive={searchIsActive}
      containerRef={containerRef}
      setSearchIsActive={setSearchIsActive}
    >
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSubmit={handleSubmit}
      >
        <SearchInput searchQuery={searchQuery} handleInputChange={handleInputChange} />
      </SearchForm>

      <SearchResultsList
        isError={isError}
        isLoading={isLoading}
        searchResults={searchResults}
        activeResultIndex={activeResultIndex}
        searchResultsRef={searchResultsRef}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />
    </SearchContainer>
  );
};

export default Search;

// ====================
// Search Container
// ====================

interface SearchContainerProps {
  searchIsActive: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  setSearchIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  searchIsActive,
  containerRef,
  setSearchIsActive,
  children,
}) => {
  return (
    <div
      className={searchIsActive ? `${styles.container} ${styles.active}` : styles.container}
      ref={containerRef}
      onClick={() => setSearchIsActive(true)}
    >
      {children}
    </div>
  );
};

// ====================
// Search Form
// ====================

interface SearchFormProps extends SearchQuery {
  children: React.ReactNode;
  handleSubmit: (e: FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchQuery,
  setSearchQuery,
  children,
  handleSubmit,
}) => {
  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <button
          type="submit"
          className={styles.searchIcon}
          onClick={handleSubmit}
          aria-label="search"
        >
          <Icon icon="search" width="24" height="24" />
        </button>
        {children}
        {searchQuery.length >= 1 && (
          <button type="button" className={styles.closeButton} onClick={() => setSearchQuery("")}>
            <Icon icon="close" width="17" height="17" />
          </button>
        )}
      </form>
    </div>
  );
};

// ====================
// Search Input
// ====================

interface SearchInputProps {
  searchQuery: string;
  handleInputChange: (e: FormEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, handleInputChange }) => {
  return (
    <>
      <input
        type="text"
        name="search"
        aria-label="Search"
        placeholder="Search for any movie or tv series..."
        className={styles.input}
        value={searchQuery}
        onChange={handleInputChange}
        maxLength={20}
      />
    </>
  );
};
// ====================
// Search Results List
// ====================
interface SearchResultsListProps extends SearchQuery {
  isError: boolean;
  isLoading: boolean | null;
  searchResults: SearchResults[];
  activeResultIndex: number;
  searchResultsRef: React.RefObject<HTMLUListElement>;
}
const SearchResultsList: React.FC<SearchResultsListProps> = ({
  isError,
  isLoading,
  searchResults,
  activeResultIndex,
  searchResultsRef,
  setSearchQuery,
  searchQuery,
}) => {
  if (isError) {
    return <div className={styles.error}>Network Error</div>;
  }

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  if (searchResults.length > 0) {
    return (
      <ul className={styles.list} ref={searchResultsRef}>
        {searchResults.map(
          ({ id, name, title, release_date, first_air_date, poster_path }, index) => (
            <SearchListItem
              key={id}
              id={id}
              name={name}
              title={title}
              release_date={release_date}
              first_air_date={first_air_date}
              poster_path={poster_path}
              index={index}
              activeIndex={activeResultIndex}
              setSearchQuery={setSearchQuery}
            />
          )
        )}
        {searchResults.length > 1 && (
          <li
            className={
              activeResultIndex === searchResults.length
                ? `${styles.allResultsLinkWrapper} ${styles.isActive}`
                : styles.allResultsLinkWrapper
            }
          >
            <Link href={`/search/multi/${searchQuery.replace(/ /g, "-")}`}>
              <a onClick={() => setSearchQuery("")}>view all results</a>
            </Link>
          </li>
        )}
      </ul>
    );
  }

  if (isLoading === false && searchQuery.length > 2 && searchResults.length === 0) {
    return <div className={styles.noResultsContainer}>no suggestions found</div>;
  }

  return <div className={styles.loading}></div>;
};

// ====================
// Search List Item
// ====================

interface SearchListItemProps {
  id: number;
  index: number;
  activeIndex: number;
  name: string | undefined;
  title: string | undefined;
  release_date: string | undefined;
  first_air_date: string | undefined;
  poster_path: string | undefined;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchListItem: React.FC<SearchListItemProps> = ({
  id,
  index,
  activeIndex,
  name,
  title,
  release_date,
  first_air_date,
  poster_path,
  setSearchQuery,
}) => {
  const { region } = useRegion();

  return (
    <li className={`${styles.listItemWrapper} ${index === activeIndex && styles.isActive}`}>
      <Link
        href={
          title
            ? `/movie/${id}/${region}?${slugify(title, { lower: true })}`
            : `/show/${id}/${region}?${slugify(name as string, { lower: true })}`
        }
      >
        <a className={styles.listItem} onClick={() => setSearchQuery("")}>
          <div className={styles.posterContainer}>
            {poster_path ? (
              <Image
                src={`${POSTER_URL_IMAGE_XS}/${poster_path}`}
                alt=""
                unoptimized={true}
                width={27}
                height={40}
              />
            ) : (
              <div className={styles.noImage}></div>
            )}
            <span>
              {name || title}&nbsp;&nbsp;(
              {release_date?.substring(0, 4) || first_air_date?.substring(0, 4)})
            </span>
          </div>
          <div>{name && <span className={styles.tv}>TV</span>}</div>
        </a>
      </Link>
    </li>
  );
};
