import Link from "next/link";

import styles from "./Buttons.module.scss";

interface ButtonProps {
  type?: "button" | "submit";
  variant: "primary" | "secondary" | "tertiary";
  asLink?: boolean;
  link?: unknown;
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
  link,
}) => {
  const buttonClasses = [styles.button, styles[variant]];

  if (isLoading) {
    buttonClasses.push(styles.loading);
  }

  return (
    <>
      {asLink ? (
        <Link href={link as URL}>
          <a className={buttonClasses.join(" ")}>{children}</a>
        </Link>
      ) : (
        <button type={type} className={buttonClasses.join(" ")} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
