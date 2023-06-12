import Image from "next/future/image";
import React from "react";

import img from "@/public/assets/chevron-down.svg";

import styles from "./Button.module.scss";

interface ButtonProps {
  toggleDropdown: () => void;
  name: string;
  isDropdownOpen: boolean;
}

const Button: React.FC<ButtonProps> = ({ toggleDropdown, name, isDropdownOpen }) => {
  return (
    <button type="button" className={styles.button} onClick={toggleDropdown}>
      <>
        {name}
        <Image
          src={img}
          alt="down-arrow"
          unoptimized={true}
          className={
            isDropdownOpen
              ? `${styles.chevron} ${styles.open}`
              : `${styles.chevron} ${styles.closed}`
          }
        />
      </>
    </button>
  );
};

export default Button;
