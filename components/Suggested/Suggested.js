import styles from "@/components/Suggested/Suggested.module.css";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";

const Suggested = ({ suggested, movies }) => {
  const suggestedArr = suggested.results.filter(
    (suggested) => suggested.backdrop_path !== null
  );

  return (
    <section className={styles.container}>
      <h4 className={styles.heading}>suggested</h4>

      {suggested.results.length > 0 ? (
        <div className={styles.suggestions}>
          {suggestedArr.map((suggestion) => {
            return (
              <article key={suggestion.id}>
                <Link
                  href={
                    movies
                      ? `/movies/${suggestion.id}?name=${suggestion.title}`
                      : `/series/${suggestion.id}?name=${suggestion.name}`
                  }
                >
                  <a className={styles.suggestionContainer}>
                    <Image
                      src={`${BASE_URL_IMAGE}${suggestion.backdrop_path}`}
                      alt={`${suggestion.title} backdrop`}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(240, 140)
                      )}`}
                    />
                  </a>
                </Link>
                {movies ? (
                  <div className={styles.name}>
                    {suggestion.title.length > 40
                      ? `${suggestion.title.slice(0, 40)}...`
                      : suggestion.title}
                  </div>
                ) : (
                  <div className={styles.name}>
                    {suggestion.name.length > 40
                      ? `${suggestion.name.slice(0, 40)}...`
                      : suggestion.name}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.message}>No suggestions yet</div>
      )}
    </section>
  );
};

export default Suggested;
