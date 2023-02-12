import styles from "../Spinner/Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Spinner;
