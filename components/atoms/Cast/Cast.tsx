import React from "react";
import { Media } from "types";
import styles from "../Cast/Cast.module.css";

interface CastProps {
  cast: Media.ICastMember[];
}

const Cast: React.FC<CastProps> = ({ cast }) => {
  return (
    <div className={styles.detailItem}>
      <dt className={styles.heading}>cast</dt>

      <dd className={styles.group}>
        {cast.map((member, index) => {
          return (
            <span className={styles.name} key={member.id}>
              {index === cast.length - 1 ? member.name : `${member.name},`}
              &nbsp;
            </span>
          );
        })}
      </dd>
    </div>
  );
};

export default Cast;
