import React from "react";

import MediaOverview from "@/components/atoms/MediaOverview/MediaOverview";
import Poster from "@/components/atoms/Poster/Poster";
import { Media } from "@/types/media";

import TabList from "../../molecules/TabList/TabList";
import styles from "../MediaInfoBox/MediaInfoBox.module.scss";

interface MediaInfoBoxProps {
  title: string;
  overview: string;
  poster: string;
  children: React.ReactNode;
  watch_providers: Media.IProviderList;
  release_date?: string;
  air_date?: string;
}

const MediaInfoBox: React.FC<MediaInfoBoxProps> = ({
  title,
  overview,
  poster,
  children,
  watch_providers,
  release_date,
  air_date,
}) => {
  return (
    <>
      <div className={styles.container}>
        <Poster poster={poster} title={title} hero />

        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.list}>{children}</div>
          <MediaOverview overview={overview} />
          <TabList
            watch_providers={watch_providers}
            title={title}
            release_date={release_date}
            air_date={air_date}
          />
        </div>
      </div>
    </>
  );
};

export default MediaInfoBox;
