import Link from "next/link";
import Image from "next/future/image";
import styles from "../Card/Card.module.css";
import { shimmer, toBase64 } from "@/utils/utils";
import { BACKDROP_URL_IMAGE } from "@/constants/tmdb";

const Card = ({ id, image, seriesName, title }) => {
  return (
    <Link
      href={
        title
          ? `/movie/${id}?${title.replace(/ /g, "")}`
          : `/show/${id}?${seriesName.replace(/ /g, "")}`
      }
    >
      <a className={styles.container}>
        <Image
          src={`${BACKDROP_URL_IMAGE}${image}`}
          alt={`${seriesName || title}`}
          unoptimized={true}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(240, 140)
          )}`}
          width={164}
          height={110}
          className={styles.card}
          priority={true}
        />
      </a>
    </Link>
  );
};

export default Card;
