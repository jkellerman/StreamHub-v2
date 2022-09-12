import styles from "@/components/LoadingAnimation/LoadingAnimation.module.css";

const LoadingAnimation = () => {
  return (
    <div className={styles.LoadingAnimation}>
      <div class={styles.loader}>
        <div class={styles.filmstrip}></div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
