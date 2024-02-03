import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";

import { Types } from "@/types/types";

import styles from "./Buttons.module.scss";

interface ButtonPropsBase extends Types.Children {
  type?: "button" | "submit";
  variant: "primary" | "secondary" | "tertiary" | "quaternary" | "quinary";
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
      {asLink && variant === "primary" ? (
        <LazyMotion features={domAnimation}>
          <Link href={link as URL}>
            <m.a
              className={`${buttonClasses.join(" ")} ${isFull ? styles.isFull : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {children}
            </m.a>
          </Link>
        </LazyMotion>
      ) : asLink ? (
        <Link href={link as URL}>
          <a className={`${buttonClasses.join(" ")} ${isFull ? styles.isFull : ""}`}>{children}</a>
        </Link>
      ) : variant === "primary" ? (
        <LazyMotion features={domAnimation}>
          <m.button
            type={type}
            className={`${buttonClasses.join(" ")} ${isFull ? styles.isFull : ""}`}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {children}
          </m.button>
        </LazyMotion>
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
