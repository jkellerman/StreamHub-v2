import Link from "next/link";

import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <Link href="/">
      <a className={styles.button}>{text}</a>
    </Link>
  );
};

export default Button;
