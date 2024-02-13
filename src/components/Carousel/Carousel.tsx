import { LazyMotion, domAnimation, m } from "framer-motion";
import React from "react";

import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import Icon from "@/components/Icon/Icon";
import useSlider from "@/hooks/useSlider";
import { Media } from "@/types/media";
import { opacity } from "@/utils/animations";
import { FetchCards } from "@/utils/tmdbDataHelpers";

import Spinner from "../Spinner/SearchBar/Spinner";

import styles from "./Carousel.module.scss";

interface CarouselProps {
  endpoint: string;
}

const Carousel: React.FC<CarouselProps> = ({ endpoint }) => {
  const { cardRef, scrollRef, carouselRef, handleClickNext, handleClickPrev } = useSlider();
  const { cards, isLoading, isError } = FetchCards(endpoint);

  if (isLoading) {
    return (
      <div className={styles.carouselWrapper} ref={scrollRef}>
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
      {cards?.data?.length > 0 && (
        <div className={styles.container}>
          <span className={styles.navContainer}>
            <button
              type="button"
              className={styles.button}
              onClick={handleClickPrev}
              aria-label="previous"
            >
              <Icon icon="chevronLeft" />
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={handleClickNext}
              aria-label="next"
            >
              <Icon icon="chevronRight" />
            </button>
          </span>

          <div className={styles.carouselWrapper} ref={scrollRef}>
            <div className={styles.carousel}>
              <LazyMotion features={domAnimation}>
                <m.ul
                  className={styles.list}
                  ref={carouselRef}
                  variants={opacity}
                  initial="hidden"
                  animate="visible"
                >
                  {cards?.data.map(
                    ({
                      id,
                      title,
                      name,
                      poster_path,
                      first_air_date,
                      release_date,
                    }: Media.IMediaItem) => {
                      return (
                        <li key={id} className={styles.listItem} ref={cardRef}>
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
              </LazyMotion>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
