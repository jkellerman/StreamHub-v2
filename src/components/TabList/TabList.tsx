import * as Tabs from "@radix-ui/react-tabs";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { LOGO_URL_IMAGE } from "@/constants/tmdb";
import { Media, Types } from "@/src/types";

import Heading from "../Heading/Heading";
import Logo from "../Logo/Logo";
import styles from "../TabList/TabList.module.scss";

interface TabListProps {
  watch_providers: Media.IProviderList;
  title: string;
  release_date?: string;
  air_date?: string;
  children: React.ReactNode;
  regions: Types.IRegions[];
  defaultTab?: string;
}

const tabNames: ("flatrate" | "rent" | "buy" | "free")[] = ["flatrate", "rent", "buy", "free"];

const TabList: React.FC<TabListProps> = ({
  watch_providers,
  title,
  release_date,
  air_date,
  children,
  regions,
  defaultTab,
}) => {
  return (
    <>
      <Tabs.Root className={styles.tabsRoot} defaultValue={defaultTab}>
        <Heading as="h2" size="xs">
          Where to watch {title} ({release_date?.slice(0, 4) ?? air_date?.slice(0, 4)})
        </Heading>
        <div className={styles.tabsOuterContainer}>
          <div className={styles.tabsContainer}>
            <Tabs.List className={styles.tabsList} aria-label={`Where to stream ${title}`}>
              {tabNames.map((item, i) => (
                <TabTrigger key={i} tab={`${item}`} index={i} />
              ))}
            </Tabs.List>

            <>
              <div className={styles.logoWrapper}>
                <Logo logo="justWatch" />
              </div>
              {tabNames.map((item, i) => (
                <Tabs.Content key={i} value={`tab${i + 1}`}>
                  <TabPanel>
                    <Provider watch_providers={watch_providers} option={item} regions={regions} />
                  </TabPanel>
                </Tabs.Content>
              ))}
            </>
          </div>
          {children}
        </div>
      </Tabs.Root>
    </>
  );
};

export default TabList;

// ==============
// Tab Trigger
// ==============

interface TabTriggerProps {
  tab: string;

  index: number;
}

const TabTrigger: React.FC<TabTriggerProps> = ({ tab, index }) => {
  return (
    <>
      {tab && (
        <Tabs.Trigger value={`tab${index + 1}`} className={styles.trigger}>
          <span>{tab === "flatrate" ? "stream" : tab}</span>
        </Tabs.Trigger>
      )}
    </>
  );
};

// ==============
// Tab Panel
// ==============

const LOGO_SIZE = 35;

interface TabPanelProps {
  children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return (
    <>
      <div className={styles.panel}>{children}</div>
    </>
  );
};

// ==============
// Provider
// ==============

interface ProviderProps {
  watch_providers: Media.IProviderList;

  option: "flatrate" | "rent" | "buy" | "free";
  regions: Types.IRegions[];
}

export const Provider: React.FC<ProviderProps> = ({ watch_providers, option, regions }) => {
  const providerOption = watch_providers && watch_providers[option];
  const { query } = useRouter();

  const slug = query.slugs;
  const region = slug && slug[1];

  const selectedRegion = regions && regions.find((item) => item.iso_3166_1 === region);

  return (
    <>
      <div className={styles.providers}>
        {!providerOption && (
          <span className={styles.placeholder}>
            Not available to {option === "free" ? "watch for " : ""}
            {option === "flatrate" ? "stream" : option}{" "}
            {option === "free" || option === "flatrate"
              ? `in ${selectedRegion?.native_name}`
              : `online in ${selectedRegion?.native_name}`}
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
                      alt={provider.provider_name.replace(" Plus", "+")}
                      unoptimized={true}
                      className={styles.icon}
                      width={LOGO_SIZE}
                      height={LOGO_SIZE}
                    />
                  </div>
                  <div className={styles.providerDetails}>
                    <span className={styles.name}>
                      {provider.provider_name.replace(" Plus", "+")}
                    </span>
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
