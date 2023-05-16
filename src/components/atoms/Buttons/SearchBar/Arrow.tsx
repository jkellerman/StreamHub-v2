import React from "react";

import styles from "../SearchBar/Arrow.module.scss";

interface ArrowButtonProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ setQuery }) => {
  return (
    <>
      <button type="button" className={styles.closeButtonArrow} onClick={() => setQuery("")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
            fill="#FFF"
          />
        </svg>
      </button>
    </>
  );
};

export default ArrowButton;
