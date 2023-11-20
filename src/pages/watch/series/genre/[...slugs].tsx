import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";

import Button from "@/components/Buttons/Buttons";
import Content from "@/components/Content/Content";
import Dropdown, {
  DropdownsContainer,
  DropdownsInnerContainer,
} from "@/components/Dropdown/Dropdown";
import Heading from "@/components/Heading/Heading";
import MediaGenerator from "@/components/MediaGenerator/MediaGenerator";
import { Panel, PanelInner } from "@/components/Panel/Panel";
import styles from "@/components/Panel/Panel.module.scss";
import { DEFAULT_GENRE, DEFAULT_WATCH_NETWORK } from "@/constants/app";
import { BASE_TMDB_URL, BASE_TMDB_QUERY_PARAMS, watchSeriesNetworkList } from "@/constants/tmdb";
import useGenerator from "@/hooks/useGenerator";
import { Media } from "@/types/media";

interface WatchProps {
  genreList: Media.IGenre[];
}

const Genre: React.FC<WatchProps> = ({ genreList }) => {
  const { query } = useRouter();

  const slug = query.slugs;

  const genre =
    (genreList &&
      genreList.find((genre) => slug?.includes(genre.name.toLowerCase().replaceAll(" ", "-")))) ??
    DEFAULT_GENRE;

  const network =
    watchSeriesNetworkList.find(({ provider_name }) =>
      slug?.includes(provider_name.toLowerCase().replaceAll(" ", "-"))
    ) ?? DEFAULT_WATCH_NETWORK;

  const isNetworkSelected = slug?.includes(
    network.provider_name.toLowerCase().replaceAll(" ", "-")
  );

  const { data, isLoading, isError, noResults, fetchRecommendation } = useGenerator(
    `/api/network/tv/${isNetworkSelected ? network.provider_id : "8|337|9|531|350"}/${genre.id}`,
    "tv"
  );

  return (
    <>
      <Head>
        <title>StreamHub | What to watch tonight?</title>
        <meta
          name="description"
          content="StreamHub allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other providers in one place, whilst providing recommendations on what to watch tonight."
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <Heading as="h1" size="lg">
            What to watch tonight?
          </Heading>
          <Content>
            Cut through streaming indecision! Use the generator below to simplify choices, so you
            can dive into content faster.
          </Content>
          <DropdownsInnerContainer>
            <Heading as="h2" size="s">
              Select preferences:
            </Heading>
            <DropdownsContainer>
              <Dropdown watch type="series" media="series" variant="media" style="secondary" />
            </DropdownsContainer>

            <DropdownsContainer>
              <Dropdown
                watch
                type="series"
                selected_genre={genre}
                genre_list={genreList}
                variant="genre"
                selected_network={network}
                style="secondary"
              />
            </DropdownsContainer>

            <DropdownsContainer>
              <Dropdown
                watch
                type="series"
                selected_network={network}
                network_list={watchSeriesNetworkList}
                selected_genre={genre}
                variant="service"
                style="secondary"
              />
            </DropdownsContainer>
          </DropdownsInnerContainer>

          <Panel>
            <PanelInner>
              <Heading as="h2" size="s">
                Suggest a series
              </Heading>
              <Content>
                Select your tv series preferences using the options above, have a spin and find the
                perfect show to watch to tonight. Simple!
              </Content>

              <Button variant="primary" isFull onClick={fetchRecommendation} disabled={isLoading}>
                {data ? "SPIN AGAIN" : "SPIN"}
              </Button>
            </PanelInner>

            <MediaGenerator
              data={data}
              isLoading={isLoading}
              isError={isError}
              type="tv"
              noResults={noResults}
            />
          </Panel>
        </div>
      </main>
    </>
  );
};

export default Genre;

export async function getStaticPaths() {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/tv/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
  );
  const genreList = await response.json();

  const paths = genreList.genres.map((slug: Media.IGenre) => ({
    params: { slugs: [slug.name] },
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
      genreList: [DEFAULT_GENRE, ...genreList.genres],
    },
  };
};
