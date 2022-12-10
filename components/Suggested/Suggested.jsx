import styles from "@/components/Suggested/Suggested.module.css";
import Link from "next/link";
import Image from "next/image";
import { POSTER_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";
import useSlider from "hooks/useSlider";

const Suggested = ({ suggested, movies, closeReadMore }) => {
  const {
    isScrollAtStart,
    isScrollAtEnd,
    getScrollPosition,
    handleClickNextSuggestion,
    handleClickPrevSuggestion,
    mouseEnterSlide,
    sliderRef,
    cardRef,
  } = useSlider();

  const suggestedArr = suggested.results.filter(
    (suggested) => suggested.poster_path !== null
  );

  return (
    <section className={styles.container}>
      {!suggested.results.length > 0 ? null : (
        <div className={styles.heading}>people also liked</div>
      )}
      <div className={styles.outerContainer}>
        <div
          className={styles.suggestions}
          ref={sliderRef}
          onScroll={getScrollPosition}
          onMouseEnter={mouseEnterSlide}
        >
          {suggestedArr.map((suggestion) => {
            return (
              <article key={suggestion.id} className={styles.linkContainer}>
                <Link
                  href={
                    movies
                      ? `/movies/${suggestion.id}/${suggestion.title.replace(
                          /\s+/g,
                          "-"
                        )}`
                      : `/series/${suggestion.id}/${suggestion.name.replace(
                          /\s+/g,
                          "-"
                        )}`
                  }
                  rel="preload"
                >
                  <a
                    className={styles.suggestionContainer}
                    onClick={() => {
                      closeReadMore();
                      setTimeout(() => {
                        sliderRef.current.scrollLeft = 0;
                      }, 3000);
                    }}
                    ref={cardRef}
                  >
                    <Image
                      src={`${POSTER_URL_IMAGE}${suggestion.poster_path}`}
                      alt={`${suggestion.title} poster`}
                      unoptimized={true}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(240, 140)
                      )}`}
                      layout="fill"
                      objectFit="cover"
                      className={styles.suggestionCard}
                    />
                  </a>
                </Link>
                {movies ? (
                  <div className={styles.name}>{suggestion.title}</div>
                ) : (
                  <div className={styles.name}>{suggestion.name}</div>
                )}
              </article>
            );
          })}
        </div>
        {suggested.results.length === 0 ? null : isScrollAtStart ? (
          <button
            className={`${styles.navigation} ${styles.navigationPrev}`}
            onClick={handleClickPrevSuggestion}
            aria-label="click for previous suggestions"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                fill="#FFF"
                opacity="0.4"
              />
            </svg>
          </button>
        ) : (
          <button
            className={`${styles.navigation} ${styles.navigationPrev}`}
            onClick={handleClickPrevSuggestion}
            aria-label="click for previous suggestions"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                fill="#FFF"
              />
            </svg>
          </button>
        )}
        {suggested.results.length === 0 ? null : isScrollAtEnd ? (
          <button
            className={`${styles.navigation} ${styles.navigationNext}`}
            onClick={handleClickNextSuggestion}
            aria-label="click for more suggestions"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                fill="#FFF"
                opacity="0.4"
              />
            </svg>
          </button>
        ) : (
          <button
            className={`${styles.navigation} ${styles.navigationNext}`}
            onClick={handleClickNextSuggestion}
            aria-label="click for more suggestions"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
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

export default Suggested;
