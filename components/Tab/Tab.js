import styles from "@/components/Tab/Tab.module.css";

const Tab = ({ isTabActive, handleClick, tab, handleScroll }) => {
  return (
    <>
      {tab === 1 && (
        <div className={styles.tabContainer}>
          <a
            className={
              isTabActive === 1
                ? `${styles.tab} ${styles.active}`
                : `${styles.tab} `
            }
            onClick={() => {
              handleClick(1);
              handleScroll();
            }}
          >
            Where to watch
          </a>
        </div>
      )}
      {tab === 2 && (
        <div className={styles.tabContainer}>
          <a
            className={
              isTabActive === 2
                ? `${styles.tab} ${styles.active}`
                : `${styles.tab} `
            }
            onClick={() => {
              handleClick(2);
              handleScroll();
            }}
          >
            Details
          </a>
        </div>
      )}
      {tab === 3 && (
        <div className={styles.tabContainer}>
          <a
            className={
              isTabSelected === 3
                ? `${styles.tabHighlighted} ${styles.tabSuggested}`
                : `${styles.tab} ${styles.tabSuggested}`
            }
            onClick={() => handleClick(3)}
          >
            Suggested
          </a>
        </div>
      )}
    </>
  );
};

export default Tab;
