import styles from "./MediaPageDescription.module.scss";

interface DescriptionProps {
  type: "movie" | "series";
}

const Description: React.FC<DescriptionProps> = ({ type }) => {
  return (
    <div className={styles.descriptionWrapper}>
      <p className={styles.description}>
        Below is a list of all {type === "movie" ? "movies" : "TV series"} you can stream online .
        The default view is sorted by popularity, and you can easily filter by genre and streaming
        service using the options above.
      </p>
    </div>
  );
};

export default Description;
