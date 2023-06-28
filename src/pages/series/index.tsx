import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";

import Description from "@/components/atoms/MediaPageDescription/MediaPageDescription";
import CardList from "@/components/molecules/CardList/CardList";
import Dropdown from "@/components/molecules/Dropdown/Dropdown";
import DropdownsContainer from "@/components/organisms/DropdownsContainer/DropdownsContainer";
import styles from "@/components/organisms/DropdownsContainer/DropdownsContainer.module.scss";
import { DEFAULT_SERIES_GENRE, DEFAULT_SERVICES } from "@/constants/app";
import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL, servicesList } from "@/constants/tmdb";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Genres } from "@/src/types";

interface SeriesIndexPageProps {
  genreList: Genres.IGenre[];
}

const Series: React.FC<SeriesIndexPageProps> = ({ genreList }) => {
  const { query, pathname } = useRouter();
  const genre =
    genreList.find((item: Genres.IGenre) => item.name.toLowerCase() === query.genre) ||
    DEFAULT_SERIES_GENRE;
  const isDefaultGenre = genre.name === DEFAULT_SERIES_GENRE.name;
  const endpoint = !isDefaultGenre ? `api/series/genre/${genre.id}` : "api/trending/tv/day";
  const pageType = pathname.replace(/\//g, "");
  const { cards, isLoading, isError } = useInfiniteScroll(endpoint);
  const service =
    servicesList.find(({ provider_name }) => provider_name.toLowerCase() === query.genre) ||
    DEFAULT_SERVICES;

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
        <DropdownsContainer>
          <Dropdown type={pageType} selected_genre={genre} genre_list={genreList} />
          <Dropdown type={pageType} media={pageType} />
          <span className={styles.span}>On</span>
          <Dropdown type={pageType} selected_service={service} services_list={servicesList} />
        </DropdownsContainer>
        <Description />
        <CardList cards={cards} isLoading={isLoading} isError={isError} />
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
      genreList: [DEFAULT_SERIES_GENRE, ...genreList.genres],
    },
  };
};
