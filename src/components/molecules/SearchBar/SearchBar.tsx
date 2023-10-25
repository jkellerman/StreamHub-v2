import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState, useEffect, useRef } from "react";

import ArrowButton from "@/components/atoms/Buttons/SearchBar/Arrow";
import CloseButton from "@/components/atoms/Buttons/SearchBar/Close";
import Spinner from "@/components/atoms/Spinner/SearchBar/Spinner";
import { POSTER_URL_IMAGE_XS } from "@/constants/tmdb";
import useClickOutside from "@/hooks/useClickOutside";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import img from "@/public/assets/icon-search.svg";

import styles from "../SearchBar/SearchBar.module.scss";

interface IMovieData {
  known_for_department: string;
}

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const searchResultsRef = useRef<HTMLUListElement>(null);
  const searchResultsItems = searchResultsRef.current?.children;
  const containerRef = useClickOutside<HTMLDivElement>(() => handleIsSearchBoxActive());
  const [searchIsActive, setSearchIsActive] = useState(false);

  // Handle when the search box is deactivated
  const handleIsSearchBoxActive = () => {
    setSearchQuery("");
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
        const slug = title || name;
        const route = title ? `/movie/${id}` : `/show/${id}`;
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

  useEffect(() => {
    try {
      if (searchQuery.length >= 2) {
        const fetchSearchResults = async () => {
          const endpoint = `/api/search/multi/${searchQuery}`;
          const res = await fetch(endpoint);
          const data = await res.json();
          const filteredArray = data.data.results.filter(
            (item: IMovieData) => !item.known_for_department
          );
          const slicedArr = filteredArray.slice(0, 5);
          setIsLoading(true);
          setSearchResults(slicedArr);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000); // delay loading state for better user experience
          setIsError(false);
        };
        fetchSearchResults();
      } else if (searchQuery.length <= 1) {
        setSearchResults([]);
        setActiveResultIndex(-1);
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
    }
  }, [searchQuery]);

  // Calculate container height for smooth transition
  useEffect(() => {
    const calculateContainerHeight = () => {
      if (searchResultsRef.current) {
        const containerHeight = searchResultsRef.current.getBoundingClientRect().height;
        const rootFontSize = 16;
        const containerHeightInRems = containerHeight / rootFontSize;
        const margin = 4;
        if (searchResults.length > 0 && !isLoading) {
          (containerRef.current as HTMLDivElement).style.height = `${
            containerHeightInRems + margin
          }rem`;
        }
      } else if (searchResults.length === 0 && searchQuery.length <= 2) {
        const baseHeight = 2.75;
        (containerRef.current as HTMLDivElement).style.height = `${baseHeight}rem`;
      } else {
        const noSuggestionsHeight = 14;
        (containerRef.current as HTMLDivElement).style.height = `${noSuggestionsHeight}rem`;
      }
    };
    calculateContainerHeight();
  }, [searchQuery.length, searchResults.length, isLoading, containerRef]);

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
        {searchQuery.length >= 1 && <ArrowButton setQuery={setSearchQuery} />}
        {children}
        {searchQuery.length >= 1 && <CloseButton setQuery={setSearchQuery} />}
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
  const isMobile = useMediaQuery(`(max-width: 504px)`);

  return (
    <>
      <input
        type="text"
        name="search"
        aria-label="Search"
        placeholder={isMobile ? "Search..." : "Where can I watch..."}
        className={styles.input}
        value={searchQuery}
        onChange={handleInputChange}
        maxLength={20}
      />
      <Image src={img} alt="icon-search" unoptimized={true} className={styles.searchIcon} />
    </>
  );
};
// ====================
// Search Results List
// ====================
interface SearchResultsListProps extends SearchQuery {
  isError: boolean;
  isLoading: boolean;
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

  if (!isLoading && searchQuery.length > 2 && searchResults.length === 0) {
    return <div className={styles.noResultsContainer}>no suggestions found</div>;
  }

  return null;
};

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
  const isMovie = !!title;
  const slug = isMovie ? title?.replace(/ /g, "-") : name?.replace(/ /g, "-");
  const itemType = isMovie ? "movie" : "show";

  return (
    <li className={`${styles.listItemWrapper} ${index === activeIndex && styles.isActive}`}>
      <Link href={`/${itemType}/${id}?${slug}`}>
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
          </div>
          <div>
            <span>
              {name || title}&nbsp;&nbsp;(
              {release_date?.substring(0, 4) || first_air_date?.substring(0, 4)})
            </span>
            {name && <span className={styles.tv}>TV</span>}
          </div>
        </a>
      </Link>
    </li>
  );
};
