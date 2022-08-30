import styles from "../Dropdown/Dropdown.module.css";
import DropdownButton from "../DropdownButton/DropdownButton";

const Dropdown = () => {
  return (
    <div className={styles.dropdown}>
      <DropdownButton />
    </div>
  );
};

export default Dropdown;
