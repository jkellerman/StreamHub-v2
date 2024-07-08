import React from "react";

import styles from "../MediaDirectorOrNetwork/MediaDirectorOrNetwork.module.scss";

interface MediaDirectorOrNetworkProps {
  director?: string;
  network?: string[];
}

const MediaDirectorOrNetwork: React.FC<MediaDirectorOrNetworkProps> = ({ director, network }) => {
  return (
    <>
      <div className={styles.detailItem}>
        <dt className={styles.heading}>{director ? "director" : "network"}</dt>
        <dd className={styles.name}>{director ? director.toString() : network?.slice(0, 1)}</dd>
      </div>
    </>
  );
};

export default MediaDirectorOrNetwork;
