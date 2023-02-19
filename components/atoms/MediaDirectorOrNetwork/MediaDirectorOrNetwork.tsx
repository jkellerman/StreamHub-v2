import React from "react";
import { Media } from "types";
import styles from "../MediaDirectorOrNetwork/MediaDirectorOrNetwork.module.css";

interface MediaDirectorOrNetworkProps {
  director?: Media.IDirectorOrNetwork;
  network?: Media.IDirectorOrNetwork;
}

const MediaDirectorOrNetwork: React.FC<MediaDirectorOrNetworkProps> = ({
  director,
  network,
}) => {
  return (
    <>
      <div className={styles.detailItem}>
        <dt className={styles.heading}>{director ? "director" : "network"}</dt>
        <dd className={styles.name}>
          {director ? director.toString() : network?.toString()}
        </dd>
      </div>
    </>
  );
};

export default MediaDirectorOrNetwork;
