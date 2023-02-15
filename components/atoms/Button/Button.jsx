import styles from "../Button/Button.module.css";
import img from "@/public/assets/chevron-down.svg";
import Image from "next/future/image";

const Button = ({ toggleDropdown, name, dropdown }) => {
  return (
    <button className={styles.button} onClick={toggleDropdown}>
      {name}
      {dropdown && (
        <Image
          src={img}
          alt="down-arrow"
          unoptimized={true}
          width={10}
          height={10}
          className={styles.chevron}
        />
      )}
    </button>
  );
};

export default Button;
