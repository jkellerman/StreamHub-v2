import styles from "@/components/Tablist/Tablist.module.css";
import { useState, useRef } from "react";
import WatchProvidersTab from "../WatchProvidersTab/WatchProvidersTab";
import Tab from "../Tab/Tab";
import DetailsTab from "../DetailsTab/DetailsTab";

const Tablist = ({
  name,
  age_rating,
  release_date,
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
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const tab = useRef();

  const handleClick = (number) => {
    setActiveTab(number);
  };

  const handleScroll = () => {
    tab.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.container} ref={tab}>
      <nav className={styles.tabs}>
        <Tab
          activeTab={activeTab}
          handleClick={handleClick}
          tab={1}
          handleScroll={handleScroll}
        />
        <Tab
          activeTab={activeTab}
          handleClick={handleClick}
          tab={2}
          handleScroll={handleScroll}
        />
      </nav>
      <section className={styles.contentContainer}>
        <article>
          {activeTab === 1 && (
            <WatchProvidersTab
              watch_providers={watch_providers}
              activeTab={activeTab}
            />
          )}
        </article>
        <article className={styles.detailsContainer}>
          {activeTab === 2 && (
            <DetailsTab
              name={name}
              age_rating={age_rating}
              release_date={release_date}
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
            />
          )}
        </article>
      </section>
    </section>
  );
};

export default Tablist;
