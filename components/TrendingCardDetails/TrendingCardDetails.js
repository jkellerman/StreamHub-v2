import styles from "@/components/TrendingCardDetails/TrendingCardDetails.module.css";

const TrendingCardDetails = ({
  movieTitle,
  year,
  type,
  seriesName,
  airDate,
}) => {
  return (
    <>
      <h2 className={styles.title}>
        {seriesName && seriesName.length > 27
          ? `${seriesName.slice(0, 27)}...`
          : seriesName}

        {movieTitle && movieTitle.length > 27
          ? `${movieTitle.slice(0, 27)}...`
          : movieTitle}
      </h2>
      <div className={styles.details}>
        {year && <span>{year.slice(0, 4)} &nbsp;•&nbsp;</span>}
        {airDate && <span>{airDate.slice(0, 4)} &nbsp;•&nbsp;</span>}
        {type === "movie" ? (
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
        ) : (
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.icon}
          >
            <path
              transform="scale(0.7)"
              d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z"
              fill="#FFFFFF"
            />
          </svg>
        )}
        <span>&nbsp;{type === "tv" ? "series" : type}</span>
      </div>
    </>
  );
};

export default TrendingCardDetails;
