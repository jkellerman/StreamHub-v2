import styles from "./Buttons.module.scss";

interface ButtonProps {
  type?: "button" | "submit";
  variant: "primary" | "secondary" | "tertiary";
  asLink?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  asLink,
  children,
  onClick,
}) => {
  return (
    <>
      {asLink ? (
        <a className={`${styles.button} ${styles[variant]}`}>{children}</a>
      ) : (
        <button type={type} className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
