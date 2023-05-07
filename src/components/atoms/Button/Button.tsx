import Image from "next/future/image";
import React from "react";

import img from "@/public/assets/chevron-down.svg";

import styles from "../Button/Button.module.scss";

interface ButtonProps {
  toggleDropdown: () => void;
  name: string;
  dropdown?: boolean;
}

const Button: React.FC<ButtonProps> = ({ toggleDropdown, name, dropdown }) => {
  return (
    <button className={styles.button} onClick={toggleDropdown}>
      <>
        {name}
        {dropdown && (
          <Image
            src={img}
            alt="down-arrow"
            unoptimized={true}
            className={styles.chevron}
          />
        )}
      </>
    </button>
  );
};

export default Button;
