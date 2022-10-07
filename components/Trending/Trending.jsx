import styles from "@/components/Trending/Trending.module.css";
import Image from "next/future/image";
import Link from "next/link";
import { BACKDROP_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";
import TrendingCardDetails from "@/components/TrendingCardDetails/TrendingCardDetails";
import useSlider from "hooks/useSlider";
import chevronLeft from "@/public/assets/chevron-left-solid.svg";
import chevronRight from "@/public/assets/chevron-right-solid.svg";

const Trending = ({ trending, time }) => {
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
    <section>
      <h1>{time}</h1>
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
                      ? `/movies/${item.id}/${item.title.replaceAll(" ", "-")}`
                      : `/series/${item.id}/${item.name.replaceAll(" ", "-")}`
                  }
                >
                  <a className={styles.link} ref={cardRef}>
                    <Image
                      src={`${BACKDROP_URL_IMAGE}${item.backdrop_path}`}
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
                  year={item.release_date}
                  type={item.media_type}
                  airDate={item.first_air_date}
                />
              </article>
            );
          })}
        </div>
        {isScrollAtStart ? null : (
          <button
            className={`${styles.navigation} ${styles.navigationPrev}`}
            onClick={handleClickPrev}
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
            onClick={handleClickNext}
            aria-label="click for more trending"
          >
            <Image
              src={chevronRight}
              alt="arrow right"
              unoptimized={true}
              className={styles.arrow}
              priority={true}
            />
          </button>
        )}
      </div>
    </section>
  );
};

export default Trending;
