import { useRef, useState, useEffect, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

const useSlider = () => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [clientWidth, setClientWidth] = useState<number | undefined>();
  const [scrollableWidth, setScrollableWidth] = useState<number | undefined>();
  const [isScrollAvailable, setIsScrollAvailable] = useState(false);
  const [isScrollAtStart, setIsScrollAtStart] = useState(true);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState(false);
  // Scroll states are triggered by user scrolling using touch screen or trackpad, carousel states are triggered by button navigations.
  const [isCarouselAtStart, setIsCarouselAtStart] = useState(true);
  const [isCarouselAtEnd, setIsCarouselAtEnd] = useState(false);

  const [totalNumOfCards, setTotalNumOfCards] = useState<number | undefined>();
  const [cardWidth, setCardWidth] = useState<number | undefined>();
  const [carouselWidth, setCarouselWidth] = useState<number | undefined>();
  const [numOfAccumulatedCards, setNumOfAccumulatedCards] = useState(0);
  const [accumulatedTranslation, setAccumulatedTranslation] = useState(0);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    setAccumulatedTranslation(0); // Sets the carousel to it's original position when the window is resized. This helps keeping the carousel user-friendly if the user clicks through carousel and resizes the window.
  };

  const debouncedHandleResize = useDebouncedCallback(handleWindowResize, 300); // prevents unnecessary re-renders when resizing the window

  useEffect(() => {
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [debouncedHandleResize]);

  const getCarouselRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        const totalNumOfCards =
          node.firstChild instanceof HTMLElement ? node.firstChild.children.length : 0;
        setTotalNumOfCards(totalNumOfCards);
        setCarouselWidth(node.offsetWidth);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [windowWidth]
  ); // adding windowWidth as dependency updates the carouselWidth state when the window is resized so we always get the accurate carouselWidth when navigating through the carousel.

  const getCardWidth = useCallback((node: HTMLLIElement) => {
    setCardWidth(node?.getBoundingClientRect().width);
  }, []);

  const getScrollDimensions = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        const firstChild = node?.firstChild as HTMLElement | null;
        setScrollableWidth(firstChild?.scrollWidth);
        setClientWidth(firstChild?.clientWidth);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [windowWidth]
  ); // adding windowWidth as dependency updates the offsetwidth state when the window is resized

  useEffect(() => {
    if (scrollableWidth && clientWidth) {
      if (scrollableWidth > clientWidth) {
        setIsScrollAvailable(true); // Displays nav buttons only if necessary, e.g list may have a small number of items doesn't overflow viewport
      }
    }
  }, [scrollableWidth, clientWidth]);

  useEffect(() => {
    if (totalNumOfCards && carouselWidth && cardWidth) {
      const numOfFullyVisibleCards = Math.round(carouselWidth / cardWidth);
      if (!numOfAccumulatedCards) {
        setNumOfAccumulatedCards(numOfFullyVisibleCards); // start off accumulatedCards state with the number of cards currently fully visible in viewport.
      }
      if (numOfAccumulatedCards >= totalNumOfCards) {
        setIsCarouselAtEnd(true);
      } else {
        setIsCarouselAtEnd(false);
      }
    }
  }, [numOfAccumulatedCards, carouselWidth, cardWidth, totalNumOfCards]);

  useEffect(() => {
    if (listRef.current && carouselWidth && cardWidth) {
      listRef.current.style.transform = `translateX(${accumulatedTranslation}px)`;
      const numOfFullyVisibleCards = Math.round(carouselWidth / cardWidth);

      if (accumulatedTranslation === 0) {
        setNumOfAccumulatedCards(numOfFullyVisibleCards); // Make sure that if we end up back at the start of the carousel, the number of visible cards is reset to the number currently fully visible in viewport (number changes when cycling back from the end of the carousel)
        setIsCarouselAtStart(true);
      } else {
        setIsCarouselAtStart(false);
      }
    }
  }, [accumulatedTranslation, carouselWidth, cardWidth]);

  /**
   * Event handlers
   */

  const getScrollPosition = () => {
    // Set both carousel states to false as both the scroll event and button clicks control the colours of the arrows. If both carousel and scroll states have the same boolean value the arrow colours won't update.
    setIsCarouselAtStart(false);
    setIsCarouselAtEnd(false);
    {
      if (scrollRef.current) {
        if (scrollRef.current.scrollLeft > 0) {
          setIsScrollAtStart(false);
        }

        if (scrollRef.current.scrollLeft === 0) {
          setIsScrollAtStart(true);
        }

        if (
          scrollRef.current.scrollLeft + scrollRef.current?.offsetWidth + 1 >=
          scrollRef.current?.scrollWidth
        ) {
          setIsScrollAtEnd(true);
        } else {
          setIsScrollAtEnd(false);
        }
      }
    }
  };

  const handleClickNext = () => {
    // Set both scroll states to false as both the scroll event and button clicks control the colours of the arrows. If both carousel and scroll states have the same boolean value the arrow colours won't update.
    setIsScrollAtStart(false);
    setIsScrollAtEnd(false);
    if (listRef.current && cardWidth && carouselWidth && numOfAccumulatedCards && totalNumOfCards) {
      const numOfFullyVisibleCards = Math.round(carouselWidth / cardWidth);
      const translateSize = cardWidth * numOfFullyVisibleCards;

      // These two variables helps close the empty space at the end of the carousel when navigated to the end
      const remainingOffsetWidth = carouselWidth - (translateSize - 50);
      const remainingCardsWidth = cardWidth * (totalNumOfCards - numOfAccumulatedCards);

      if (numOfAccumulatedCards >= totalNumOfCards) return;

      if (numOfAccumulatedCards + numOfFullyVisibleCards > totalNumOfCards) {
        setNumOfAccumulatedCards((prev) => (prev += totalNumOfCards - numOfAccumulatedCards)); // Makes sure that the numOfAccumulatedCards doesn't go over the totalNumOfCards
        setAccumulatedTranslation((prev) => (prev -= remainingCardsWidth - remainingOffsetWidth)); // When towards end of carousel, only slide across number of cards left in the carousel, prevents carousel from translating too far.
        return;
      }

      if (numOfFullyVisibleCards) {
        setNumOfAccumulatedCards((prev) => (prev += numOfFullyVisibleCards));
        setAccumulatedTranslation((prev) => (prev -= cardWidth * numOfFullyVisibleCards));
      }
    }
  };

  const handleClickPrev = () => {
    if (listRef.current && cardWidth && carouselWidth) {
      const numOfFullyVisibleCards = Math.round(carouselWidth / cardWidth);
      const translateSize = cardWidth * numOfFullyVisibleCards;

      if (accumulatedTranslation === 0) return; // prevent slider from sliding if at the start
      if (accumulatedTranslation + translateSize > 0) {
        setNumOfAccumulatedCards((prev) => (prev -= numOfFullyVisibleCards));
        setAccumulatedTranslation(0); // prevents slider from oversliding when cycling back to the start
        return;
      }
      setIsCarouselAtEnd(false);
      setNumOfAccumulatedCards((prev) => (prev -= numOfFullyVisibleCards));
      setAccumulatedTranslation((prev) => (prev += cardWidth * numOfFullyVisibleCards));
    }
  };
  return {
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
  };
};

export default useSlider;
