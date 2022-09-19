import Image from "next/image";
import Link from "next/link";
import { BASE_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";
import TrendingCardDetails from "@/components/TrendingCardDetails/TrendingCardDetails";
import styles from "@/components/TrendingCard/TrendingCard.module.css";

const TrendingCard = ({
  image,
  movieTitle,
  seriesName,
  year,
  type,
  airDate,
  id,
}) => {
  return (
    <Link
      href={
        movieTitle
          ? `/movies/${id}/${movieTitle.replaceAll(" ", "-")}`
          : `/series/${id}/${seriesName.replaceAll(" ", "-")}`
      }
    >
      <a className={styles.link}>
        <article className={styles.container}>
          <Image
            src={`${BASE_URL_IMAGE}${image}`}
            alt={`Backdrop of the movie "${movieTitle || seriesName}"`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(240, 140)
            )}`}
          />
        </article>
        <TrendingCardDetails
          image={image}
          movieTitle={movieTitle}
          seriesName={seriesName}
          year={year}
          type={type}
          airDate={airDate}
        />
      </a>
    </Link>
  );
};

export default TrendingCard;
