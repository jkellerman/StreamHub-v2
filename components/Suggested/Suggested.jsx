import styles from "@/components/Suggested/Suggested.module.css";
import Link from "next/link";
import Image from "next/image";
import { SUGGESTIONS_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";
import useSlider from "hooks/useSlider";
import chevronLeft from "@/public/assets/chevron-left-solid.svg";
import chevronRight from "@/public/assets/chevron-right-solid.svg";

const Suggested = ({ suggested, movies, closeReadMore }) => {
  const {
    isScrollAtStart,
    isScrollAtEnd,
    isScrollAvailable,
    getScrollPosition,
    handleClickNextSuggestion,
    handleClickPrevSuggestion,
    mouseEnterSlide,
    sliderRef,
    cardRef,
  } = useSlider();

  const suggestedArr = suggested.results.filter(
    (suggested) => suggested.backdrop_path !== null
  );

  return (
    <section className={styles.container}>
      <div className={styles.heading}>suggested</div>
      <div className={styles.outerContainer}>
        {!suggested.results.length > 0 ? (
          <div className={styles.message}>No suggestions yet</div>
        ) : (
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
                        src={`${SUGGESTIONS_URL_IMAGE}${suggestion.backdrop_path}`}
                        alt={`${suggestion.title} backdrop`}
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
        )}
        {suggested.results.length === 0 || isScrollAtStart ? null : (
          <button
            className={`${styles.navigation} ${styles.navigationPrev}`}
            onClick={handleClickPrevSuggestion}
            aria-label="click for previous suggestions"
          >
            <Image
              src={chevronLeft}
              alt="arrow left"
              unoptimized={true}
              className={styles.arrow}
            />
          </button>
        )}
        {suggested.results.length === 0 ||
        isScrollAtEnd ||
        !isScrollAvailable ? null : (
          <button
            className={`${styles.navigation} ${styles.navigationNext}`}
            onClick={handleClickNextSuggestion}
            aria-label="click for more suggestions"
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

export default Suggested;
