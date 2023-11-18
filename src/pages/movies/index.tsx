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
import Heading from "@/components/Heading/Heading";
import Description from "@/components/MediaPageDescription/MediaPageDescription";
import { DEFAULT_GENRE, DEFAULT_NETWORK } from "@/constants/app";
import { movieNetworkList, BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Media } from "@/types/media";

interface MoviesIndexPageProps {
  genreList: Media.IGenre[];
}

const Movies: React.FC<MoviesIndexPageProps> = ({ genreList }) => {
  const { query, pathname } = useRouter();

  const genre =
    (genreList &&
      genreList.find((genreItem) => genreItem && genreItem.name.toLowerCase() === query.genre)) ??
    DEFAULT_GENRE;

  const network =
    movieNetworkList.find(({ provider_name }) => provider_name.toLowerCase() === query.genre) ||
    DEFAULT_NETWORK;

  const pageType = pathname.replace(/\//g, "");

  const endpoint = `api/network/movie/8|337|9|531|350`;

  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteScroll(endpoint);

  return (
    <>
      <Head>
        <title>{`Watch ${genre.name} Movies Online | ReelHub`}</title>
        <meta
          name="description"
          content="Find out where to watch movies from Netflix, Amazon Prime, Disney+ and many more services"
        />
      </Head>
      <main>
        <DropdownsOuterContainer>
          <Heading as="h1" size="s">
            Movies:
          </Heading>
          <DropdownsInnerContainer>
            <DropdownsContainer>
              <Dropdown
                type={pageType}
                selected_genre={genre}
                genre_list={genreList}
                variant="genre"
                style="primary"
              />
            </DropdownsContainer>
            <DropdownsContainer>
              <Dropdown
                type={pageType}
                selected_network={network}
                network_list={movieNetworkList}
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
