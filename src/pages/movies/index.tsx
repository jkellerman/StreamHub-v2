import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";

import CardList from "@/components/CardList/CardList";
import Dropdown, { DropdownsContainer } from "@/components/Dropdown/Dropdown";
import styles from "@/components/Dropdown/Dropdown.module.scss";
import Description from "@/components/MediaPageDescription/MediaPageDescription";
import { DEFAULT_MOVIES_GENRE, DEFAULT_SERVICES } from "@/constants/app";
import { servicesList, BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Genres } from "@/src/types";

interface MoviesIndexPageProps {
  genreList: Genres.IGenre[];
}

const Movies: React.FC<MoviesIndexPageProps> = ({ genreList }) => {
  const { query, pathname } = useRouter();
  const genre =
    genreList.find(({ name }) => name.toLowerCase() === query.genre) || DEFAULT_MOVIES_GENRE;
  const isDefaultGenre = genre.name === DEFAULT_MOVIES_GENRE.name;
  const endpoint = !isDefaultGenre
    ? `api/media/genre/movie/${genre.id}`
    : `/api/network/movie/8|337|9|531|350`;
  const pageType = pathname.replace(/\//g, "");
  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteScroll(endpoint);
  const service =
    servicesList.find(({ provider_name }) => provider_name.toLowerCase() === query.genre) ||
    DEFAULT_SERVICES;
  return (
    <>
      <Head>
        <title>{`Watch ${genre.name} Movies Online | Reelgood`}</title>
        <meta
          name="description"
          content="Find out where to watch movies from Netflix, Amazon Prime, Disney+ and many more services"
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

export default Movies;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/movie/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList: [DEFAULT_MOVIES_GENRE, ...genreList.genres],
    },
  };
};
