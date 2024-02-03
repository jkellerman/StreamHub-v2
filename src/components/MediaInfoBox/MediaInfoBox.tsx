import { LazyMotion, domAnimation, m } from "framer-motion";
import dynamic from "next/dynamic";
import React from "react";

import Cast from "@/components/Cast/Cast";
import MediaDirectorOrNetwork from "@/components/MediaDirectorOrNetwork/MediaDirectorOrNetwork";
import MediaOverview from "@/components/MediaOverview/MediaOverview";
import Poster from "@/components/Poster/Poster";
import { Media } from "@/types/media";

import styles from "../MediaInfoBox/MediaInfoBox.module.scss";

const TabList = dynamic(() => import("@/components/TabList/TabList"));

interface MediaInfoBoxProps {
  title: string;
  overview: string;
  poster: string;

  watch_providers: Media.IProviderList;
  release_date?: string;
  air_date?: string;
  cast: Media.ICastMember[];
  director?: Media.IDirector;
  network?: string[];
}

const MediaInfoBox: React.FC<MediaInfoBoxProps> = ({
  title,
  overview,
  poster,

  watch_providers,
  release_date,
  air_date,
  cast,
  director,
  network,
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
              delay: 0.1,
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
            <TabList
              watch_providers={watch_providers}
              title={title}
              release_date={release_date}
              air_date={air_date}
            />
          </div>
        </m.div>
      </LazyMotion>
    </>
  );
};

export default MediaInfoBox;
