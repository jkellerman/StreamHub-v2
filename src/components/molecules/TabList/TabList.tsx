import Router from "next/router";
import React, { useState, useRef } from "react";

import MediaOverview from "@/components/atoms/MediaOverview/MediaOverview";
import Poster from "@/components/atoms/Poster/Poster";
import TabButton from "@/components/atoms/TabButton/TabButton";
import WatchProvidersTab from "@/components/molecules/WatchProvidersTab/WatchProvidersTab";
import { Media, Genres } from "@/src/types";

import MediaDetails from "../MediaDetails/MediaDetails";
import MediaSummary from "../MediaSummary/MediaSummary";
import styles from "../TabList/TabList.module.scss";

interface TabListProps {
  movie_age_rating?: string;
  release_date?: string;
  air_date?: string;
  runtime?: number;
  star_rating: number;
  overview: string;
  series_age_rating?: string;
  poster: string;
  director?: Media.IDirector;
  cast: Media.ICastMember[];
  genres: Genres.IGenre[];
  watch_providers: Media.IProviderList;
  seasons?: number;
  network?: string[];
  title: string;
  movies?: boolean;
  id: number;
}

const TabList: React.FC<TabListProps> = ({
  movie_age_rating,
  release_date,
  runtime,
  overview,
  poster,
  genres,
  watch_providers,
  title,
}) => {
  const [activeTab, setActiveTab] = useState("watch");
  const tab = useRef<HTMLDivElement>(null);

  Router.events.on("routeChangeComplete", () => setActiveTab("watch"));
  Router.events.on("routeChangeError", () => setActiveTab("watch"));

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleScroll = () => {
    tab.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.container} ref={tab}>
      <div className={styles.tabs}>
        <TabButton
          activeTab={activeTab}
          handleClick={handleClick}
          tab="watch"
          handleScroll={handleScroll}
        />
        <TabButton
          activeTab={activeTab}
          handleClick={handleClick}
          tab="details"
          handleScroll={handleScroll}
        />
      </div>
      <div>
        <div>
          {activeTab === "watch" && (
            <WatchProvidersTab watch_providers={watch_providers} activeTab={activeTab} />
          )}
        </div>
        <div className={styles.detailsContainer}>
          {activeTab === "details" && (
            <>
              <div
                className={
                  activeTab === "details"
                    ? `${styles.mediaDetails} ${styles.active}`
                    : styles.mediaDetails
                }
              >
                <MediaSummary>
                  <MediaDetails
                    genres={genres}
                    movie_age_rating={movie_age_rating}
                    release_date={release_date}
                    runtime={runtime}
                  />
                  <MediaOverview overview={overview} mediaSummary />
                </MediaSummary>
              </div>
              <Poster poster={poster} title={title} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabList;
