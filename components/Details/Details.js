import styles from "@/components/Details/Details.module.css";

const Details = ({ director, cast, genres }) => {
  return (
    <dl className={styles.details}>
      <dt>director</dt>
      <dd>{director}</dd>
    </dl>
  );
};

export default Details;
