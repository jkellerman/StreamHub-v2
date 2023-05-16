import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState, useEffect, useRef } from "react";

import ArrowButton from "@/components/atoms/Buttons/SearchBar/Arrow";
import CloseButton from "@/components/atoms/Buttons/SearchBar/Close";
import SearchInput from "@/components/atoms/SearchInput/SearchInput";
import SearchListItem from "@/components/atoms/SearchListItem/SearchListItem";
import Spinner from "@/components/atoms/Spinner/SearchBar/Spinner";
import useClickOutside from "@/hooks/useClickOutside";

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

const Search: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchResultsRef = useRef<HTMLUListElement>(null);
  const searchResultsItems = searchResultsRef.current?.children;
  const containerRef = useClickOutside<HTMLDivElement>(() => setSearchQuery(""));

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.currentTarget.value);
  };

  useEffect(() => {
    try {
      if (searchQuery.length >= 2) {
        setIsLoading(true);
        const fetchSearchResults = async () => {
          const endpoint = `/api/search/multi/${searchQuery}`;
          const res = await fetch(endpoint);
          const data = await res.json();
          const filteredArray = data.data.results.filter(
            (item: IMovieData) => !item.known_for_department
          );
          const slicedArr = filteredArray.slice(0, 5);
          setSearchResults(slicedArr);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000); // delay loading state for better user experience
          setIsError(false);
        };
        fetchSearchResults();
      } else if (searchQuery.length <= 1) {
        setSearchResults([]);
        setActiveIndex(-1);
        setIsLoading(false);
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Used for smooth transition of search results height and adjusts height based on search results
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

  const handleInputSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.length > 0 && activeIndex === -1) {
      router.push(`/search/multi/${searchQuery.replace(/ /g, "-")}`);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    // Search results navigation: To navigate through search results with arrow keys
    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          if (searchResults?.length > 0 && activeIndex < searchResults.length) {
            setActiveIndex(activeIndex + 1);
            searchResultsItems !== undefined &&
              searchResultsItems[activeIndex + 1].classList.add("isActive");
          }
          break;
        case "ArrowUp":
          if (searchResultsItems?.length !== undefined && activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
            searchResultsItems[activeIndex - 1];
          }
          break;
        case "Enter":
          if (activeIndex === searchResults.length) {
            router.push(`/search/multi/${searchQuery.replace(/ /g, "-")}`);
            setSearchQuery("");
          }
          if (searchResultsItems?.length !== undefined && activeIndex > -1) {
            if (searchResults[activeIndex] && searchResults[activeIndex].title) {
              router.push(
                `/movie/${searchResults[activeIndex].id}?${searchResults[
                  activeIndex
                ].title?.replace(/ /g, "-")}`
              );
              setSearchQuery("");
            }
            if (searchResults[activeIndex] && searchResults[activeIndex].name) {
              router.push(
                `/show/${searchResults[activeIndex].id}?${searchResults[activeIndex].name?.replace(
                  / /g,
                  "-"
                )}`
              );
              setSearchQuery("");
            }
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [searchResultsItems, activeIndex, searchResults, router, searchQuery, containerRef]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.formWrapper}>
        {searchQuery.length >= 1 && <ArrowButton setQuery={setSearchQuery} />}

        <SearchInput
          handleInputSubmit={handleInputSubmit}
          searchQuery={searchQuery}
          handleInputChange={handleInputChange}
        />
        {searchQuery.length >= 1 && <CloseButton setQuery={setSearchQuery} />}
      </div>

      <div className={styles.listContainer}>
        {isError ? (
          <div className={styles.error}>Network Error</div>
        ) : isLoading ? (
          <div className={styles.loading}>
            {" "}
            <Spinner />{" "}
          </div>
        ) : (
          searchResults.length > 0 &&
          !isLoading && (
            <ul className={styles.list} ref={searchResultsRef}>
              {searchResults.map(
                ({ id, name, title, release_date, first_air_date, poster_path }, index) => {
                  return (
                    <SearchListItem
                      key={id}
                      id={id}
                      name={name}
                      title={title}
                      release_date={release_date}
                      first_air_date={first_air_date}
                      poster_path={poster_path}
                      index={index}
                      activeIndex={activeIndex}
                      setSearchQuery={setSearchQuery}
                    />
                  );
                }
              )}
              {searchResults.length > 1 && (
                <li
                  className={
                    activeIndex === searchResults.length
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
          )
        )}
        {!isLoading && searchQuery.length > 2 && searchResults.length === 0 && (
          <div className={styles.noResultsContainer}>no suggestions found</div>
        )}
      </div>
    </div>
  );
};

export default Search;
