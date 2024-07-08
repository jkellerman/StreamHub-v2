import React from "react";

import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import Icon from "@/components/Icon/Icon";
import useSlider from "@/hooks/useSlider";
import { List } from "@/types/tmdb";

import styles from "./RecommendationsList.module.scss";

interface RecommendationsProps {
  recommendations: List | undefined;
  isLoading: boolean;
  isError: boolean;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
  isLoading,
  isError,
}) => {
  const {
    listRef,
    scrollRef,
    getCarouselRef,
    getCardWidth,
    getScrollDimensions,
    isScrollAvailable,
    isScrollAtStart,
    isScrollAtEnd,
    isCarouselAtStart,
    isCarouselAtEnd,
    getScrollPosition,
    handleClickNext,
    handleClickPrev,
  } = useSlider();

  if (isLoading) {
    return (
      <div className={styles.carouselWrapper}>
        <div className={styles.carousel}>
          <div className={styles.list}></div>
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <div className={styles.error}>...Oops we are having some issues, please reload the page.</div>
    );

  return (
    <div className={styles.container}>
      {isScrollAvailable && (
        <span className={styles.navContainer}>
          <button
            type="button"
            className={isCarouselAtStart ? `${styles.button} ${styles.disable}` : styles.button}
            onClick={handleClickPrev}
            aria-label="left"
          >
            <Icon
              icon="chevronLeft"
              fill={
                isCarouselAtStart || isScrollAtStart ? "var(--tertiary-dark)" : "var(--quinary)"
              }
            />
          </button>
          <button
            type="button"
            className={isCarouselAtEnd ? `${styles.button} ${styles.disable}` : styles.button}
            onClick={handleClickNext}
            aria-label="right"
          >
            <Icon
              icon="chevronRight"
              fill={isCarouselAtEnd || isScrollAtEnd ? "var(--tertiary-dark)" : "var(--quinary)"}
            />
          </button>
        </span>
      )}
      <div ref={getScrollDimensions}>
        <div className={styles.carouselWrapper} ref={scrollRef} onScroll={getScrollPosition}>
          <div className={styles.carousel}>
            <div ref={getCarouselRef}>
              <ul className={styles.list} ref={listRef}>
                {recommendations &&
                  recommendations.results.map(
                    ({ id, title, name, poster_path, first_air_date, release_date }) => {
                      return (
                        <li key={id} className={styles.listItem} ref={getCardWidth}>
                          <figure>
                            <Card
                              id={id}
                              poster={poster_path}
                              movieTitle={title}
                              seriesName={name}
                            />
                            <CardDetails
                              movieTitle={title}
                              seriesName={name}
                              movieYear={release_date}
                              seriesYear={first_air_date}
                            />
                          </figure>
                        </li>
                      );
                    }
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
