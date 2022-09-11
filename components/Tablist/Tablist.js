import styles from "@/components/Tablist/Tablist.module.css";
import { useState } from "react";
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
  suggested,
  seasons,
  network,
  series_age_rating,
}) => {
  const [isTabSelected, setIsTabSelected] = useState(1);

  const handleClick = (number) => {
    setIsTabSelected(number);
  };

  return (
    <section className={styles.container}>
      <nav className={styles.tabs}>
        <Tab isTabSelected={isTabSelected} handleClick={handleClick} tab={1} />
        <Tab isTabSelected={isTabSelected} handleClick={handleClick} tab={2} />
        <Tab isTabSelected={isTabSelected} handleClick={handleClick} tab={3} />
      </nav>
      <section className={styles.contentContainer}>
        <article id="whereToWatch">
          {isTabSelected === 1 && (
            <WatchProvidersTab watch_providers={watch_providers} />
          )}
        </article>
        <article id="details" className={styles.detailsContainer}>
          {isTabSelected === 2 && (
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
            />
          )}
        </article>
        <article id="suggested"></article>
      </section>
    </section>
  );
};

export default Tablist;
