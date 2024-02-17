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
import { useRegion } from "@/context/regionContext";
import { Media } from "@/types/media";

interface HomeProps {
  contentProviders: Media.IProvider[];
}

const Home: React.FC<HomeProps> = (contentProviders) => {
  const { providers } = useRegion();

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
          <ContentProviders contentProviders={contentProviders.contentProviders} />
          <Dropdown regions={primaryRegions} />
          <CategoryHeading category="trending this week" />
          <Carousel endpoint="/api/trending/all/week" />
        </section>
        <section>
          <CategoryHeading category="popular films on prime video" />
          <Carousel endpoint="/api/network/movie/US/9" />
        </section>
        <section>
          <CategoryHeading category="popular series on netflix" />
          <Carousel endpoint="/api/network/tv/US/8" />
        </section>
        <section>
          <CategoryHeading
            category="popular movies"
            subheading="The most popular on all streaming services."
          />
          <Carousel endpoint={`/api/network/movie/US/${countryNetworkList}`} />
        </section>
        <section>
          <CategoryHeading
            category="popular series"
            subheading="The most popular on all streaming services."
          />
          <Carousel endpoint={`/api/trending/tv/week`} />
        </section>

        <section>
          <CategoryHeading category="best films from the past year" />
          <Carousel endpoint="/api/year/pastYear/movie/2500" />
        </section>

        <section>
          <CategoryHeading category="upcoming movies" />
          <Carousel endpoint={`/api/media/movie/upcoming/US`} />
        </section>

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
  )}&watch_region=US`;

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
  // HBO Max has moved to Max and now doesn't show any data.
  const removeHBOMax = removeDuplicateProviders.filter(
    (item: Media.IProvider) => item.provider_id !== 384
  );

  return {
    props: {
      contentProviders: removeHBOMax,
    },
  };
};
