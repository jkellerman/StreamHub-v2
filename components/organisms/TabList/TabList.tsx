import styles from "../TabList/TabList.module.css";
import React, { useState, useRef } from "react";
import WatchProvidersTab from "@/components/molecules/WatchProvidersTab/WatchProvidersTab";
import TabButton from "@/components/atoms/TabButton/TabButton";
import MediaDetailsTab from "@/components/molecules/MediaDetailsTab/MediaDetailsTab";
import Router from "next/router";
import { Media, Genres } from "types";

interface TabListProps {
  movie_age_rating?: string;
  release_date?: string;
  air_date?: string;
  runtime?: number;
  star_rating: number;
  overview: string;
  series_age_rating?: string;
  poster: string;
  director?: Media.IDirectorOrNetwork;
  cast: Media.ICastMember[];
  genres: Genres.IGenre[];
  watch_providers: Media.IProviderList;
  seasons?: number;
  network?: Media.IDirectorOrNetwork;
  title: string;
  movies?: boolean;
}

const TabList: React.FC<TabListProps> = ({
  movie_age_rating,
  release_date,
  air_date,
  runtime,
  star_rating,
  overview,
  poster,
  director,
  cast,
  genres,
  watch_providers,
  seasons,
  network,
  series_age_rating,
  title,
  movies,
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
    <section className={styles.container} ref={tab}>
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
      <article>
        <div>
          {activeTab === "watch" && (
            <WatchProvidersTab
              watch_providers={watch_providers}
              activeTab={activeTab}
            />
          )}
        </div>
        <div className={styles.detailsContainer}>
          {activeTab === "details" && (
            <MediaDetailsTab
              movie_age_rating={movie_age_rating}
              release_date={release_date}
              air_date={air_date}
              runtime={runtime}
              star_rating={star_rating}
              overview={overview}
              poster={poster}
              director={director}
              cast={cast}
              genres={genres}
              series_age_rating={series_age_rating}
              seasons={seasons}
              network={network}
              activeTab={activeTab}
              title={title}
              movies={movies}
            />
          )}
        </div>
      </article>
    </section>
  );
};

export default TabList;
