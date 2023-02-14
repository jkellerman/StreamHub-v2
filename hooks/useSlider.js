import { useState, useRef } from "react";

const useSlider = () => {
  const [isScrollAtStart, setIsScrollAtStart] = useState(true);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState(false);
  const [isScrollAvailable, setIsScrollAvailable] = useState(false);
  const sliderRef = useRef(null);
  const cardRef = useRef(null);

  const getScrollPosition = () => {
    if (sliderRef.current.scrollLeft > 0) {
      setIsScrollAtStart(false);
    }

    if (sliderRef.current.scrollLeft === 0) {
      setIsScrollAtStart(true);
    }

    if (
      sliderRef.current.scrollLeft + sliderRef.current.offsetWidth + 1 >=
      sliderRef.current.scrollWidth
    ) {
      setIsScrollAtEnd(true);
    } else {
      setIsScrollAtEnd(false);
    }
  };

  // Slide multiplier = the number cards it slides by
  // Different for trending slider on homepage and suggested slider for movie/series recommendations

  const handleClickPrev = () => {
    const cardMargin = window
      .getComputedStyle(cardRef.current)
      .getPropertyValue("margin-left");
    const cardWidth = cardRef.current.getBoundingClientRect().width;
    const cardWidthPlusMargin = parseInt(cardMargin) + cardWidth;
    const numVisibleCards = Math.floor(
      sliderRef.current.offsetWidth / cardWidthPlusMargin
    );
    sliderRef.current.scrollLeft -=
      (cardWidth + parseInt(cardMargin)) * numVisibleCards;
  };

  const handleClickNext = () => {
    const cardMargin = window
      .getComputedStyle(cardRef.current)
      .getPropertyValue("margin-left");
    const cardWidth = cardRef.current.getBoundingClientRect().width;
    const cardWidthPlusMargin = parseInt(cardMargin) + cardWidth;
    const numVisibleCards = Math.floor(
      sliderRef.current.offsetWidth / cardWidthPlusMargin
    );
    sliderRef.current.scrollLeft +=
      (cardWidth + parseInt(cardMargin)) * numVisibleCards;
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
