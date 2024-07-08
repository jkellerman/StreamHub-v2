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
import { Genres, Id } from "@/types/tmdb";
import { Pagination, fetcher } from "@/utils/tmdbDataHelpers";

interface SeriesIndexPageProps {
  genreList: Id[];
}

const Series: React.FC<SeriesIndexPageProps> = ({ genreList }) => {
  const { query, pathname } = useRouter();
  const { providers } = useRegion();

  const selectedGenre =
    (genreList && genreList.find((item) => item.name.toLowerCase() === query.genre)) ||
    DEFAULT_GENRE;

  const selectedNetwork =
    providers?.find(
      ({ provider_name }) => provider_name.replace(" Plus", "+").toLowerCase() === query.genre
    ) ?? DEFAULT_NETWORK;

  const networkList = providers && [DEFAULT_NETWORK, ...providers];

  const pageType = pathname.replace(/\//g, "");

  const endpoint = `api/trending/tv/week`;

  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    Pagination(endpoint);

  return (
    <>
      <Head>
        <title>What Series to Watch | StreamHub</title>
        <meta
          name="description"
          content="Find out where to watch TV shows from Netflix, Amazon Prime, Disney+ and many more services."
        />
      </Head>
      <Header />
      <main>
        <DropdownsOuterContainer>
          <Heading as="h1" size="s">
            Series:
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
                network_list={networkList}
                variant="service"
                style="primary"
              />
            </DropdownsContainer>
          </DropdownsInnerContainer>
        </DropdownsOuterContainer>

        <Description type="series" />
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

export default Series;

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
