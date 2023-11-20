import { Types } from "@/types/types";

import styles from "./Content.module.scss";

const Content: React.FC<Types.Children> = ({ children }) => {
  return <p className={styles.paragraph}>{children}</p>;
};

export default Content;
