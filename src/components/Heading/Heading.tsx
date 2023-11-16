import { Types } from "@/types/types";

import styles from "./Heading.module.scss";

interface HeadingProps extends Types.Children {
  as: string;
  size: "xs" | "s" | "m" | "lg" | "xl";
}

const Heading: React.FC<HeadingProps> = ({ as, children, size = "lg" }) => {
  const headingClasses = [styles.heading, styles[size]];
  switch (as) {
    case "h1":
      return <h1 className={`${headingClasses.join(" ")}`}>{children}</h1>;

    case "h2":
      return <h2 className={`${headingClasses.join(" ")}`}>{children}</h2>;

    case "h3":
      return <h3 className={`${headingClasses.join(" ")}`}>{children}</h3>;

    default:
      return null;
  }
};

export default Heading;
