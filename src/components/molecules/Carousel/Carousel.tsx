import React, { useRef } from "react";

import Button from "@/components/atoms/Buttons/Carousel/Button";
import Card from "@/components/atoms/Card/Card";
import CardDetails from "@/components/atoms/CardDetails/CardDetails";
import useFetchCards from "@/hooks/useFetchCards";
import { Media } from "@/types/media";

import styles from "./Carousel.module.scss";

interface CarouselProps {
  endpoint: string;
  allMedia?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ endpoint, allMedia }) => {
  const { cards, isLoading, isError } = useFetchCards(endpoint);
  const carouselRef = useRef<HTMLUListElement | null>(null);
  const cardRef = useRef<HTMLLIElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  let accumulatedTranslation = 0;
  let numCardsRemaining: number;

  const handleClickNext = () => {
    if (carouselRef.current && cardRef.current) {
      const totalNumOfCards = carouselRef.current.children.length;
      const sliderMargin = 1; // prevents the carousel from sliding too far when it has reached the end.
      const cardWidth = cardRef.current.getBoundingClientRect().width;
      const numOfFullyVisibleCards = Math.round(carouselRef.current?.offsetWidth / cardWidth);

      if (!numCardsRemaining) {
        numCardsRemaining = totalNumOfCards;
      }
      if (
        Math.abs(accumulatedTranslation) + cardWidth * numOfFullyVisibleCards + sliderMargin >
        carouselRef.current.scrollWidth
      )
        return; // Prevent sliding when carousel has reached the end

      numCardsRemaining -= numOfFullyVisibleCards; // number of cards in viewport so that it sliding remains consistent across all breakpoints.
      if (numCardsRemaining < numOfFullyVisibleCards) {
        // If the number of cards remaining is less than the number of cards that are currently in the viewport, slide only the number of card that are remaining
        accumulatedTranslation -= cardWidth * numCardsRemaining;
        carouselRef.current.style.transform = `translateX(${accumulatedTranslation}px)`;
        numCardsRemaining -= numOfFullyVisibleCards;
      } else {
        // Slide across the number of cards that are in the viewport
        accumulatedTranslation -= cardWidth * numOfFullyVisibleCards;
        carouselRef.current.style.transform = `translateX(${accumulatedTranslation}px)`;
      }
    }
  };

  const handleClickPrev = () => {
    if (carouselRef.current && cardRef.current) {
      const totalNumOfCards = carouselRef.current.children.length;
      if (accumulatedTranslation >= 0) return; // prevent slider from sliding if at the start
      carouselRef.current.style.transform = `translateX(0px)`;
      numCardsRemaining = totalNumOfCards;
      accumulatedTranslation = 0; // set slider to beginning
    }
  };

  if (isLoading) {
    return (
      <div className={styles.carouselWrapper} ref={scrollRef}>
        <div className={styles.carousel}>
          <ul className={styles.list} ref={carouselRef}></ul>
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
      <span className={styles.navContainer}>
        <Button left handleClickPrev={handleClickPrev} />
        <Button right handleClickNext={handleClickNext} />
      </span>
      <div className={styles.carouselWrapper} ref={scrollRef}>
        <div className={styles.carousel}>
          <ul className={styles.list} ref={carouselRef}>
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
                        allMedia={allMedia}
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
  );
};

export default Carousel;
