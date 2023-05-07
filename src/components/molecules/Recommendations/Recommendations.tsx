import { useRouter } from "next/router";
import React, { useEffect } from "react";

import Poster from "@/components/atoms/Poster/Poster";
import styles from "@/components/molecules/Recommendations/Recommendations.module.scss";
import useSlider from "@/hooks/useSlider";
import { Media } from "@/src/types";

interface RecommendationsProps {
  movies?: boolean;
  recommendations: Media.IRecommendationsList;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
  movies,
}) => {
  const {
    isScrollAvailable,
    isScrollAtStart,
    isScrollAtEnd,
    getScrollPosition,
    handleClickNext,
    handleClickPrev,
    setIsScrollAvailable,
    setIsScrollAtEnd,
    sliderRef,
    cardRef,
  } = useSlider();

  const recommendationsArr = recommendations.results?.filter(
    (recommendations: Media.IRecommendations) =>
      recommendations.backdrop_path !== null
  );

  const router = useRouter();

  // Set scroll availability when component mounts otherwise nav buttons won't update between route changes.
  useEffect(() => {
    if (sliderRef.current) {
      if (sliderRef.current.scrollWidth > sliderRef.current.offsetWidth) {
        setIsScrollAvailable(true);
      }
    }
  }, [setIsScrollAvailable, sliderRef]);

  // When route changees, set slider to default position & set availability for nav buttons
  useEffect(() => {
    const handleRouteChange = () => {
      if (sliderRef.current) {
        if (sliderRef.current.scrollWidth > sliderRef.current.offsetWidth) {
          setIsScrollAvailable(true);
          setIsScrollAtEnd(false);
          sliderRef.current.scrollLeft = 0;
        } else {
          setIsScrollAvailable(false);
        }
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, setIsScrollAtEnd, setIsScrollAvailable, sliderRef]);

  return (
    <section className={styles.container}>
      {recommendationsArr.length === 0 ? null : (
        <h2 className={styles.heading}>people also liked</h2>
      )}

      <div className={styles.outerContainer}>
        <ul
          className={styles.recommendations}
          ref={sliderRef}
          onScroll={getScrollPosition}
        >
          {recommendationsArr.map(({ id, poster_path, title, name }) => {
            return (
              <li key={id} className={styles.linkContainer} ref={cardRef}>
                <Poster
                  poster={poster_path}
                  title={title}
                  recommendation
                  movies={movies}
                  id={id}
                  name={name}
                />
                {movies ? (
                  <h3 className={styles.name}>{title}</h3>
                ) : (
                  <h3 className={styles.name}>{name}</h3>
                )}
              </li>
            );
          })}
        </ul>

        {!isScrollAvailable ? null : (
          <button
            className={`${styles.navigation} ${styles.navigationPrev}`}
            onClick={() => handleClickPrev()}
            aria-label="click for previous recommendation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                fill="#FFF"
                opacity={isScrollAtStart ? "0.4" : "1"}
              />
            </svg>
          </button>
        )}
        {!isScrollAvailable ? null : (
          <button
            className={`${styles.navigation} ${styles.navigationNext}`}
            onClick={() => handleClickNext()}
            aria-label="click for more recommendation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                fill="#FFF"
                opacity={isScrollAtEnd ? "0.4" : "1"}
              />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default Recommendations;
