import Head from "next/head";
import React from "react";

import CTA from "@/components/CallToActionSection/CallToActionSection";
import Carousel from "@/components/Carousel/Carousel";
import CategoryHeading from "@/components/CategoryHeading/CategoryHeading";
import ContentProviders from "@/components/ContentProviders/ContentProviders";
import Dropdown from "@/components/Dropdown/Country/Dropdown";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import { primaryRegions } from "@/constants/app";

import { useRegion } from "../context/regionContext";
import { Types } from "../types";

interface HomeProps {
  regions: Types.IRegions[];
}

const Home: React.FC<HomeProps> = () => {
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
          <ContentProviders />
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
        <section>
          <CategoryHeading
            category="popular movies"
            subheading="The most popular on all streaming services."
          />
          <Carousel endpoint={`/api/network/movie/${region}/${countryNetworkList}`} />
        </section>

        {/* TODO: add back in for 2024 */}
        {/* <section>
          <CategoryHeading category={`best films of ${year}`} />
          <Carousel endpoint={`/api/year/current/movie/${year}`} />
        </section> */}

        <section>
          <CategoryHeading category="top films of the past year" />
          <Carousel endpoint="/api/year/pastYear/movie/2500" />
        </section>

        <section>
          <CategoryHeading category="upcoming movies" />
          <Carousel endpoint={`/api/media/movie/upcoming/${region}`} />
        </section>

        <section>
          <CTA />
        </section>
      </main>
    </>
  );
};

export default Home;

// TODO: move this code to movie and page for region selection.

// export const getStaticProps: GetStaticProps = async () => {
//   // TODO: Move this to movie and show page ssr.
//   const response = await fetch(
//     `${BASE_TMDB_URL}/watch/providers/regions?${QueryString.stringify(
//       BASE_TMDB_QUERY_DISCOVER_PARAMS
//     )}`
//   );
//   const data = await response.json();
//   const filteredArray = data.results.filter(
//     (item: Types.IRegions) =>
//       item.iso_3166_1 !== "GP" && item.iso_3166_1 !== "GF" && item.iso_3166_1 !== "XK"
//   );
//   const sortedArray = filteredArray.sort((a: Types.IRegions, b: Types.IRegions) =>
//     a.english_name.localeCompare(b.english_name)
//   );
//   return {
//     props: {
//       regions: sortedArray,
//     },
//   };
// };
