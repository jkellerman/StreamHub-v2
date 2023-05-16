import Image from "next/future/image";
import { FormEvent } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import img from "@/public/assets/icon-search.svg";

import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  handleInputSubmit: (e: FormEvent) => void;
  searchQuery: string;
  handleInputChange: (e: FormEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  handleInputSubmit,
  searchQuery,
  handleInputChange,
}) => {
  const isMobile = useMediaQuery(`(max-width: 504px)`);

  return (
    <form className={styles.form} onSubmit={handleInputSubmit} autoComplete="off">
      <input
        type="text"
        name="search"
        aria-label="Search"
        placeholder={isMobile ? "Search..." : "Search any movie or TV series..."}
        className={styles.input}
        value={searchQuery}
        onChange={handleInputChange}
        maxLength={20}
      />
      <Image src={img} alt="icon-search" unoptimized={true} className={styles.searchIcon} />
    </form>
  );
};

export default SearchInput;
