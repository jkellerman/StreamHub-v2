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

const Genre: React.FC<GeneratorProps> = ({ genreList }) => {
  const { query } = useRouter();
  const slug = query.slugs;

  const [storedSeriesData, setStoredSeriesData] = useState<Results | null>(null);

  const { providers, region } = useRegion();

  const selectedGenre =
    (genreList &&
      genreList.find((genre) => slug?.includes(genre.name.toLowerCase().replaceAll(" ", "-")))) ??
    DEFAULT_GENRE;

  const selectedNetwork =
    providers?.find(({ provider_name }) =>
      slug?.includes(provider_name.replace(" Plus", "+").toLowerCase().replaceAll(" ", "-"))
    ) ?? DEFAULT_GENERATOR_NETWORK;

  const isNetworkSelected = slug?.includes(
    selectedNetwork.provider_name.replace(" Plus", "+").toLowerCase().replaceAll(" ", "-")
  );

  const networkList = providers && [DEFAULT_GENERATOR_NETWORK, ...providers];

  const providerIds =
    providers &&
    providers.map((item) => {
      return item.provider_id;
    });
  const countryNetworkList = providerIds.toString().split(",").join("|");

  const { data, isLoading, isError, noResults, fetchRecommendation } = useGenerator(
    `/api/network/tv/${region}/${
      isNetworkSelected ? selectedNetwork.provider_id : `${countryNetworkList}`
    }/${selectedGenre.id}`,
    "tv"
  );

  useEffect(() => {
    const storedData = sessionStorage.getItem("storedSeriesGenreData");
    if (storedData) {
      setStoredSeriesData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("storedSeriesGenreData", JSON.stringify(data));
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

export default Genre;

export async function getStaticPaths() {
  try {
    const genreList = await fetcher<Genres>(
      `${BASE_TMDB_URL}/genre/tv/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
    );

    const paths = genreList.genres.map((slug) => ({
      params: { slugs: [slug.name] },
    }));
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    throw error;
  }
}

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
