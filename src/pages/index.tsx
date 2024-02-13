import { GetStaticProps } from "next";
import Head from "next/head";
import QueryString from "qs";
import React from "react";

import CTA from "@/components/CallToActionSection/CallToActionSection";
import Carousel from "@/components/Carousel/Carousel";
import CategoryHeading from "@/components/CategoryHeading/CategoryHeading";
import ContentProviders from "@/components/ContentProviders/ContentProviders";
import Dropdown from "@/components/Dropdown/Country/Dropdown";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import { excludedStrings, primaryRegions } from "@/constants/app";
import { BASE_TMDB_URL, BASE_TMDB_QUERY_DISCOVER_PARAMS } from "@/constants/tmdb";

import { useRegion } from "../context/regionContext";
import { Media } from "../types";

interface HomeProps {
  contentProviders: Media.IProvider[];
}

const Home: React.FC<HomeProps> = ({ contentProviders }) => {
  const { region, providers } = useRegion();

  const countryTopProviders = providers.length > 0 && providers.slice(0, 2);

  const providerIds =
    providers &&
    providers.map((item) => {
      return item.provider_id;
    });
  const countryNetworkList = providerIds.toString().split(",").join("|");

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
        <Hero />
        <section>
          <ContentProviders contentProviders={contentProviders} />
          <Dropdown regions={primaryRegions} />
          <CategoryHeading category="trending this week" />
          <Carousel endpoint="/api/trending/all/week" />
        </section>
        {countryTopProviders && (
          <section>
            <CategoryHeading
              category={`popular series on ${countryTopProviders[0].provider_name.replace(
                " Plus",
                "+"
              )}`}
            />
            <Carousel
              endpoint={`/api/network/tv/${region}/${countryTopProviders[0].provider_id}`}
            />
          </section>
        )}
        {countryTopProviders && (
          <section>
            <CategoryHeading
              category={`popular films on ${countryTopProviders[1].provider_name.replace(
                " Plus",
                "+"
              )}`}
            />
            <Carousel
              endpoint={`/api/network/movie/${region}/${countryTopProviders[1].provider_id}`}
            />
          </section>
        )}
        <section>
          <CategoryHeading
            category="popular series"
            subheading="The most popular on all streaming services."
          />
          <Carousel endpoint={`/api/trending/tv/week`} />
        </section>
        {region && countryNetworkList && (
          <section>
            <CategoryHeading
              category="popular movies"
              subheading="The most popular on all streaming services."
            />
            <Carousel endpoint={`/api/network/movie/${region}/${countryNetworkList}`} />
          </section>
        )}

        <section>
          <CategoryHeading category="top films of the past year" />
          <Carousel endpoint="/api/year/pastYear/movie/2500" />
        </section>

        {region && countryNetworkList && (
          <section>
            <CategoryHeading category="upcoming movies" />
            <Carousel endpoint={`/api/media/movie/upcoming/${region}`} />
          </section>
        )}

        <section>
          <CTA />
        </section>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const url = `${BASE_TMDB_URL}/watch/providers/tv?${QueryString.stringify(
    BASE_TMDB_QUERY_DISCOVER_PARAMS
  )}&watch_region=GB`;

  const response = await fetch(url);

  const data = await response.json();

  const slicedArr = data?.results.slice(0, 17);
  const providers = slicedArr.map(({ provider_id, provider_name, logo_path }: Media.IProvider) => {
    return { provider_id, provider_name, logo_path };
  });

  const removeDuplicateProviders = providers?.filter(
    (provider: Media.IProvider) =>
      !excludedStrings.some((excludedStrings) => provider.provider_name.includes(excludedStrings))
  );

  return {
    props: {
      contentProviders: removeDuplicateProviders,
    },
  };
};
