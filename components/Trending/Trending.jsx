import styles from "@/components/Trending/Trending.module.css";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";
import TrendingCardDetails from "@/components/TrendingCardDetails/TrendingCardDetails";
import useSlider from "hooks/useSlider";

const Trending = ({ arr }) => {
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
      <h1>Trending</h1>
      <div className={styles.outerBanner}>
        <div
          className={styles.banner}
          ref={sliderRef}
          onScroll={getScrollPosition}
        >
          {arr.map((item) => {
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
                      src={`${BASE_URL_IMAGE}${item.backdrop_path}`}
                      alt={item.title ? `${item.title}` : `${item.name}`}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      unoptimized={true}
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(240, 140)
                      )}`}
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              {" "}
              Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com
              License - https://fontawesome.com/license (Commercial License)
              Copyright 2022 Fonticons, Inc.{" "}
              <path
                d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                fill="#FFF"
              />
            </svg>
          </button>
        )}
        {isScrollAtEnd ? null : (
          <button
            className={`${styles.navigation} ${styles.navigationNext}`}
            onClick={handleClickNext}
            aria-label="click for more trending"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              --! Font Awesome Pro 6.2.0 by @fontawesome -
              https://fontawesome.com License - https://fontawesome.com/license
              (Commercial License) Copyright 2022 Fonticons, Inc.{" "}
              <path
                d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                fill="#FFF"
              />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default Trending;
