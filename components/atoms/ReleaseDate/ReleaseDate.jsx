import styles from "../ReleaseDate/ReleaseDate.module.css";

const DATE_SLICE = 4;

const ReleaseDate = ({ release_date, air_date, styled, mediaDetailsTab }) => {
  return (
    <>
      {release_date ? (
        <span className={styled ? styles.date : null}>
          {mediaDetailsTab ? release_date : release_date.slice(0, DATE_SLICE)}
        </span>
      ) : (
        <span className={styled ? styles.date : null}>
          {mediaDetailsTab ? air_date : air_date.slice(0, DATE_SLICE)}
        </span>
      )}
    </>
  );
};

export default ReleaseDate;
