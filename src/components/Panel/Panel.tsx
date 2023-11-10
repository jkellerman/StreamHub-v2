import { Types } from "@/types/types";

import styles from "./Panel.module.scss";

export const Panel: React.FC<Types.Children> = ({ children }) => {
  return <div className={styles.panelContainer}>{children}</div>;
};
