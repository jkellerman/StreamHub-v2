import { LazyMotion, domAnimation, m } from "framer-motion";
import React from "react";

import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import Icon from "@/components/Icon/Icon";
import useSlider from "@/hooks/useSlider";
import { opacity } from "@/utils/animations";
import { FetchCards } from "@/utils/tmdbDataHelpers";

import Spinner from "../Spinner/SearchBar/Spinner";

import styles from "./Carousel.module.scss";

interface CarouselProps {
  endpoint: string;
}

const Carousel: React.FC<CarouselProps> = ({ endpoint }) => {
  const { cards, isLoading, isError } = FetchCards(endpoint);

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
          <div className={styles.list}>
            <div className={styles.spinnerContainer}>
              <Spinner />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <div className={styles.error}>...Oops we are having some issues, please reload the page.</div>
    );
  return (
    <>
      {cards && cards?.data.length > 0 && (
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
                  fill={
                    isCarouselAtEnd || isScrollAtEnd ? "var(--tertiary-dark)" : "var(--quinary)"
                  }
                />
              </button>
            </span>
          )}
          <div ref={getScrollDimensions}>
            <div className={styles.carouselWrapper} ref={scrollRef} onScroll={getScrollPosition}>
              <div className={styles.carousel}>
                <LazyMotion features={domAnimation}>
                  <div ref={getCarouselRef}>
                    <m.ul
                      className={styles.list}
                      ref={listRef}
                      variants={opacity}
                      initial="hidden"
                      animate="visible"
                    >
                      {cards?.data.map(
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
                    </m.ul>
                  </div>
                </LazyMotion>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
