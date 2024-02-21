import { LazyMotion, domAnimation, m } from "framer-motion";
import React from "react";

import Cast from "@/components/Cast/Cast";
import MediaDirectorOrNetwork from "@/components/MediaDirectorOrNetwork/MediaDirectorOrNetwork";
import MediaOverview from "@/components/MediaOverview/MediaOverview";
import Poster from "@/components/Poster/Poster";
import { Media } from "@/types/media";

import styles from "../MediaInfoBox/MediaInfoBox.module.scss";

interface MediaInfoBoxProps {
  title: string;
  overview: string;
  poster: string;
  children: React.ReactNode;
  cast: Media.ICastMember[];
  director?: Media.IDirector;
  network?: string[];
}

const MediaInfoBox: React.FC<MediaInfoBoxProps> = ({
  title,
  overview,
  poster,
  cast,
  director,
  network,
  children,
}) => {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <m.div
          className={styles.container}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              ease: "easeInOut",
              duration: 0.3,
              delay: 0.2,
            },
          }}
        >
          <div className={styles.mediaInfoCard}>
            <Poster poster={poster} title={title} />
            <dl className={styles.details}>
              <MediaDirectorOrNetwork director={director} network={network} />
              <Cast cast={cast} />
            </dl>
          </div>

          <div className={styles.content}>
            <MediaOverview overview={overview} />
            {children}
          </div>
        </m.div>
      </LazyMotion>
    </>
  );
};

export default MediaInfoBox;
