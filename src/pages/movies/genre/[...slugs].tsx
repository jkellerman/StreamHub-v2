import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";

import CardList from "@/components/CardList/CardList";
import Dropdown, {
  DropdownsContainer,
  DropdownsOuterContainer,
} from "@/components/Dropdown/Dropdown";
import styles from "@/components/Dropdown/Dropdown.module.scss";
import Description from "@/components/MediaPageDescription/MediaPageDescription";
import { DEFAULT_GENRE, DEFAULT_NETWORK } from "@/constants/app";
import { BASE_TMDB_URL, BASE_TMDB_QUERY_PARAMS, movieNetworkList } from "@/constants/tmdb";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Media } from "@/types/media";

interface GenreMoviesProps {
  genreList: Media.IGenre[];
}

const GenreMovies: React.FC<GenreMoviesProps> = ({ genreList }) => {
  const { query } = useRouter();

  const slug = query.slugs;

  const genre =
    (genreList &&
      genreList.find((genre) => slug?.includes(genre.name.toLowerCase().replaceAll(" ", "-")))) ??
    DEFAULT_GENRE;

  const network =
    movieNetworkList.find(({ provider_name }) =>
      slug?.includes(provider_name.toLowerCase().replaceAll(" ", "-"))
    ) ?? DEFAULT_NETWORK;

  const isNetworkSelected = slug?.includes(
    network.provider_name.toLowerCase().replaceAll(" ", "-")
  );

  const endpoint = isNetworkSelected
    ? `/api/network/movie/${network.provider_id}/${genre.id}`
    : `/api/network/movie/8|337|9|531|350/${genre.id}`;

  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteScroll(endpoint);

  return (
    <>
      <Head>
        <title>{`Watch ${genre?.name} Movies Online | ReelHub`}</title>
        <meta
          name="description"
          content="Find out where to watch movies from Netflix, Amazon Prime, Disney+ and many more services"
        />
      </Head>
      <main>
        <DropdownsOuterContainer>
          <DropdownsContainer>
            <Dropdown
              type="movies"
              selected_genre={genre}
              genre_list={genreList}
              variant="genre"
              selected_network={network}
            />
            <Dropdown type="movies" media="movies" variant="media" />
            <span className={styles.span}>On</span>
            <Dropdown
              type="movies"
              selected_network={network}
              network_list={movieNetworkList}
              selected_genre={genre}
              variant="service"
            />
          </DropdownsContainer>
        </DropdownsOuterContainer>

        <Description type="movie" />
        <CardList
          cards={cards}
          isLoading={isLoading}
          isError={isError}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      </main>
    </>
  );
};

export default GenreMovies;

export async function getStaticPaths() {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/movie/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
  );
  const genreList = await response.json();

  const paths = genreList.genres.map((slug: Media.IGenre) => ({
    params: { slugs: [slug.name] },
  }));
  return {
    paths,
    fallback: true,
  };
}

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
