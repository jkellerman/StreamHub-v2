import styles from "@/components/Tab/Tab.module.css";

const Tab = ({ activeTab, handleClick, tab, handleScroll }) => {
  return (
    <>
      {tab === 1 && (
        <div className={styles.tabContainer}>
          <a
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
          </a>
        </div>
      )}
      {tab === 2 && (
        <div className={styles.tabContainer}>
          <a
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
          </a>
        </div>
      )}
    </>
  );
};

export default Tab;
