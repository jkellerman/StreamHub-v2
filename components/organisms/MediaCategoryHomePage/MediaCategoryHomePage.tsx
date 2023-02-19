import React from "react";
import CategoryHeading from "@/components/atoms/CategoryHeading/CategoryHeading";
import styles from "../MediaCategoryHomePage/MediaCategoryHomePage.module.css";
import CardList from "../../molecules/CardList/CardList";
import { Media } from "types";

interface MediaCategoryHomePageProps {
  data: Media.IMediaItem[];
  type: string;
  category: string;
}

const MediaCategoryHomePage: React.FC<MediaCategoryHomePageProps> = ({
  data,
  category,
  type,
}) => {
  return (
    <section className={styles.section}>
      <CategoryHeading category={category} type={type} home />
      <CardList cards={data} />
    </section>
  );
};

export default MediaCategoryHomePage;
