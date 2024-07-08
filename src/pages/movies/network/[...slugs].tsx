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

interface GenreMoviesProps {
  genreList: Id[];
}

const NetworkMovies: React.FC<GenreMoviesProps> = ({ genreList }) => {
  const { query } = useRouter();
  const { providers, region } = useRegion();

  const slug = query.slugs;

  const selectedGenre =
    (genreList &&
      genreList.find((genre) => slug?.includes(genre.name.toLowerCase().replaceAll(" ", "-")))) ??
    DEFAULT_GENRE;

  const selectedNetwork =
    providers.find(({ provider_name }) =>
      slug?.includes(provider_name.replace(" Plus", "+").toLowerCase().replaceAll(" ", "-"))
    ) ?? DEFAULT_NETWORK;

  const networkList = providers && [DEFAULT_NETWORK, ...providers];

  const endpoint = `/api/network/movie/${region}/${selectedNetwork.provider_id}`;

  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    Pagination(endpoint);

  return (
    <>
      <Head>
        <title>{`What's on ${selectedNetwork.provider_name} | StreamHub`}</title>
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
                type="movies"
                selected_genre={selectedGenre}
                genre_list={genreList}
                variant="genre"
                selected_network={selectedNetwork}
                style="primary"
              />
            </DropdownsContainer>
            <DropdownsContainer>
              {networkList && (
                <Dropdown
                  type="movies"
                  selected_network={selectedNetwork}
                  network_list={networkList}
                  selected_genre={selectedGenre}
                  variant="service"
                  style="primary"
                />
              )}
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

export default NetworkMovies;

export async function getStaticPaths() {
  try {
    const genreList = await fetcher<Genres>(
      `${BASE_TMDB_URL}/genre/movie/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
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
      `${BASE_TMDB_URL}/genre/movie/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
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
