import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return <button className={styles.button}>{text}</button>;
};

export default Button;
