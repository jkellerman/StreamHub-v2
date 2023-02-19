import React, { useEffect } from "react";
import styles from "@/components/molecules/Recommendations/Recommendations.module.css";
import Link from "next/link";
import Image from "next/image";
import { shimmer, toBase64 } from "@/utils/utils";
import { POSTER_URL_IMAGE } from "@/constants/tmdb";
import useSlider from "hooks/useSlider";
import { useRouter } from "next/router";
import { Media } from "types";

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
      recommendations.poster_path !== null
  );

  const router = useRouter();

  // Set scroll availability everytime component mounts otherwise nav buttons may not update between page renders.

  useEffect(() => {
    if (sliderRef.current) {
      if (sliderRef.current.scrollWidth > sliderRef.current.offsetWidth) {
        setIsScrollAvailable(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events]);

  return (
    <section className={styles.container}>
      {/* heading */}
      {recommendations.results.length === 0 ? null : (
        <h3 className={styles.heading}>people also liked</h3>
      )}

      {/* banner */}
      <div className={styles.outerContainer}>
        <div
          className={styles.recommendations}
          ref={sliderRef}
          onScroll={getScrollPosition}
        >
          {/* Poster links */}
          {recommendationsArr.map((item) => {
            return (
              <article
                key={item.id}
                className={styles.linkContainer}
                ref={cardRef}
              >
                <Link
                  href={
                    movies
                      ? `/movie/${item.id}?${item.title.replace(/\s+/g, "")}`
                      : `/show/${item.id}?${item.name.replace(/\s+/g, "")}`
                  }
                  rel="preload"
                >
                  <a className={styles.recommendationContainer}>
                    <Image
                      src={`${POSTER_URL_IMAGE}${item.poster_path}`}
                      alt={`${item.title} poster`}
                      unoptimized={true}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(240, 140)
                      )}`}
                      layout="fill"
                      objectFit="cover"
                      className={styles.recommendationCard}
                    />
                  </a>
                </Link>
                {movies ? (
                  <div className={styles.name}>{item.title}</div>
                ) : (
                  <div className={styles.name}>{item.name}</div>
                )}
              </article>
            );
          })}
        </div>

        {/* Arrows */}
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
