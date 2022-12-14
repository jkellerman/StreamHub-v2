import styles from "@/components/Trending/Trending.module.css";
import Image from "next/future/image";
import Link from "next/link";
import { BACKDROP_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";
import TrendingCardDetails from "@/components/TrendingCardDetails/TrendingCardDetails";
import useSlider from "hooks/useSlider";
import chevronLeft from "@/public/assets/chevron-left-solid.svg";
import chevronRight from "@/public/assets/chevron-right-solid.svg";

const Trending = ({ trending, type }) => {
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
      <div className={styles.headingContainer}>
        <div>
          <h1 className={styles.heading}>{type}</h1>
          <span>
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.iconMovies}
            >
              <path
                d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
                fill="#FFF"
              />
            </svg>
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.iconSeries}
            >
              <path
                d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"
                fill="#FFF"
              />
            </svg>
          </span>
        </div>
        <Link href={`/trending`}>
          <a className={styles.categoryLink}>see more</a>
        </Link>
      </div>

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
                      ? `/movies/${item.id}/${item.title.replace(/\s+/g, "")}`
                      : `/series/${item.id}/${item.name.replace(/\s+/g, "")}`
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
    </section>
  );
};

export default Trending;
