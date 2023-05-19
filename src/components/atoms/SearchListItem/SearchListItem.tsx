import Image from "next/future/image";
import Link from "next/link";

import { POSTER_URL_IMAGE_XS } from "@/constants/tmdb";

import styles from "./SearchListItem.module.scss";

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
  return (
    <li
      key={id}
      className={
        index === activeIndex
          ? `${styles.listItemWrapper} ${styles.isActive}`
          : styles.listItemWrapper
      }
    >
      <Link
        href={
          title
            ? `/movie/${id}?${title?.replace(/ /g, "-")}`
            : `/show/${id}?${name?.replace(/ /g, "-")}`
        }
      >
        <a className={styles.listItem} onClick={() => setSearchQuery("")}>
          {poster_path ? (
            <div className={styles.posterContainer}>
              <Image
                src={`${POSTER_URL_IMAGE_XS}/${poster_path}`}
                alt=""
                unoptimized={true}
                width={27}
                height={40}
                className={styles.poster}
              />
            </div>
          ) : (
            <div className={styles.posterContainer}></div>
          )}
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

export default SearchListItem;
