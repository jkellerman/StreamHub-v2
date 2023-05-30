import Router from "next/router";
import React, { useState, useRef } from "react";

import TabButton from "@/components/atoms/TabButton/TabButton";
import WatchProvidersTab from "@/components/molecules/WatchProvidersTab/WatchProvidersTab";
import { Media } from "@/src/types";

import styles from "../TabList/TabList.module.scss";

interface TabListProps {
  watch_providers: Media.IProviderList;
  title: string;
  release_date?: string;
  air_date?: string;
}

const TabList: React.FC<TabListProps> = ({ watch_providers, title, release_date, air_date }) => {
  const [activeTab, setActiveTab] = useState("stream");
  const tab = useRef<HTMLDivElement>(null);

  Router.events.on("routeChangeComplete", () => setActiveTab("stream"));
  Router.events.on("routeChangeError", () => setActiveTab("stream"));

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleScroll = () => {
    tab.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <h3 className={styles.title}>
        Where to watch {title} ({release_date?.slice(0, 4) || air_date?.slice(0, 4)}) online
      </h3>
      <div className={styles.container} ref={tab}>
        <div className={styles.tabs}>
          <TabButton
            activeTab={activeTab}
            handleClick={handleClick}
            tab="stream"
            handleScroll={handleScroll}
          />
          <TabButton
            activeTab={activeTab}
            handleClick={handleClick}
            tab="rent"
            handleScroll={handleScroll}
          />
          <TabButton
            activeTab={activeTab}
            handleClick={handleClick}
            tab="buy"
            handleScroll={handleScroll}
          />
        </div>

        <div className={styles.providerContainer}>
          {activeTab === "stream" && (
            <div
              className={
                activeTab === "stream" ? `${styles.providers} ${styles.active}` : styles.providers
              }
            >
              <WatchProvidersTab watch_providers={watch_providers} activeTab={activeTab} stream />
            </div>
          )}
          {activeTab === "rent" && (
            <div
              className={
                activeTab === "rent" ? `${styles.providers} ${styles.active}` : styles.providers
              }
            >
              <WatchProvidersTab watch_providers={watch_providers} activeTab={activeTab} rent />
            </div>
          )}
          {activeTab === "buy" && (
            <div
              className={
                activeTab === "buy" ? `${styles.providers} ${styles.active}` : styles.providers
              }
            >
              <WatchProvidersTab watch_providers={watch_providers} activeTab={activeTab} buy />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TabList;
