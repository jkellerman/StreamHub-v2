import styles from "../Spinner/Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default Spinner;
