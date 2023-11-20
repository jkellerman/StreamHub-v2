import Link from "next/link";

import { Types } from "@/types/types";

import styles from "./Buttons.module.scss";

interface ButtonPropsBase extends Types.Children {
  type?: "button" | "submit";
  variant: "primary" | "secondary" | "tertiary" | "quaternary";
  onClick?: () => void;
  isLoading?: boolean;
  isFull?: boolean;
  disabled?: boolean;
}

interface ButtonAsLinkProps extends ButtonPropsBase {
  asLink: true;
  link: unknown;
}

interface ButtonAsButtonProps extends ButtonPropsBase {
  asLink?: false;
  link?: never;
}

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  asLink,
  children,
  onClick,
  isLoading,
  link,
  isFull,
  disabled,
}) => {
  const buttonClasses = [styles.button, styles[variant]];

  if (isLoading) {
    buttonClasses.push(styles.loading);
  }

  return (
    <>
      {asLink ? (
        <Link href={link as URL}>
          <a className={`${buttonClasses.join(" ")} ${isFull ? styles.isFull : ""}`}>{children}</a>
        </Link>
      ) : (
        <button
          type={type}
          className={`${buttonClasses.join(" ")} ${isFull ? styles.isFull : ""}`}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
