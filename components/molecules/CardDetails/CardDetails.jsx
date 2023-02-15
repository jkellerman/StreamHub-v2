import styles from "../CardDetails/CardDetails.module.css";
import ReleaseDate from "../../atoms/ReleaseDate/ReleaseDate";
import Image from "next/future/image";
import movie from "@/public/assets/icon-category-movie.svg";
import tv from "@/public/assets/icon-category-tv.svg";

const CardDetails = ({ air_date, seriesName, release_date, title }) => {
  return (
    <div>
      <div className={styles.details}>
        <ReleaseDate release_date={release_date} air_date={air_date} />
        &nbsp;&nbsp;•&nbsp;
        {title ? (
          <Image
            src={movie}
            alt="movie-icon"
            unoptimized={true}
            className={styles.iconMovies}
          />
        ) : (
          <Image
            src={tv}
            alt="tv-icon"
            unoptimized={true}
            className={styles.iconSeries}
          />
        )}
        <span className={styles.type}>
          &nbsp; {seriesName ? "series" : "movie"}
        </span>
      </div>
      <h2 className={styles.title}>{seriesName || title}</h2>
    </div>
  );
};

export default CardDetails;
