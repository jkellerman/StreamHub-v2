import styles from "../ReleaseDate/ReleaseDate.module.css";

const DATE_SLICE = 4;

const ReleaseDate = ({ release_date, air_date, styled, mediaDetailsTab }) => {
  return (
    <>
      {release_date && (
        <span className={styled ? styles.date : null}>
          {mediaDetailsTab ? release_date : release_date.slice(0, DATE_SLICE)}
        </span>
      )}

      {air_date && (
        <span className={styled ? styles.date : null}>
          {air_date.slice(0, DATE_SLICE)}
        </span>
      )}
    </>
  );
};

export default ReleaseDate;
