import React from "react";
import Head from "next/head";
import qs from "qs";

import { GetServerSideProps } from "next";
import { BASE_TMDB_QUERY_SEARCH_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import { Media, Genres } from "@/src/types";

import styles from "@/components/organisms/Hero/Hero.module.css";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import Hero from "@/components/organisms/Hero/Hero";
import HeroContent from "@/components/molecules/HeroContent/HeroContent";
import MediaDetails from "@/components/molecules/MediaDetails/MediaDetails";
import MediaSummary from "@/components/molecules/MediaSummary/MediaSummary";
import MediaDirectorOrNetwork from "@/components/atoms/MediaDirectorOrNetwork/MediaDirectorOrNetwork";
import Cast from "@/components/atoms/Cast/Cast";
import MediaGenres from "@/components/atoms/MediaGenres/MediaGenres";
import MediaRunTimeOrSeasons from "@/components/atoms/MediaRunTimeOrSeasons/MediaRunTimeOrSeasons";
import StarRating from "@/components/atoms/StarRating/StarRating";
import WatchProviders from "@/components/molecules/WatchProviders/WatchProviders";
import TabList from "@/components/molecules/TabList/TabList";
import Recommendations from "@/components/molecules/Recommendations/Recommendations";
import Certification from "@/components/atoms/Certification/Certification";
import ReleaseDate from "@/components/atoms/ReleaseDate/ReleaseDate";
import MediaOverview from "@/components/atoms/MediaOverview/MediaOverview";

interface MovieProps {
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
  director: Media.IDirector;
  title: string;
}

const Movie: React.FC<MovieProps> = ({
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

        <Hero backdrop={backdrop} title={title}>
          <HeroContent
            tagline={tagline}
            movie_age_rating={movie_age_rating?.certification}
            release_date={release_date}
            star_rating={vote_average}
            overview={overview}
            poster={poster}
            title={title}
          >
            <Certification movie_age_rating={movie_age_rating?.certification} />
            <ReleaseDate release_date={release_date} styled />
            <StarRating star_rating={vote_average} />
          </HeroContent>
        </Hero>

        <WatchProviders watch_providers={watch_providers} />

        <MediaSummary star_rating={vote_average}>
          <Certification movie_age_rating={movie_age_rating?.certification} />
          <ReleaseDate release_date={release_date} styled />
          <MediaOverview overview={overview} mediaSummary />
        </MediaSummary>

        <MediaDetails>
          <MediaDirectorOrNetwork director={director} />
          <Cast cast={cast} />
          <MediaGenres genres={genres} movies />
          <MediaRunTimeOrSeasons runtime={runtime} />
        </MediaDetails>

        <TabList
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
  const { query, res } = context;
  const { id } = query;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1, stale-while-revalidate=86400"
  );

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

  const getDirector: Media.IDirector = credits.crew.find(
    (crew: Media.ICast) => crew.department === "Directing"
  );
  const director = getDirector.name;

  const cast = credits.cast.slice(0, 4);

  const getWatchProviders = data["watch/providers"].results;

  const watch_providers = getWatchProviders.GB || [];

  const certification: Media.ICertificationMoviesCountries | null =
    release_dates.results.find(
      (country: Media.ICertificationMoviesCountries) =>
        country.iso_3166_1 === "GB"
    ) ||
    release_dates.results.find(
      (country: Media.ICertificationMoviesCountries) =>
        country.iso_3166_1 === "US"
    ) ||
    null;

  const age_rating: Media.ICertificationMovie | null =
    certification?.release_dates.find(
      (item: Media.ICertificationMovie) => item.certification !== ""
    ) || null;

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
