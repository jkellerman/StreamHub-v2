import styles from "./DropdownsContainer.module.scss";

interface DropdownsContainerProps {
  children: React.ReactNode;
}

const DropdownsContainer: React.FC<DropdownsContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default DropdownsContainer;
