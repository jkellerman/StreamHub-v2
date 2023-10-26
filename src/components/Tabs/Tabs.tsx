import Image from "next/image";
import Router from "next/router";
import React, { useState, useRef } from "react";

import JustWatchLogo from "@/components/Logo/JustWatch/JustWatchLogo";
import { LOGO_URL_IMAGE } from "@/constants/tmdb";
import { Media } from "@/src/types";

import styles from "../Tabs/Tabs.module.scss";

interface TabListProps {
  watch_providers: Media.IProviderList;
  title: string;
  release_date?: string;
  air_date?: string;
}

const Tabs: React.FC<TabListProps> = ({ watch_providers, title, release_date, air_date }) => {
  const [activeTab, setActiveTab] = useState("flatrate");
  const tab = useRef<HTMLDivElement>(null);

  Router.events.on("routeChangeComplete", () => setActiveTab("flatrate"));
  Router.events.on("routeChangeError", () => setActiveTab("flatrate"));

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <h3 className={styles.title}>
        Where to watch {title} ({release_date?.slice(0, 4) || air_date?.slice(0, 4)}) online
      </h3>
      <div className={styles.tabsContainer} ref={tab}>
        <div className={styles.tabs}>
          <TabTrigger activeTab={activeTab} handleClick={handleClick} tab="flatrate" />
          <TabTrigger activeTab={activeTab} handleClick={handleClick} tab="rent" />
          <TabTrigger activeTab={activeTab} handleClick={handleClick} tab="buy" />
        </div>

        <div className={styles.providerContainer}>
          {activeTab === "flatrate" && (
            <TabContent watch_providers={watch_providers} activeTab={activeTab} option="flatrate" />
          )}
          {activeTab === "rent" && (
            <TabContent watch_providers={watch_providers} activeTab={activeTab} option="rent" />
          )}
          {activeTab === "buy" && (
            <TabContent watch_providers={watch_providers} activeTab={activeTab} option="buy" />
          )}
        </div>
      </div>
    </>
  );
};

export default Tabs;

// ==============
// Tab Trigger
// ==============

interface TabTriggerProps {
  activeTab: string;
  tab: string;
  handleClick: (tab: string) => void;
}

const TabTrigger: React.FC<TabTriggerProps> = ({ activeTab, tab, handleClick }) => {
  return (
    <>
      {tab && (
        <div className={styles.triggerContainer}>
          <button
            className={
              activeTab === tab ? `${styles.trigger} ${styles.active}` : `${styles.trigger} `
            }
            onClick={() => {
              handleClick(tab);
            }}
          >
            {tab === "flatrate" ? "stream" : tab}
          </button>
        </div>
      )}
    </>
  );
};

// ==============
// Tab Content
// ==============

const LOGO_SIZE = 35;

interface TabContentProps {
  watch_providers: Media.IProviderList;
  activeTab: string;
  option: "flatrate" | "rent" | "buy";
}

const TabContent: React.FC<TabContentProps> = ({ watch_providers, activeTab, option }) => {
  return (
    <>
      {option && (
        <div
          className={
            activeTab === option ? `${styles.providers} ${styles.active}` : styles.providers
          }
        >
          <Provider activeTab={activeTab} watch_providers={watch_providers} option={option} />
        </div>
      )}
    </>
  );
};

// ==============
// Provider
// ==============

interface ProviderProps {
  watch_providers: Media.IProviderList;
  activeTab: string;
  option: "flatrate" | "buy" | "rent";
}

export const Provider: React.FC<ProviderProps> = ({ watch_providers, activeTab, option }) => {
  const providerOption = watch_providers[option];

  return (
    <>
      <div className={activeTab === "stream" ? `${styles.container} ${styles.active}` : undefined}>
        <JustWatchLogo tab />
        <div className={styles.providers}>
          {providerOption === undefined && (
            <span className={styles.placeholder}>
              Not available to {option === "flatrate" ? "stream" : option} online
            </span>
          )}
          {providerOption && (
            <div className={styles.icons}>
              {providerOption.map((provider) => {
                return (
                  <div key={provider.provider_id} className={styles.provider}>
                    <div className={styles.iconWrapper}>
                      <Image
                        src={`${LOGO_URL_IMAGE}${provider.logo_path}`}
                        alt={provider.provider_name}
                        unoptimized={true}
                        className={styles.icon}
                        width={LOGO_SIZE}
                        height={LOGO_SIZE}
                      />
                    </div>
                    <div className={styles.providerDetails}>
                      <span className={styles.name}>{provider.provider_name}</span>
                      {option === "flatrate" && (
                        <span className={styles.subscription}>subscription</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
