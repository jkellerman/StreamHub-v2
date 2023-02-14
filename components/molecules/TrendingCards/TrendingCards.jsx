import Image from "next/future/image";
import Link from "next/link";
import styles from "@/components/molecules/TrendingCards/TrendingCards.module.css";
import { shimmer, toBase64 } from "@/utils/utils";
import { TRENDING_BACKDROP_URL_IMAGE } from "@/constants/tmdb";
import TrendingCardDetails from "@/components/molecules/TrendingCardDetails/TrendingCardDetails";
import chevronLeft from "@/public/assets/chevron-left-solid.svg";
import chevronRight from "@/public/assets/chevron-right-solid.svg";
import useSlider from "hooks/useSlider";

const TrendingCards = ({ trending }) => {
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
      {" "}
      <div className={styles.outerBanner}>
        <div
          className={styles.banner}
          ref={sliderRef}
          onScroll={getScrollPosition}
        >
          {trending.map((item) => {
            return (
              <article className={styles.container} key={item.id}>
                <Link
                  href={
                    item.title
                      ? `/movie/${item.id}?${item.title.replace(/ /g, "")}`
                      : `/show/${item.id}?${item.name.replace(/ /g, "")}`
                  }
                >
                  <a className={styles.link} ref={cardRef}>
                    <Image
                      src={`${TRENDING_BACKDROP_URL_IMAGE}${item.backdrop_path}`}
                      alt={item.title ? `${item.title}` : `${item.name}`}
                      placeholder="blur"
                      unoptimized={true}
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(240, 140)
                      )}`}
                      width={220}
                      height={120}
                      priority={true}
                      className={styles.trendingCard}
                    />
                  </a>
                </Link>
                <TrendingCardDetails
                  image={item.backdrop_path}
                  movieTitle={item.title}
                  seriesName={item.name}
                  release_date={item.release_date}
                  type={item.media_type}
                  air_date={item.first_air_date}
                />
              </article>
            );
          })}
        </div>
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
