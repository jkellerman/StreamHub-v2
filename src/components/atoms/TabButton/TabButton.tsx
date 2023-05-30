import React from "react";

import styles from "../TabButton/TabButton.module.scss";

interface TabButtonProps {
  activeTab: string;
  tab: string;
  handleClick: (tab: string) => void;
  handleScroll: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ activeTab, tab, handleClick, handleScroll }) => {
  return (
    <>
      {tab === "stream" && (
        <div className={styles.tabContainer}>
          <button
            className={activeTab === "stream" ? `${styles.tab} ${styles.active}` : `${styles.tab} `}
            onClick={() => {
              handleClick("stream");
              handleScroll();
            }}
          >
            Stream
          </button>
        </div>
      )}
      {tab === "rent" && (
        <div className={styles.tabContainer}>
          <button
            className={activeTab === "rent" ? `${styles.tab} ${styles.active}` : `${styles.tab} `}
            onClick={() => {
              handleClick("rent");
              handleScroll();
            }}
          >
            Rent
          </button>
        </div>
      )}
      {tab === "buy" && (
        <div className={styles.tabContainer}>
          <button
            className={activeTab === "buy" ? `${styles.tab} ${styles.active}` : `${styles.tab} `}
            onClick={() => {
              handleClick("buy");
              handleScroll();
            }}
          >
            Buy
          </button>
        </div>
      )}
    </>
  );
};

export default TabButton;
