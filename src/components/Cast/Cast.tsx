import React from "react";

import { MediaId } from "@/types/tmdb";

import styles from "../Cast/Cast.module.scss";

interface CastProps {
  cast: MediaId[];
}

const Cast: React.FC<CastProps> = ({ cast }) => {
  return (
    <div className={styles.detailItem}>
      <dt className={styles.heading}>starring</dt>

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
