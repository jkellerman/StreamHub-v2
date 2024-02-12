import { LazyMotion, domAnimation, m } from "framer-motion";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useEffect, useState } from "react";

import Button from "@/components/Buttons/Buttons";
import Carousel from "@/components/Carousel/Carousel";
import CategoryHeading from "@/components/CategoryHeading/CategoryHeading";
import Content from "@/components/Content/Content";
import Dropdown, {
  DropdownsContainer,
  DropdownsInnerContainer,
} from "@/components/Dropdown/Dropdown";
import Header from "@/components/Header/Header";
import Heading from "@/components/Heading/Heading";
import MediaGenerator from "@/components/MediaGenerator/MediaGenerator";
import { Panel, PanelInner } from "@/components/Panel/Panel";
import styles from "@/components/Panel/Panel.module.scss";
import { DEFAULT_GENRE, DEFAULT_WATCH_NETWORK } from "@/constants/app";
import { BASE_TMDB_URL, BASE_TMDB_QUERY_PARAMS } from "@/constants/tmdb";
import useGenerator from "@/hooks/useGenerator";
import { useRegion } from "@/src/context/regionContext";
import { Media } from "@/types/media";
import { opacity } from "@/utils/animations";

interface WatchProps {
  genreList: Media.IGenre[];
}

const Watch: React.FC<WatchProps> = ({ genreList }) => {
  const { query } = useRouter();
  const { providers, region } = useRegion();

  const [storedSeriesData, setStoredSeriesData] = useState<Media.IMediaItem | null>(null);

  const selectedGenre =
    (genreList && genreList.find(({ name }) => name.toLowerCase() === query.genre)) ??
    DEFAULT_GENRE;

  const selectedNetwork =
    providers?.find(
      ({ provider_name }) => provider_name.replace(" Plus", "+").toLowerCase() === query.genre
    ) ?? DEFAULT_WATCH_NETWORK;

  const networkList = providers && [DEFAULT_WATCH_NETWORK, ...providers];

  const providerIds =
    providers &&
    providers.map((item) => {
      return item.provider_id;
    });
  const countryNetworkList = providerIds.toString().split(",").join("|");

  const { data, isLoading, isError, noResults, fetchRecommendation } = useGenerator(
    `/api/network/tv/${region}/${countryNetworkList}`,
    "tv"
  );

  useEffect(() => {
    const storedData = sessionStorage.getItem("storedSeriesData");
    if (storedData) {
      setStoredSeriesData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("storedSeriesData", JSON.stringify(data));
      setStoredSeriesData(data);
    }
  }, [data]);
  return (
    <>
      <Head>
        <title>StreamHub | What to watch tonight</title>
        <meta
          name="description"
          content="StreamHub allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other providers in one place, whilst providing recommendations on what to watch tonight."
        />
      </Head>
      <Header />
      <main>
        <div className={styles.outerWrapper}>
          <LazyMotion features={domAnimation}>
            <m.div
              className={styles.container}
              variants={opacity}
              initial="hidden"
              animate="visible"
            >
              <Heading as="h1" size="m">
                What to watch tonight
              </Heading>
              <Content>
                Cut through streaming indecision! Use the generator below to simplify choices, so
                you can dive into content faster.
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
                    selected_genre={selectedGenre}
                    genre_list={genreList}
                    variant="genre"
                    style="secondary"
                  />
                </DropdownsContainer>

                <DropdownsContainer>
                  <Dropdown
                    watch
                    type="series"
                    selected_network={selectedNetwork}
                    network_list={networkList as Media.IProvider[]}
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
                    Select your tv series preferences using the options above, have a spin and find
                    the perfect show to watch to tonight.
                  </Content>

                  <Button
                    variant="primary"
                    isFull
                    onClick={fetchRecommendation}
                    disabled={isLoading}
                  >
                    {data ? "SPIN AGAIN" : "SPIN"}
                  </Button>
                </PanelInner>

                <MediaGenerator
                  data={storedSeriesData}
                  isLoading={isLoading}
                  isError={isError}
                  type="tv"
                  noResults={noResults}
                />
              </Panel>
            </m.div>
          </LazyMotion>
          <div className={styles.overlay}></div>
        </div>
        <CategoryHeading
          category="popular series"
          subheading="The most popular on all streaming services."
        />
        <Carousel endpoint={`/api/trending/tv/week`} />
        <CategoryHeading
          category="popular movies"
          subheading="The most popular on all streaming services."
        />
        <Carousel endpoint={`/api/network/movie/${region}/${countryNetworkList}`} />
      </main>
    </>
  );
};

export default Watch;

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
