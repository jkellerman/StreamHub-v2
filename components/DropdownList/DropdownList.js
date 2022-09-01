import styles from "../DropdownList/DropdownList.module.css";
import { Movies } from "@/utils/utils";

const DropdownList = () => {
  return (
    <ul className={styles.list}>
      {Movies.map((genre) => {
        return <li className={styles.listItem}>{genre}</li>;
      })}
    </ul>
  );
};

export default DropdownList;
