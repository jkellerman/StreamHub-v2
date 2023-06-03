import { GetServerSideProps } from "next";
import Head from "next/head";
import qs from "qs";
import React from "react";

import BackgroundImage from "@/components/atoms/BackgroundImage/BackgroundImage";
import CategoryHeading from "@/components/atoms/CategoryHeading/CategoryHeading";
import MediaDetails from "@/components/molecules/MediaDetails/MediaDetails";
import Recommendations from "@/components/molecules/RecommendationsList/RecommendationsList";
import MediaDetailsPanel from "@/components/organisms/MediaDetailsPanel/MediaDetailsPanel";
import MediaInfoBox from "@/components/organisms/MediaInfoBox/MediaInfoBox";
import { BASE_TMDB_QUERY_SEARCH_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import useFetchDetails from "@/hooks/useFetchDetails";
import { Media, Genres } from "@/src/types";

interface MovieProps {
  movie_age_rating: Media.ICertificationMovie | undefined;
  release_date: string;
  overview: string;
  cast: Media.ICastMember[];
  genres: Genres.IGenre[];
  watch_providers: Media.IProviderList;
  runtime: number;
  director: Media.IDirector;
  title: string;
  id: number;
}

const Movie: React.FC<MovieProps> = ({
  movie_age_rating,
  release_date,
  runtime,
  overview,
  genres,
  watch_providers,
  title,
  id,
  cast,
  director,
}) => {
  const endpoint = `/api/details/movie/${id}`;
  const { data, isError, isLoading } = useFetchDetails(endpoint);
  const backdrop = data && data.backdrop_path;
  const recommendations = data && data.recommendations;
  const poster = data && data.poster_path;

  return (
    <>
      <Head>
        <title>{`Watch ${title} Online | ReelBuddy`}</title>
        <meta name="description" content={`Where to watch ${title}`} />
      </Head>

      <main>
        <BackgroundImage title={title} backdrop={backdrop} />
        <MediaDetailsPanel title={title} id={id} type="movie">
          <MediaDetails
            genres={genres}
            movie_age_rating={movie_age_rating?.certification}
            runtime={runtime}
            release_date={release_date}
          />
        </MediaDetailsPanel>
        <MediaInfoBox
          overview={overview}
          poster={poster}
          title={title}
          watch_providers={watch_providers}
          release_date={release_date}
          cast={cast}
          director={director}
        >
          <MediaDetails
            genres={genres}
            movie_age_rating={movie_age_rating?.certification}
            runtime={runtime}
            release_date={release_date}
          />
        </MediaInfoBox>

        {data && data.recommendations.results.length > 0 && (
          <CategoryHeading type="movies" category="People also liked" />
        )}
        {data && data.recommendations.results.length > 0 && (
          <Recommendations
            recommendations={recommendations}
            isLoading={isLoading}
            isError={isError}
          />
        )}
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
      append_to_response: "credits,recommendations,watch/providers,release_dates,videos",
    },
    { addQueryPrefix: true }
  );

  const url = `${BASE_TMDB_URL}/movie/${id}${queryString}`;
  console.info("🚀 Request URL: ", url);

  const response = await fetch(url);
  const data = await response.json();

  const { release_dates, release_date, runtime, overview, credits, genres, title } = data;

  const getDirector: Media.IDirector = credits.crew.find(
    (crew: Media.ICast) => crew.department === "Directing"
  );
  const director = getDirector.name;

  const cast = credits.cast.slice(0, 4);

  const getWatchProviders = data["watch/providers"].results;

  const watch_providers = getWatchProviders.GB || [];

  const certification: Media.ICertificationMoviesCountries | null =
    release_dates.results.find(
      (country: Media.ICertificationMoviesCountries) => country.iso_3166_1 === "GB"
    ) ||
    release_dates.results.find(
      (country: Media.ICertificationMoviesCountries) => country.iso_3166_1 === "US"
    ) ||
    null;

  const age_rating: Media.ICertificationMovie | null =
    certification?.release_dates.find(
      (item: Media.ICertificationMovie) => item.certification !== ""
    ) || null;

  return {
    props: {
      movie_age_rating: age_rating,
      release_date,
      runtime,
      overview,
      director,
      cast,
      genres,
      watch_providers,
      title,
      id,
    },
  };
};
