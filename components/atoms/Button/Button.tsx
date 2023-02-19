import React from "react";
import styles from "../Button/Button.module.css";
import img from "@/public/assets/chevron-down.svg";
import Image from "next/future/image";
import { Genres } from "types";

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
