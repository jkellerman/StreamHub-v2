import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import slugify from "slugify";

import { countryFlags } from "@/constants/app";
import { Region } from "@/types/tmdb";

import Icon from "../Icon/Icon";

import styles from "./AutoComplete.module.scss";
interface AutoCompleteProps {
  regions: Region[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  title: string;
  type: "movie" | "show";
  region: string | undefined;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  regions,
  setOpen,
  title,
  id,
  type,
  region,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredRegions, setFilteredRegions] = useState<Region[]>(regions);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = regions.filter((region) =>
      region.english_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRegions(filtered);
  };

  // Get the language code from navigator.language
  const handleOptionClick = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.searchWrapper}>
        <Icon icon="search" width="20" height="20" />
        <input
          type="text"
          value={inputValue}
          placeholder="Choose your country"
          className={styles.input}
          onChange={handleInputChange}
        />
      </div>
      <ul className={styles.list}>
        {filteredRegions.map((item, i) => {
          return (
            <li key={i} onClick={() => handleOptionClick()}>
              <Link
                href={
                  type === "movie"
                    ? `/movie/${id}/${item.iso_3166_1}?${slugify(title, { lower: true })}`
                    : `/show/${id}/${item.iso_3166_1}?${slugify(title as string, { lower: true })}`
                }
              >
                <a
                  className={
                    item.iso_3166_1 === region
                      ? `${styles.listItem} ${styles.selected}`
                      : styles.listItem
                  }
                >
                  <span className={styles.flag}>
                    {(countryFlags as Record<string, string>)[item.iso_3166_1]}
                  </span>
                  {item.native_name}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AutoComplete;
