import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";

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
import { BASE_TMDB_URL, BASE_TMDB_QUERY_PARAMS } from "@/constants/tmdb";
import { useRegion } from "@/src/context/regionContext";
import { Genres, Id } from "@/types/tmdb";
import { Pagination, fetcher } from "@/utils/tmdbDataHelpers";

interface GenreSeriesProps {
  genreList: Id[];
}

const GenreSeries: React.FC<GenreSeriesProps> = ({ genreList }) => {
  const { query } = useRouter();
  const slug = query.slugs;

  const { providers, region } = useRegion();

  const selectedGenre =
    (genreList &&
      genreList.find((genre) => slug?.includes(genre.name.toLowerCase().replaceAll(" ", "-")))) ??
    DEFAULT_GENRE;

  const selectedNetwork =
    providers?.find(({ provider_name }) =>
      slug?.includes(provider_name.replace(" Plus", "+").toLowerCase().replaceAll(" ", "-"))
    ) ?? DEFAULT_NETWORK;

  const isNetworkSelected = slug?.includes(
    selectedNetwork.provider_name.replace(" Plus", "+").toLowerCase().replaceAll(" ", "-")
  );

  const networkList = providers && [DEFAULT_NETWORK, ...providers];

  const providerIds =
    providers &&
    providers.map((item) => {
      return item.provider_id;
    });
  const countryNetworkList = providerIds.toString().split(",").join("|");

  const endpoint = isNetworkSelected
    ? `/api/network/tv/${region}/${selectedNetwork.provider_id}/${selectedGenre.id}`
    : `/api/network/tv/${region}/${countryNetworkList}/${selectedGenre.id}`;

  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    Pagination(endpoint);

  return (
    <>
      <Head>
        <title>{`Watch ${selectedGenre?.name} Series | StreamHub`}</title>
        <meta
          name="description"
          content="Find out where to watch series from Netflix, Amazon Prime, Disney+ and many more services"
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
                type="series"
                selected_genre={selectedGenre}
                genre_list={genreList}
                variant="genre"
                selected_network={selectedNetwork}
                style="primary"
              />
            </DropdownsContainer>
            <DropdownsContainer>
              <Dropdown
                type="series"
                selected_network={selectedNetwork}
                network_list={networkList}
                selected_genre={selectedGenre}
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

export default GenreSeries;

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
