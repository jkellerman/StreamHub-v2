import { LazyMotion, domAnimation, m } from "framer-motion";
import React from "react";

import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import Spinner from "@/components/Spinner/Spinner";
import { Media } from "@/types/media";

import Button from "../Buttons/Buttons";
import styles from "../CardList/CardList.module.scss";
import Icon from "../Icon/Icon";

interface InfiniteQueryProps {
  fetchNextPage: () => Promise<unknown>;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
}

interface CardListProps extends InfiniteQueryProps {
  cards: Media.IMediaItem[];
  isLoading?: boolean;
  isError?: boolean;
}

const CardList: React.FC<CardListProps> = ({
  cards,
  isLoading,
  isError,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) => {
  if (isLoading) return <Spinner forList />;
  if (isError)
    return (
      <div className={styles.error}>
        We&apos;re having trouble loading the data at the moment. Please try again later.
      </div>
    );

  return (
    <div className={styles.container}>
      <LazyMotion features={domAnimation}>
        <ul className={styles.list}>
          {cards.map(
            ({ id, poster_path, title, name, release_date, first_air_date }: Media.IMediaItem) => {
              return (
                <m.li
                  key={id}
                  className={styles.linkContainer}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      ease: "easeInOut",
                      duration: 0.3,
                    },
                  }}
                >
                  <Card id={id} poster={poster_path} movieTitle={title} seriesName={name} />
                  <CardDetails
                    movieYear={release_date}
                    movieTitle={title}
                    seriesYear={first_air_date}
                    seriesName={name}
                  />
                </m.li>
              );
            }
          )}
        </ul>
      </LazyMotion>

      <PaginationButton
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default CardList;

export const PaginationButton: React.FC<InfiniteQueryProps> = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) => {
  return (
    <div
      className={
        isFetchingNextPage ? `${styles.buttonContainer} ${styles.loading}` : styles.buttonContainer
      }
    >
      {hasNextPage && (
        <Button variant="secondary" onClick={() => fetchNextPage()} isLoading={isFetchingNextPage}>
          <Icon
            icon="chevronDown"
            width="17"
            height="17"
            fill={isFetchingNextPage ? "#5a6a90" : "#FFF"}
          />
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )}
    </div>
  );
};
