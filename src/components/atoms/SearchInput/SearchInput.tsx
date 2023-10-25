import Image from "next/future/image";
import { FormEvent } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import img from "@/public/assets/icon-search.svg";

import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  handleInputSubmit: (e: FormEvent) => void;
  searchQuery: string;
  handleInputChange: (e: FormEvent<HTMLInputElement>) => void;
  handleIsSearchBoxActive: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  handleInputSubmit,
  searchQuery,
  handleInputChange,
  handleIsSearchBoxActive,
}) => {
  const isMobile = useMediaQuery(`(max-width: 504px)`);

  return (
    <form className={styles.form} onSubmit={handleInputSubmit} autoComplete="off">
      <input
        type="text"
        name="search"
        aria-label="Search"
        placeholder={isMobile ? "Search..." : "Where can I watch..."}
        className={styles.input}
        value={searchQuery}
        onChange={handleInputChange}
        maxLength={20}
        onBlur={handleIsSearchBoxActive}
      />
      <Image src={img} alt="icon-search" unoptimized={true} className={styles.searchIcon} />
    </form>
  );
};

export default SearchInput;
