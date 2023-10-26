import React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import Icon from "../../Icon/Icon";

import styles from "./Button.module.scss";

interface ButtonProps {
  toggleDropdown: () => void;
  name: string;
  isDropdownOpen: boolean;
}

const Button: React.FC<ButtonProps> = ({ toggleDropdown, name, isDropdownOpen }) => {
  const isMobile = useMediaQuery(`(max-width: 504px)`);
  const sm = "15";
  const lg = "20";

  const iconHeight = isMobile ? sm : lg;
  const iconWidth = isMobile ? sm : lg;
  return (
    <button type="button" className={styles.button} onClick={toggleDropdown}>
      <>
        {name}
        <div
          className={
            isDropdownOpen
              ? `${styles.chevron} ${styles.open}`
              : `${styles.chevron} ${styles.closed}`
          }
        >
          <span className={styles.icon}>
            <Icon icon="chevronDown" width={iconWidth} height={iconHeight} />
          </span>
        </div>
      </>
    </button>
  );
};

export default Button;
