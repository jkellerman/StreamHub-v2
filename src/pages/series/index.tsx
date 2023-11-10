import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";

import CardList from "@/components/CardList/CardList";
import Dropdown, {
  DropdownsContainer,
  DropdownsOuterContainer,
} from "@/components/Dropdown/Dropdown";
import styles from "@/components/Dropdown/Dropdown.module.scss";
import Description from "@/components/MediaPageDescription/MediaPageDescription";
import { DEFAULT_GENRE, DEFAULT_NETWORK } from "@/constants/app";
import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL, seriesNetworkList } from "@/constants/tmdb";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Media } from "@/src/types";

interface SeriesIndexPageProps {
  genreList: Media.IGenre[];
}

const Series: React.FC<SeriesIndexPageProps> = ({ genreList }) => {
  const { query, pathname } = useRouter();

  const genre =
    (genreList &&
      genreList.find((item: Media.IGenre) => item.name.toLowerCase() === query.genre)) ||
    DEFAULT_GENRE;

  const network =
    seriesNetworkList.find(({ provider_name }) => provider_name.toLowerCase() === query.genre) ||
    DEFAULT_NETWORK;

  const pageType = pathname.replace(/\//g, "");

  const endpoint = `api/network/tv/8|337|9|531|350`;

  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteScroll(endpoint);

  return (
    <>
      <Head>
        <title>Watch TV series Online | Reelgood</title>
        <meta
          name="description"
          content="Find out where to watch TV shows from Netflix, Amazon Prime, Disney+ and many more services."
        />
      </Head>
      <main>
        <DropdownsOuterContainer>
          <DropdownsContainer>
            <Dropdown
              type={pageType}
              selected_genre={genre}
              genre_list={genreList}
              variant="genre"
            />
            <Dropdown type={pageType} media={pageType} variant="media" />
            <span className={styles.span}>On</span>
            <Dropdown
              type={pageType}
              selected_network={network}
              network_list={seriesNetworkList}
              variant="service"
            />
          </DropdownsContainer>
        </DropdownsOuterContainer>

        <Description />
        <CardList
          cards={cards}
          isLoading={isLoading}
          isError={isError}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      </main>
    </>
  );
};

export default Series;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/tv/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList: [DEFAULT_GENRE, ...genreList.genres],
    },
  };
};
