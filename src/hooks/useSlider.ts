import { useState, useRef, MutableRefObject } from "react";

interface SliderProps {
  isScrollAtStart: boolean;
  isScrollAtEnd: boolean;
  isScrollAvailable: boolean;
  setIsScrollAvailable: (value: boolean) => void;
  setIsScrollAtEnd: (value: boolean) => void;
  getScrollPosition: () => void;
  handleClickNext: () => void;
  handleClickPrev: () => void;
  sliderRef: MutableRefObject<HTMLUListElement | null>;
  cardRef: MutableRefObject<HTMLLIElement | null>;
}

const useSlider = (): SliderProps => {
  const [isScrollAtStart, setIsScrollAtStart] = useState(true);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState(false);
  const [isScrollAvailable, setIsScrollAvailable] = useState(false);
  const sliderRef = useRef<HTMLUListElement | null>(null);
  const cardRef = useRef<HTMLLIElement | null>(null);

  const getScrollPosition = () => {
    if (sliderRef.current) {
      if (sliderRef.current.scrollLeft > 0) {
        setIsScrollAtStart(false);
      }

      if (sliderRef.current.scrollLeft === 0) {
        setIsScrollAtStart(true);
      }

      if (
        sliderRef.current.scrollLeft + sliderRef.current?.offsetWidth + 1 >=
        sliderRef.current?.scrollWidth
      ) {
        setIsScrollAtEnd(true);
      } else {
        setIsScrollAtEnd(false);
      }
    }
  };

  // When clicked, scroll by the number of cards fully visible in viewport.

  const handleClickPrev = () => {
    if (sliderRef.current && cardRef.current) {
      const cardMargin = window.getComputedStyle(cardRef.current).getPropertyValue("margin-left");
      const cardWidth = cardRef.current.getBoundingClientRect().width;
      const cardWidthPlusMargin = parseInt(cardMargin) + cardWidth;
      const numOfFullyVisibleCards = Math.floor(
        sliderRef.current?.offsetWidth / cardWidthPlusMargin
      );
      sliderRef.current.scrollLeft -= cardWidthPlusMargin * numOfFullyVisibleCards;
    }
  };

  const handleClickNext = () => {
    if (sliderRef.current && cardRef.current) {
      const cardMargin = window.getComputedStyle(cardRef.current).getPropertyValue("margin-left");
      const cardWidth = cardRef.current.getBoundingClientRect().width;
      const cardWidthPlusMargin = parseInt(cardMargin) + cardWidth;
      const numOfFullyVisibleCards = Math.floor(
        sliderRef.current?.offsetWidth / cardWidthPlusMargin
      );
      sliderRef.current.scrollLeft += cardWidthPlusMargin * numOfFullyVisibleCards;
    }
  };

  return {
    isScrollAtStart,
    isScrollAtEnd,
    isScrollAvailable,
    getScrollPosition,
    handleClickNext,
    handleClickPrev,
    setIsScrollAvailable,
    setIsScrollAtEnd,
    sliderRef,
    cardRef,
  };
};

export default useSlider;
