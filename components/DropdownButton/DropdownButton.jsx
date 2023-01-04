import styles from "../DropdownButton/DropdownButton.module.css";

const DropdownButton = ({ toggleDropdown, name }) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={toggleDropdown}>
        {name}
        <svg
          width="10"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.chevron}
        >
          <path
            d="M1 .799l4 4 4-4"
            stroke="#FFFFFF"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default DropdownButton;
