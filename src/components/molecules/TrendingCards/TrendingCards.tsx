import Image from "next/future/image";
import Link from "next/link";
import React from "react";

import TrendingCardDetails from "@/components/molecules/TrendingCardDetails/TrendingCardDetails";
import styles from "@/components/molecules/TrendingCards/TrendingCards.module.css";
import { BACKDROP_URL_IMAGE } from "@/constants/tmdb";
import useSlider from "@/hooks/useSlider";
import chevronLeft from "@/public/assets/chevron-left-solid.svg";
import chevronRight from "@/public/assets/chevron-right-solid.svg";
import { Media } from "@/src/types";
import { shimmer, toBase64 } from "@/utils/placeholder";

interface TrendingCardsProps {
  cards: Media.IMediaItem[];
}

const TrendingCards: React.FC<TrendingCardsProps> = ({ cards }) => {
  const {
    isScrollAtStart,
    isScrollAtEnd,
    getScrollPosition,
    handleClickNext,
    handleClickPrev,
    sliderRef,
    cardRef,
  } = useSlider();
  return (
    <>
      <div className={styles.outerBanner}>
        <ul
          className={styles.banner}
          ref={sliderRef}
          onScroll={getScrollPosition}
        >
          {cards.map((item) => {
            return (
              <li className={styles.container} key={item.id} ref={cardRef}>
                <Link
                  href={
                    item.title
                      ? `/movie/${item.id}?${item.title.replace(/ /g, "")}`
                      : `/show/${item.id}?${item.name.replace(/ /g, "")}`
                  }
                >
                  <a className={styles.link}>
                    <Image
                      src={`${BACKDROP_URL_IMAGE}${item.backdrop_path}`}
                      alt={item.title ? `${item.title}` : `${item.name}`}
                      placeholder="blur"
                      unoptimized={true}
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(240, 140)
                      )}`}
                      width={591}
                      height={333}
                      priority
                      className={styles.trendingCard}
                    />
                  </a>
                </Link>
                <TrendingCardDetails
                  movie_title={item.title}
                  series_name={item.name}
                  release_date={item.release_date}
                  type={item.media_type}
                  air_date={item.first_air_date}
                />
              </li>
            );
          })}
        </ul>
        {isScrollAtStart ? null : (
          <button
            className={`${styles.navigation} ${styles.navigationPrev}`}
            onClick={() => handleClickPrev()}
            aria-label="click for previous trending"
          >
            <Image
              src={chevronLeft}
              alt="arrow left"
              unoptimized={true}
              className={styles.arrow}
            />
          </button>
        )}
        {isScrollAtEnd ? null : (
          <button
            className={`${styles.navigation} ${styles.navigationNext}`}
            onClick={() => handleClickNext()}
            aria-label="click for next trending"
          >
            <Image
              src={chevronRight}
              alt="arrow right"
              unoptimized={true}
              className={styles.arrow}
            />
          </button>
        )}
      </div>
    </>
  );
};

export default TrendingCards;
