import styles from "@/components/Tab/Tab.module.css";

const Tab = ({ activeTab, handleClick, tab, handleScroll }) => {
  return (
    <>
      {tab === 1 && (
        <div className={styles.tabContainer}>
          <button
            className={
              activeTab === 1
                ? `${styles.tab} ${styles.active}`
                : `${styles.tab} `
            }
            onClick={() => {
              handleClick(1);
              handleScroll();
            }}
          >
            Where to watch
          </button>
        </div>
      )}
      {tab === 2 && (
        <div className={styles.tabContainer}>
          <button
            className={
              activeTab === 2
                ? `${styles.tab} ${styles.active}`
                : `${styles.tab} `
            }
            onClick={() => {
              handleClick(2);
              handleScroll();
            }}
          >
            Details
          </button>
        </div>
      )}
    </>
  );
};

export default Tab;
