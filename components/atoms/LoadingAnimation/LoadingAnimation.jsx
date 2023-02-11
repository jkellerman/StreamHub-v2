import styles from "../LoadingAnimation/LoadingAnimation.module.css";

const LoadingAnimation = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoadingAnimation;
