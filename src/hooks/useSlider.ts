import { useRef } from "react";

const useSlider = () => {
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
  return {
    carouselRef,
    cardRef,
    scrollRef,
    handleClickNext,
    handleClickPrev,
  };
};

export default useSlider;
