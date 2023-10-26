import React from "react";

import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import Spinner from "@/components/Spinner/Spinner";
import { Media } from "@/types/media";

import styles from "../CardList/CardList.module.scss";

interface CardListProps {
  cards: Media.IMediaItem[];
  isLoading?: boolean;
  isError?: boolean;
}

const CardList: React.FC<CardListProps> = ({ cards, isLoading, isError }) => {
  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div>We&apos;re having trouble loading the data at the moment. Please try again later.</div>
    );

  return (
    <ul className={styles.container}>
      {cards.map(
        ({ id, poster_path, title, name, release_date, first_air_date }: Media.IMediaItem) => {
          return (
            <li key={id} className={styles.linkContainer}>
              <Card id={id} poster={poster_path} movieTitle={title} seriesName={name} />
              <CardDetails
                movieYear={release_date}
                movieTitle={title}
                seriesYear={first_air_date}
                seriesName={name}
              />
            </li>
          );
        }
      )}
    </ul>
  );
};

export default CardList;
