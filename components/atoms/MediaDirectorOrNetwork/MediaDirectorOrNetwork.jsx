import styles from "../MediaDirectorOrNetwork/MediaDirectorOrNetwork.module.css";

const MediaDirectorOrNetwork = ({ director, network }) => {
  return (
    <>
      <div className={styles.detailItem}>
        <dt className={styles.heading}>{director ? "director" : "network"}</dt>
        <dd className={styles.name}>{director ? director : network}</dd>
      </div>
    </>
  );
};

export default MediaDirectorOrNetwork;
