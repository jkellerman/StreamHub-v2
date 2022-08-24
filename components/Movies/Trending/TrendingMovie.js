// import Link from "next/link";
import Image from "next/image";
import { BASE_URL_IMAGE } from "@/utils/utils";
import styles from "../Trending/TrendingMovie.module.css";
import { shimmer, toBase64 } from "@/utils/utils";

const TrendingMovie = ({ image, id, title, year, type }) => {
  return (
    <a className={styles.link}>
      <article className={styles.container}>
        <Image
          src={`${BASE_URL_IMAGE}${image}`}
          alt={`Backdrop of the movie "${title}"`}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(240, 140)
          )}`}
        />
      </article>
      <h2 className={styles.title}>
        {" "}
        {title.length > 27 ? `${title.slice(0, 27)}...` : title}
      </h2>
      <div className={styles.details}>
        <span>{year.slice(0, 4)} &nbsp;•&nbsp;</span>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path
            transform="scale(0.7)"
            d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
            fill="#FFFFFF"
          />
        </svg>
        <span>&nbsp;{type}</span>
      </div>
    </a>
  );
};

export default TrendingMovie;
