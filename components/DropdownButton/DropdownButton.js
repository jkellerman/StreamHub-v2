import styles from "../DropdownButton/DropdownButton.module.css";
import Image from "next/image";
import img from "../../public/assets/icon-arrow-down.svg";

const DropdownButton = () => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button}>
        popular{" "}
        <svg
          width="10"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.chevron}
        >
          <path
            d="M1 .799l4 4 4-4"
            stroke="#FFFFFF"
            stroke-width="2"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default DropdownButton;
