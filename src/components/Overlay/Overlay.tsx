import styles from "./Overlay.module.scss";

interface ButtonProps {
  children: React.ReactNode;
}

const Overlay: React.FC<ButtonProps> = ({ children }) => {
  return <div className={styles.overlay}>{children}</div>;
};

export default Overlay;
