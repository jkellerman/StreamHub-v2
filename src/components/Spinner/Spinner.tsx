import styles from "../Spinner/Spinner.module.scss";

interface SpinnerProps {
  forList?: boolean; // Spinner is for list of items
}

const Spinner: React.FC<SpinnerProps> = ({ forList }) => {
  return (
    <div className={forList ? styles.listContainer : styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Spinner;
