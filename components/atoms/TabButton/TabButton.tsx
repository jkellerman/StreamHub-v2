import React from "react";
import styles from "../TabButton/TabButton.module.css";

interface TabButtonProps {
  activeTab: string;
  tab: string;
  handleClick: (tab: string) => void;
  handleScroll: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  activeTab,
  tab,
  handleClick,
  handleScroll,
}) => {
  return (
    <>
      {tab === "watch" && (
        <div className={styles.tabContainer}>
          <button
            className={
              activeTab === "watch"
                ? `${styles.tab} ${styles.active}`
                : `${styles.tab} `
            }
            onClick={() => {
              handleClick("watch");
              handleScroll();
            }}
          >
            Where to watch
          </button>
        </div>
      )}
      {tab === "details" && (
        <div className={styles.tabContainer}>
          <button
            className={
              activeTab === "details"
                ? `${styles.tab} ${styles.active}`
                : `${styles.tab} `
            }
            onClick={() => {
              handleClick("details");
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

export default TabButton;
