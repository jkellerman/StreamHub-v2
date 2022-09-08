import styles from "@/components/Suggested/Suggested.module.css";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";

const Suggested = ({ suggested }) => {
  return (
    <section className={styles.container}>
      <h4 className={styles.heading}>suggested</h4>

      {suggested.results.length > 0 ? (
        <div className={styles.suggestions}>
          {suggested.results.map((suggestion) => {
            return (
              <article>
                <Link
                  href={`/movies/${suggestion.id}?name=${suggestion.title}`}
                  key={suggestion.id}
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
                <div>
                  {suggestion.title.length > 15
                    ? `${suggestion.title.slice(0, 15)}...`
                    : suggestion.title}
                </div>
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
