import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "@/components/organisms/Hero/Hero.module.css";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import Hero from "@/components/organisms/Hero/Hero";
import MediaDetails from "@/components/molecules/MediaDetails/MediaDetails";
import MediaSummary from "@/components/molecules/MediaSummary/MediaSummary";
import WatchProviders from "@/components/molecules/WatchProviders/WatchProviders";
import Tablist from "@/components/organisms/TabList/TabList";
import Recommendations from "@/components/molecules/Recommendations/Recommendations";
import qs from "qs";
import { BASE_TMDB_QUERY_SEARCH_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import { Media, Genres } from "types";

interface SeriesProps {
  backdrop: string;
  tagline: string;
  movie_age_rating: Media.ICertificationMovie | undefined;
  release_date: string;
  vote_average: number;
  overview: string;
  poster: string;
  cast: Media.ICastMember[];
  genres: Genres.IGenre[];
  watch_providers: Media.IProviderList;
  recommendations: Media.IRecommendationsList;
  runtime: number;
  director: Media.IDirectorOrNetwork;
  title: string;
}

const Movie: React.FC<SeriesProps> = ({
  backdrop,
  tagline,
  movie_age_rating,
  release_date,
  runtime,
  vote_average,
  overview,
  poster,
  director,
  cast,
  genres,
  watch_providers,
  recommendations,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{`Watch ${title} Online | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${title}`} />
      </Head>
      <main className={styles.main}>
        <SearchBar movies hero />
        <Hero
          image={backdrop}
          tagline={tagline}
          movie_age_rating={movie_age_rating?.certification}
          release_date={release_date}
          star_rating={vote_average}
          overview={overview}
          poster={poster}
          title={title}
        />
        <WatchProviders watch_providers={watch_providers} />
        <MediaSummary
          overview={overview}
          movie_age_rating={movie_age_rating?.certification}
          release_date={release_date}
          star_rating={vote_average}
        />
        <MediaDetails
          director={director}
          cast={cast}
          genres={genres}
          runtime={runtime}
          movies
        />
        <Tablist
          movie_age_rating={movie_age_rating?.certification}
          release_date={release_date}
          runtime={runtime}
          star_rating={vote_average}
          overview={overview}
          poster={poster}
          director={director}
          cast={cast}
          genres={genres}
          watch_providers={watch_providers}
          title={title}
          movies
        />
        <Recommendations recommendations={recommendations} movies />
      </main>
    </>
  );
};

export default Movie;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { id } = query;

  const queryString = qs.stringify(
    {
      ...BASE_TMDB_QUERY_SEARCH_PARAMS,
    },
    { addQueryPrefix: true }
  );

  const url = `${BASE_TMDB_URL}/movie/${id}${queryString}&append_to_response=credits,recommendations,watch%2Fproviders,release_dates`;
  console.info("🚀 Request URL: ", url);

  const response = await fetch(url);
  const data = await response.json();

  const {
    backdrop_path,
    tagline,
    release_dates,
    release_date,
    runtime,
    vote_average,
    overview,
    poster_path,
    credits,
    genres,
    recommendations,
    title,
  } = data;

  const getDirector: Media.IDirectorOrNetwork = credits.crew.find(
    (crew: Media.ICast) => crew.department === "Directing"
  );
  const director = getDirector.name;

  const cast = credits.cast.slice(0, 4);

  const getWatchProviders = data["watch/providers"].results;

  const watch_providers = getWatchProviders.GB || [];

  const certification: Media.ICertificationMoviesCountries | undefined =
    release_dates.results.find(
      (country: Media.ICertificationMoviesCountries) =>
        country.iso_3166_1 === "GB"
    ) ||
    release_dates.results.find(
      (country: Media.ICertificationMoviesCountries) =>
        country.iso_3166_1 === "US"
    ) ||
    null;

  const age_rating: Media.ICertificationMovie | undefined =
    certification?.release_dates.find(
      (item: Media.ICertificationMovie) => item.certification !== ""
    ) || undefined;

  return {
    props: {
      backdrop: backdrop_path,
      tagline,
      movie_age_rating: age_rating,
      release_date,
      runtime,
      vote_average,
      overview,
      poster: poster_path,
      director,
      cast,
      genres,
      watch_providers,
      recommendations,
      title,
    },
  };
};
