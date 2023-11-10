import styles from "./MediaGenerator.module.scss";

const MediaGenerator = () => {
  return (
    <div className={styles.resultsContainer}>
      <div className={styles.noResults}>Your movie awaits...</div>
    </div>
  );
};

export default MediaGenerator;
