import styles from "@/components/Tab/Tab.module.css";

const Tab = ({ isTabSelected, handleClick, tab }) => {
  return (
    <>
      {tab === 1 && (
        <div className={styles.tabContainer}>
          <a
            href="#whereToWatch"
            className={
              isTabSelected === 1 ? `${styles.tabHighlighted}` : `${styles.tab}`
            }
            onClick={() => handleClick(1)}
          >
            Where to watch
          </a>
        </div>
      )}
      {tab === 2 && (
        <div className={styles.tabContainer}>
          <a
            href="#details"
            className={
              isTabSelected === 2 ? `${styles.tabHighlighted}` : `${styles.tab}`
            }
            onClick={() => handleClick(2)}
          >
            Details
          </a>
        </div>
      )}
      {tab === 3 && (
        <div className={styles.tabContainer}>
          <a
            href="#suggested"
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
