import styles from "../TabList/TabList.module.css";
import { useState, useRef } from "react";
import WatchProvidersTab from "@/components/atoms/WatchProvidersTab/WatchProvidersTab";
import TabButton from "@/components/atoms/TabButton/TabButton";
import MediaDetailsTab from "@/components/molecules/MediaDetailsTab/MediaDetailsTab";
import Router from "next/router";

const Tablist = ({
  movie_age_rating,
  release_date,
  air_date,
  runtime,
  vote_average,
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
  const tab = useRef();

  Router.events.on("routeChangeComplete", () => setActiveTab("watch"));
  Router.events.on("routeChangeError", () => setActiveTab("watch"));

  const handleClick = (number) => {
    setActiveTab(number);
  };

  const handleScroll = () => {
    tab.current.scrollIntoView({ behavior: "smooth" });
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
              vote_average={vote_average}
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

export default Tablist;
