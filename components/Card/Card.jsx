import Link from "next/link";
import Image from "next/image";
import { BASE_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";
import styles from "../Card/Card.module.css";

const Card = ({ id, image, seriesName, title }) => {
  return (
    <Link
      href={
        title
          ? `/movies/${id}/${title.replaceAll(" ", "-")}`
          : `/series/${id}/${seriesName.replaceAll(" ", "-")}`
      }
    >
      <a className={styles.container}>
        <Image
          src={`${BASE_URL_IMAGE}${image}`}
          alt={`${seriesName || title}`}
          unoptimized={true}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(240, 140)
          )}`}
        />
      </a>
    </Link>
  );
};

export default Card;
