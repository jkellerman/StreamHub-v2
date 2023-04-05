import styles from "../TabList/TabList.module.css";
import React, { useState, useRef } from "react";
import WatchProvidersTab from "@/components/molecules/WatchProvidersTab/WatchProvidersTab";
import TabButton from "@/components/atoms/TabButton/TabButton";
import StarRating from "@/components/atoms/StarRating/StarRating";
import Poster from "@/components/atoms/Poster/Poster";
import Certification from "@/components/atoms/Certification/Certification";
import ReleaseDate from "@/components/atoms/ReleaseDate/ReleaseDate";
import MediaOverview from "@/components/atoms/MediaOverview/MediaOverview";
import MediaDirectorOrNetwork from "@/components/atoms/MediaDirectorOrNetwork/MediaDirectorOrNetwork";
import Cast from "@/components/atoms/Cast/Cast";
import MediaGenres from "@/components/atoms/MediaGenres/MediaGenres";
import MediaRunTimeOrSeasons from "@/components/atoms/MediaRunTimeOrSeasons/MediaRunTimeOrSeasons";
import Router from "next/router";
import { Media, Genres } from "@/src/types";

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
            <WatchProvidersTab
              watch_providers={watch_providers}
              activeTab={activeTab}
            />
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
                {overview && (
                  <div className={styles.overviewContainer}>
                    <div className={styles.heading}>overview</div>
                    <MediaOverview overview={overview} />
                  </div>
                )}

                <div className={styles.attributes}>
                  <dl className={styles.list}>
                    <MediaGenres genres={genres} movies={movies} />
                    <Cast cast={cast} />
                    <MediaDirectorOrNetwork
                      director={director}
                      network={network}
                    />
                  </dl>

                  <dl className={styles.attributesList}>
                    <div className={`${styles.listItem} ${styles.releaseDate}`}>
                      <dt className={styles.heading}>release date</dt>
                      <ReleaseDate
                        release_date={release_date}
                        air_date={air_date}
                        mediaDetailsTab
                      />
                    </div>

                    <div
                      className={`${styles.listItem} ${styles.certification}`}
                    >
                      <dt className={styles.heading}>certification</dt>
                      <Certification
                        movie_age_rating={movie_age_rating}
                        series_age_rating={series_age_rating}
                        mediaDetailsTab
                      />
                    </div>

                    <MediaRunTimeOrSeasons
                      runtime={runtime}
                      seasons={seasons}
                    />

                    {star_rating > 0 && (
                      <div className={styles.listItem}>
                        <dt className={styles.heading}>rating</dt>
                        <StarRating star_rating={star_rating} />
                      </div>
                    )}
                  </dl>
                </div>
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
