import Image from "next/image";
import { BASE_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";
import styles from "../Card/Card.module.css";

const Card = ({ image, seriesName }) => {
  return (
    <>
      <a className={styles.container}>
        <Image
          src={`${BASE_URL_IMAGE}${image}`}
          alt={`Backdrop of the popular series "${seriesName}"`}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(240, 140)
          )}`}
        />
      </a>
    </>
  );
};

export default Card;
