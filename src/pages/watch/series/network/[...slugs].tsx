import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";

import Button from "@/components/Buttons/Buttons";
import Content from "@/components/Content/Content";
import Dropdown, { DropdownsContainer } from "@/components/Dropdown/Dropdown";
import Heading from "@/components/Heading/Heading";
import MediaGenerator from "@/components/MediaGenerator/MediaGenerator";
import { Panel } from "@/components/Panel/Panel";
import styles from "@/components/Panel/Panel.module.scss";
import {
  DEFAULT_WATCH_GENRE,
  DEFAULT_WATCH_NETWORK,
  randomPageNumberSeries,
} from "@/constants/app";
import { BASE_TMDB_URL, BASE_TMDB_QUERY_PARAMS, watchSeriesNetworkList } from "@/constants/tmdb";
import useGenerator from "@/hooks/useGenerator";
import { Media } from "@/types/media";
import { randomNumber } from "@/utils/utils";

interface WatchProps {
  genreList: Media.IGenre[];
}

const Network: React.FC<WatchProps> = ({ genreList }) => {
  const { query } = useRouter();

  const slug = query.slugs;

  const genre =
    (genreList &&
      genreList.find((genre) => slug?.includes(genre.name.toLowerCase().replaceAll(" ", "-")))) ??
    DEFAULT_WATCH_GENRE;

  const network =
    watchSeriesNetworkList.find(({ provider_name }) =>
      slug?.includes(provider_name.toLowerCase().replaceAll(" ", "-"))
    ) ?? DEFAULT_WATCH_NETWORK;

  const { data, isLoading, isError, fetchCards } = useGenerator(
    `/api/random/tv/${network.provider_id}/`,
    randomNumber(randomPageNumberSeries),
    "tv"
  );

  return (
    <>
      <Head>
        <title>ReelHub | What to watch tonight?</title>
        <meta
          name="description"
          content="Reelbuddy allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other providers in one place, whilst providing recommendations on what to watch tonight."
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <Heading as="h1" size="m">
            What to watch tonight?
          </Heading>
          <Content>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Content>
          <DropdownsContainer>
            <Dropdown
              watch
              type="series"
              selected_genre={genre}
              genre_list={genreList}
              variant="genre"
              selected_network={network}
            />
            <Dropdown watch type="series" media="series" variant="media" />
            <span>On</span>
            <Dropdown
              watch
              type="series"
              selected_network={network}
              network_list={watchSeriesNetworkList}
              selected_genre={genre}
              variant="service"
            />
          </DropdownsContainer>
          <Panel>
            <div>
              <Heading as="h2" size="m">
                Suggest a show
              </Heading>
              <Content>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt tempore odio error
                esse quae laborum, doloribus praesentium rerum harum nam adipisci
              </Content>

              <Button variant="primary" isFull onClick={fetchCards} disabled={isLoading}>
                {data ? "SPIN AGAIN" : "SPIN"}
              </Button>
            </div>

            <MediaGenerator data={data} isLoading={isLoading} isError={isError} type="tv" />
          </Panel>
        </div>
      </main>
    </>
  );
};

export default Network;

export async function getStaticPaths() {
  const paths = watchSeriesNetworkList.map((slug) => ({
    params: { slugs: [slug.provider_name] },
  }));

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/tv/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList: [DEFAULT_WATCH_GENRE, ...genreList.genres],
    },
  };
};
