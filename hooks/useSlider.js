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

  const mouseEnterSlide = () => {
    if (sliderRef.current.scrollWidth > sliderRef.current.offsetWidth) {
      setIsScrollAvailable(true);
    }
  };

  // Slide multiplier = the number cards it slides by
  // Different for trending slider on homepage and suggested slider for movie/series recommendations

  const handleClickPrev = (slideMultiplier = 1) => {
    const cardWidthPlusMargin = window
      .getComputedStyle(cardRef.current)
      .getPropertyValue("margin-left");
    sliderRef.current.scrollLeft -=
      (cardRef.current.getBoundingClientRect().width +
        parseInt(cardWidthPlusMargin)) *
      slideMultiplier;
  };

  const handleClickNext = (slideMultiplier = 1) => {
    const cardWidthPlusMargin = window
      .getComputedStyle(cardRef.current)
      .getPropertyValue("margin-left");
    sliderRef.current.scrollLeft +=
      (cardRef.current.getBoundingClientRect().width +
        parseInt(cardWidthPlusMargin)) *
      slideMultiplier;
    console.log(
      cardRef.current.getBoundingClientRect().width +
        parseInt(cardWidthPlusMargin)
    );
  };

  return {
    isScrollAtStart,
    isScrollAtEnd,
    isScrollAvailable,
    getScrollPosition,
    handleClickNext,
    handleClickPrev,
    mouseEnterSlide,
    sliderRef,
    cardRef,
  };
};

export default useSlider;
