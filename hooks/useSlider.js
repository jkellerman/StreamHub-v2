import { useState, useRef } from "react";

const useSlider = () => {
  const [isScrollAtStart, setIsScrollAtStart] = useState(true);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState(false);
  const [isScrollAvailable, setIsScrollAvailable] = useState(false);
  const sliderRef = useRef();
  const cardRef = useRef();

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

  const handleClickPrev = () => {
    const cardWidthPlusMargin = window
      .getComputedStyle(cardRef.current)
      .getPropertyValue("margin-right");
    sliderRef.current.scrollLeft -=
      cardRef.current.getBoundingClientRect().width +
      parseInt(cardWidthPlusMargin);
  };

  const handleClickNext = () => {
    const cardWidthPlusMargin = window
      .getComputedStyle(cardRef.current)
      .getPropertyValue("margin-right");
    sliderRef.current.scrollLeft +=
      cardRef.current.getBoundingClientRect().width +
      parseInt(cardWidthPlusMargin);
  };
  const handleClickPrevSuggestion = () => {
    const cardWidthPlusMargin = window
      .getComputedStyle(cardRef.current)
      .getPropertyValue("margin-right");
    sliderRef.current.scrollLeft -=
      (cardRef.current.getBoundingClientRect().width +
        parseInt(cardWidthPlusMargin)) *
      2;
  };

  const handleClickNextSuggestion = () => {
    const cardWidthPlusMargin = window
      .getComputedStyle(cardRef.current)
      .getPropertyValue("margin-right");
    sliderRef.current.scrollLeft +=
      (cardRef.current.getBoundingClientRect().width +
        parseInt(cardWidthPlusMargin)) *
      2;
  };

  return {
    isScrollAtStart,
    isScrollAtEnd,
    isScrollAvailable,
    getScrollPosition,
    handleClickNext,
    handleClickPrev,
    handleClickNextSuggestion,
    handleClickPrevSuggestion,
    mouseEnterSlide,
    sliderRef,
    cardRef,
  };
};

export default useSlider;
