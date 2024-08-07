import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useEffect, useState } from "react";

import Carousel from "@/components/Carousel/Carousel";
import CategoryHeading from "@/components/CategoryHeading/CategoryHeading";
import Generator from "@/components/Generator/Generator";
import Header from "@/components/Header/Header";
import { DEFAULT_GENRE, DEFAULT_GENERATOR_NETWORK } from "@/constants/app";
import { BASE_TMDB_URL, BASE_TMDB_QUERY_PARAMS } from "@/constants/tmdb";
import useGenerator from "@/hooks/useGenerator";
import { useRegion } from "@/src/context/regionContext";
import { Genres, Id, Results } from "@/types/tmdb";
import { fetcher } from "@/utils/tmdbDataHelpers";

interface GeneratorProps {
  genreList: Id[];
}

const GeneratorPage: React.FC<GeneratorProps> = ({ genreList }) => {
  const { query } = useRouter();
  const { providers, region } = useRegion();

  const [storedSeriesData, setStoredSeriesData] = useState<Results | null>(null);

  const selectedGenre =
    (genreList && genreList.find(({ name }) => name.toLowerCase() === query.genre)) ??
    DEFAULT_GENRE;

  const selectedNetwork =
    providers?.find(
      ({ provider_name }) => provider_name.replace(" Plus", "+").toLowerCase() === query.genre
    ) ?? DEFAULT_GENERATOR_NETWORK;

  const networkList = providers && [DEFAULT_GENERATOR_NETWORK, ...providers];

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
        <Generator
          selectedGenre={selectedGenre}
          genreList={genreList}
          selectedNetwork={selectedNetwork}
          networkList={networkList}
          fetchRecommendation={fetchRecommendation}
          isError={isError}
          isLoading={isLoading}
          data={data}
          storedSeriesData={storedSeriesData}
          noResults={noResults}
          mediaType="series"
        />
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

export default GeneratorPage;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const genreList = await fetcher<Genres>(
      `${BASE_TMDB_URL}/genre/tv/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
    );

    return {
      props: {
        genreList: [DEFAULT_GENRE, ...genreList.genres],
      },
    };
  } catch (error) {
    throw error;
  }
};
