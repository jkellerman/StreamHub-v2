import React from "react";
import { Media } from "types";
import styles from "../Cast/Cast.module.css";

interface CastProps {
  cast: Media.ICastMember[];
}

const Cast: React.FC<CastProps> = ({ cast }) => {
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
