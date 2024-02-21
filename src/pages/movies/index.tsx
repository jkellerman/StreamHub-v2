import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";

import CTA from "@/components/CallToActionSection/CallToActionSection";
import CardList from "@/components/CardList/CardList";
import Dropdown, {
  DropdownsContainer,
  DropdownsInnerContainer,
  DropdownsOuterContainer,
} from "@/components/Dropdown/Dropdown";
import Header from "@/components/Header/Header";
import Heading from "@/components/Heading/Heading";
import Description from "@/components/MediaPageDescription/MediaPageDescription";
import { DEFAULT_GENRE, DEFAULT_NETWORK } from "@/constants/app";
import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import { useRegion } from "@/src/context/regionContext";
import { Media } from "@/types/media";
import { Pagination } from "@/utils/tmdbDataHelpers";

interface MoviesIndexPageProps {
  genreList: Media.IGenre[];
}

const Movies: React.FC<MoviesIndexPageProps> = ({ genreList }) => {
  const { query, pathname } = useRouter();
  const { providers, region } = useRegion();
  const selectedGenre =
    (genreList &&
      genreList.find((genreItem) => genreItem && genreItem.name.toLowerCase() === query.genre)) ??
    DEFAULT_GENRE;

  const selectedNetwork =
    providers?.find(
      ({ provider_name }) => provider_name.replace(" Plus", "+").toLowerCase() === query.genre
    ) ?? DEFAULT_NETWORK;

  const networkList = providers && [DEFAULT_NETWORK, ...providers];

  const pageType = pathname && pathname.replace(/\//g, "");

  const providerIds =
    providers &&
    providers.map((item) => {
      return item.provider_id;
    });
  const countryNetworkList = providerIds.toString().split(",").join("|");

  const endpoint = `api/network/movie/${region}/${countryNetworkList}`;

  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    Pagination(endpoint);

  return (
    <>
      <Head>
        <title>What to watch | StreamHub</title>
        <meta
          name="description"
          content="Find out where to watch movies from Netflix, Amazon Prime, Disney+ and many more services"
        />
      </Head>
      <Header />
      <main>
        <DropdownsOuterContainer>
          <Heading as="h1" size="s">
            Movies:
          </Heading>
          <DropdownsInnerContainer>
            <DropdownsContainer>
              <Dropdown
                type={pageType}
                selected_genre={selectedGenre}
                genre_list={genreList}
                variant="genre"
                style="primary"
              />
            </DropdownsContainer>
            <DropdownsContainer>
              <Dropdown
                type={pageType}
                selected_network={selectedNetwork}
                network_list={networkList as Media.IProvider[]}
                variant="service"
                style="primary"
              />
            </DropdownsContainer>
          </DropdownsInnerContainer>
        </DropdownsOuterContainer>

        <Description type="movie" />
        <section>
          <CardList
            cards={cards}
            isLoading={isLoading}
            isError={isError}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </section>
        <CTA />
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
      genreList: [DEFAULT_GENRE, ...genreList.genres],
    },
  };
};
