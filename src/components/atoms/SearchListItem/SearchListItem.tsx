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

export default SearchListItem;
