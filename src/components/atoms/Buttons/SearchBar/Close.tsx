import React from "react";

import styles from "../SearchBar/Close.module.scss";

interface CloseButtonProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CloseButton: React.FC<CloseButtonProps> = ({ setQuery }) => {
  return (
    <button type="button" className={styles.closeButton} onClick={() => setQuery("")}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17">
        <line x1="5" y1="19" x2="19" y2="5" stroke="#8892b0" strokeWidth="2" />
        <line x1="5" y1="5" x2="19" y2="19" stroke="#8892b0" strokeWidth="2" />
      </svg>
    </button>
  );
};

export default CloseButton;
