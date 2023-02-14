import Link from "next/link";
import styles from "../DropdownMenu/DropdownMenu.module.css";
import QueryString from "qs";

const DropDownMenu = ({
  isDropdownOpen,
  type,
  genreList,
  selectedGenre,
  dropdownRef,
  toggleDropdown,
}) => {
  return (
    <>
      {isDropdownOpen && (
        <ul className={styles.list} ref={dropdownRef}>
          <div className={styles.listContainer}>
            {genreList.map(({ id, name }) => {
              return (
                <li
                  key={id}
                  className={
                    selectedGenre.name === name
                      ? styles.listItemCurrent
                      : styles.listItem
                  }
                >
                  <Link
                    href={`/${type}?${QueryString.stringify({
                      genre: name.toLowerCase(),
                    })}`}
                  >
                    <a className={styles.link} onClick={toggleDropdown}>
                      {name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </div>
        </ul>
      )}
    </>
  );
};

export default DropDownMenu;
