import Image from "next/image";
import Router from "next/router";
import React, { useState, useRef } from "react";

import { LOGO_URL_IMAGE } from "@/constants/tmdb";
import { Media } from "@/src/types";

import Heading from "../Heading/Heading";
import Logo from "../Logo/Logo";
import styles from "../TabList/TabList.module.scss";

interface TabListProps {
  watch_providers: Media.IProviderList;
  title: string;
  release_date?: string;
  air_date?: string;
}

const tabNames: ("flatrate" | "rent" | "buy" | "free")[] = ["flatrate", "rent", "buy", "free"];

const TabList: React.FC<TabListProps> = ({ watch_providers, title, release_date, air_date }) => {
  const [activeTab, setActiveTab] = useState("flatrate");
  const tab = useRef<HTMLDivElement>(null);

  Router.events.on("routeChangeComplete", () => setActiveTab("flatrate"));
  Router.events.on("routeChangeError", () => setActiveTab("flatrate"));

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Heading as="h2" size="xs" id="tablist-1">
        Where to watch {title} ({release_date?.slice(0, 4) ?? air_date?.slice(0, 4)}) online
      </Heading>
      <div className={styles.tabsContainer} ref={tab}>
        <div className={styles.tabs} role="tablist" aria-labelledby="tablist-1">
          {tabNames.map((item, i) => (
            <TabTrigger
              key={i}
              activeTab={activeTab}
              handleClick={handleClick}
              tab={`${item}`}
              index={i}
            />
          ))}
        </div>

        <>
          <div className={styles.logoWrapper}>
            <Logo logo="justWatch" />
          </div>
          {tabNames.map((item, i) => (
            <TabPanel
              key={i}
              watch_providers={watch_providers}
              activeTab={activeTab}
              option={item}
              index={i}
            />
          ))}
        </>
      </div>
    </>
  );
};

export default TabList;

// ==============
// Tab Trigger
// ==============

interface TabTriggerProps {
  activeTab: string;
  tab: string;
  handleClick: (tab: string) => void;
  index: number;
}

const TabTrigger: React.FC<TabTriggerProps> = ({ activeTab, tab, handleClick, index }) => {
  return (
    <>
      {tab && (
        <button
          className={
            activeTab === tab ? `${styles.trigger} ${styles.active}` : `${styles.trigger} `
          }
          onClick={() => {
            handleClick(tab);
          }}
          id={`tab-${(index + 1).toString()}`}
          type="button"
          role="tab"
          aria-selected={activeTab === tab ? true : false}
          aria-controls={`tabpanel-${index + 1}`}
          tabIndex={activeTab === tab ? undefined : 0}
        >
          <span>{tab === "flatrate" ? "stream" : tab}</span>
        </button>
      )}
    </>
  );
};

// ==============
// Tab Panel
// ==============

const LOGO_SIZE = 35;

interface TabPanelProps {
  watch_providers: Media.IProviderList;
  activeTab: string;
  option: "flatrate" | "rent" | "buy" | "free";
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ watch_providers, activeTab, option, index }) => {
  return (
    <>
      <div
        id={`tabpanel-${index + 1}`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`tab-${index + 1}`}
        className={activeTab === option ? `${styles.panel}` : `${styles.panel} ${styles.isHidden}`}
      >
        <Provider activeTab={activeTab} watch_providers={watch_providers} option={option} />
      </div>
    </>
  );
};

// ==============
// Provider
// ==============

interface ProviderProps {
  watch_providers: Media.IProviderList;
  activeTab: string;
  option: "flatrate" | "rent" | "buy" | "free";
}

export const Provider: React.FC<ProviderProps> = ({ watch_providers, option }) => {
  const providerOption = watch_providers[option];

  return (
    <>
      <div className={styles.providers}>
        {!providerOption && (
          <span className={styles.placeholder}>
            Not available to {option === "free" ? "watch for " : ""}
            {option === "flatrate" ? "stream" : option} online
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
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
