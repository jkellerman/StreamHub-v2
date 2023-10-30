import styles from "./Buttons.module.scss";

interface ButtonProps {
  type?: "button" | "submit";
  variant: "primary" | "secondary" | "tertiary" | "quaternary";
  asLink?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  asLink,
  children,
  onClick,
  isLoading,
}) => {
  const buttonClasses = [styles.button, styles[variant]];

  if (isLoading) {
    buttonClasses.push(styles.loading);
  }

  return (
    <>
      {asLink ? (
        <a className={buttonClasses.join(" ")}>{children}</a>
      ) : (
        <button type={type} className={buttonClasses.join(" ")} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
