import React from "react";

import Card from "@/components/atoms/Card/Card";
import CardDetails from "@/components/atoms/CardDetails/CardDetails";
import Spinner from "@/components/atoms/Spinner/Spinner";
import { Media } from "@/src/types";

import styles from "../CardList/CardList.module.css";

interface CardListProps {
  cards: Media.IMediaItem[];
  isLoading?: boolean;
  isError?: boolean;
}

const CardList: React.FC<CardListProps> = ({ cards, isLoading, isError }) => {
  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div>
        We&apos;re having trouble loading the data at the moment. Please try
        again later.
      </div>
    );

  return (
    <ul className={styles.container}>
      {cards.map((item) => {
        return (
          <li key={item.id} className={styles.linkContainer}>
            <Card
              id={item.id}
              image={item.backdrop_path}
              title={item.title}
              series_name={item.name}
            />
            <CardDetails
              release_date={item.release_date}
              title={item.title}
              air_date={item.first_air_date}
              series_name={item.name}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
