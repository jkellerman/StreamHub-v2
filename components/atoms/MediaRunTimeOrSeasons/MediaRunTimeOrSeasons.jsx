import styles from "../MediaRunTimeOrSeasons/MediaRunTimeOrSeasons.module.css";

const toHoursAndMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours} hr ${minutes} mins`;
};

const MediaRunTimeOrSeasons = ({ runtime, seasons }) => {
  return (
    <>
      <div className={styles.detailItem}>
        <dt className={styles.heading}>{runtime ? "runtime" : "seasons"}</dt>
        {runtime && (
          <dd className={styles.description}>
            {runtime && runtime > 0 ? `${toHoursAndMinutes(runtime)}` : null}
          </dd>
        )}
        {seasons && (
          <dd className={styles.description}>
            {seasons > 1 ? `${seasons} seasons` : `${seasons} season`};
          </dd>
        )}
      </div>
    </>
  );
};
{
}

export default MediaRunTimeOrSeasons;
