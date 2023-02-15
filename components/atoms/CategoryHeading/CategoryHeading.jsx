import styles from "../CategoryHeading/CategoryHeading.module.css";
import Link from "next/link";
import Image from "next/future/image";
import movie from "@/public/assets/icon-category-movie.svg";
import tv from "@/public/assets/icon-category-tv.svg";

const CategoryHeading = ({ type, category, home, trending }) => {
  return (
    <div className={styles.headingContainer}>
      <div className={styles.headingAndIconWrapper}>
        <h1 className={styles.heading}>{category}</h1>

        {type === "trending" && (
          <>
            <Image
              src={movie}
              alt="movie-icon"
              unoptimized={true}
              width={15}
              height={15}
            />
            <Image
              src={tv}
              alt="movie-icon"
              unoptimized={true}
              width={15}
              height={15}
            />
          </>
        )}

        {type === "movies" && (
          <Image
            src={movie}
            alt="movie-icon"
            unoptimized={true}
            width={15}
            height={15}
          />
        )}

        {type === "series" && (
          <Image
            src={tv}
            alt="movie-icon"
            unoptimized={true}
            width={15}
            height={15}
          />
        )}
      </div>
      {trending && (
        <Link href={`/trending`}>
          <a className={styles.categoryLink}>see more</a>
        </Link>
      )}
      {home && (
        <Link href={`/${type}/${category.replace(/\s/g, "")}`}>
          <a className={styles.categoryLink}>see more</a>
        </Link>
      )}
    </div>
  );
};

export default CategoryHeading;
