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
        <dt className={styles.heading}>
          {runtime >= 0 ? "runtime" : "seasons"}
        </dt>
        {runtime >= 0 && (
          <dd className={styles.description}>
            {runtime > 0 ? `${toHoursAndMinutes(runtime)}` : null}
          </dd>
        )}
        {seasons && <dd className={styles.description}>{seasons}</dd>}
      </div>
    </>
  );
};
{
}

export default MediaRunTimeOrSeasons;
