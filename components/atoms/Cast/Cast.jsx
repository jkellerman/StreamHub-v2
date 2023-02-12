import styles from "../Cast/Cast.module.css";

const Cast = ({ cast }) => {
  return (
    <div className={styles.detailItem}>
      <div>
        <dt className={styles.heading}>cast</dt>
      </div>
      <div className={styles.group}>
        {cast.map((member, index) => {
          return (
            <dd className={styles.name} key={member.id}>
              {index === cast.length - 1 ? member.name : `${member.name},`}
              &nbsp;
            </dd>
          );
        })}
      </div>
    </div>
  );
};

export default Cast;
