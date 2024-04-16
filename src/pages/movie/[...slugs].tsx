import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { getPlaiceholder } from "plaiceholder";
import qs from "qs";
import React from "react";

import BackgroundImage from "@/components/BackgroundImage/BackgroundImage";
import CategoryHeading from "@/components/CategoryHeading/CategoryHeading";
import { RegionDialog } from "@/components/Dialog/Dialog";
import Header from "@/components/Header/Header";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import MediaDetailsPanel from "@/components/MediaDetailsPanel/MediaDetailsPanel";
import MediaInfoBox from "@/components/MediaInfoBox/MediaInfoBox";
import {
  BACKGROUND_URL_IMAGE_XL,
  BASE_TMDB_QUERY_DISCOVER_PARAMS,
  BASE_TMDB_QUERY_SEARCH_PARAMS,
  BASE_TMDB_URL,
  POSTER_URL_IMAGE,
} from "@/constants/tmdb";
import { Media, Types } from "@/src/types";
import { FetchDetails } from "@/utils/tmdbDataHelpers";

const Recommendations = dynamic(
  () => import("@/components/RecommendationsList/RecommendationsList")
);
const TabList = dynamic(() => import("@/components/TabList/TabList"));

interface MovieProps {
  movie_age_rating: Media.ICertificationMovie | undefined;
  release_date: string;
  overview: string;
  cast: Media.ICastMember[];
  genres: Media.IGenre[];
  watch_providers: Media.IProviderList;
  runtime: number;
  director: Media.IDirector;
  title: string;
  id: number;
  regions: Types.IRegions[];
  defaultTab: string;
  backdrop: string;
  backdropPlaceholder: string;
  poster: string;
  posterPlaceholder: string;
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
  regions,
  defaultTab,
  backdrop,
  backdropPlaceholder,
  poster,
  posterPlaceholder,
}) => {
  const endpoint = `/api/details/movie/${id}`;
  const { data, isError, isLoading } = FetchDetails(endpoint);
  const recommendations = data && data.recommendations;
  return (
    <>
      <Head>
        <title>{`Watch ${title} | StreamHub`}</title>
        <meta name="description" content={`Where to watch ${title}`} />
      </Head>
      <Header animate />

      <main>
        <BackgroundImage title={title} backdrop={backdrop} placeholder={backdropPlaceholder} />
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
          posterPlaceholder={posterPlaceholder}
          title={title}
          cast={cast}
          director={director}
        >
          <TabList
            watch_providers={watch_providers}
            title={title}
            release_date={release_date}
            regions={regions}
            defaultTab={defaultTab}
          >
            <RegionDialog regions={regions} id={id} title={title} type="movie" />
          </TabList>
        </MediaInfoBox>
        {data &&
          data.recommendations &&
          data.recommendations.results &&
          data.recommendations.results.length > 0 && (
            <CategoryHeading category="Suggested" recommendations />
          )}
        {data &&
          data.recommendations &&
          data.recommendations.results &&
          data.recommendations.results.length > 0 && (
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
  const { slugs } = query;

  const queryString = qs.stringify(
    {
      ...BASE_TMDB_QUERY_SEARCH_PARAMS,
      append_to_response: "credits,recommendations,watch/providers,release_dates,videos",
    },
    { addQueryPrefix: true }
  );

  const url = slugs && `${BASE_TMDB_URL}/movie/${slugs[0]}${queryString}`;
  console.info("🚀 Request URL: ", url);

  const response = await fetch(url as string);
  const data = await response.json();

  const {
    release_dates,
    release_date,
    runtime,
    overview,
    credits,
    genres,
    title,
    backdrop_path,
    poster_path,
  } = data;

  const getDirector: Media.IDirector | undefined = credits?.crew.find(
    (crew: Media.ICast) => crew.department === "Directing"
  );

  const director = getDirector?.name || null;

  const cast = credits?.cast.slice(0, 4);

  const getWatchProviders = data["watch/providers"]?.results;

  const watch_providers = slugs && slugs[1] ? getWatchProviders[slugs[1]] : null;

  let defaultTab;

  if (watch_providers && watch_providers.free) {
    defaultTab = "tab4";
  } else if (watch_providers && watch_providers.flatrate) {
    defaultTab = "tab1";
  } else if (watch_providers && watch_providers.rent) {
    defaultTab = "tab2";
  } else if (watch_providers && watch_providers.buy) {
    defaultTab = "tab3";
  } else {
    defaultTab = "tab1";
  }

  const certification: Media.ICertificationMoviesCountries | null =
    (slugs &&
      release_dates.results.find(
        (country: Media.ICertificationMoviesCountries) => country.iso_3166_1 === `${slugs[1]}`
      )) ??
    release_dates.results.find(
      (country: Media.ICertificationMoviesCountries) => country.iso_3166_1 === "US"
    ) ??
    null;

  const age_rating: Media.ICertificationMovie | null =
    certification?.release_dates.find(
      (item: Media.ICertificationMovie) => item.certification !== ""
    ) || null;

  const regionsQueryString = qs.stringify(
    {
      ...BASE_TMDB_QUERY_DISCOVER_PARAMS,
    },
    { addQueryPrefix: true }
  );

  const regionsUrl = `${BASE_TMDB_URL}/watch/providers/regions${regionsQueryString}`;
  console.info("🚀 Request URL: ", regionsUrl);

  const regionsResp = await fetch(regionsUrl);
  const regionsData = await regionsResp.json();

  const sortedRegions = regionsData.results
    .filter((region: Types.IRegions) => region.iso_3166_1 !== "XK")
    .sort((a: Types.IRegions, b: Types.IRegions) => a.english_name.localeCompare(b.english_name));

  const backdropSrc = `${BACKGROUND_URL_IMAGE_XL}${backdrop_path}`;

  const backdropBuffer = await fetch(backdropSrc).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64: backdropBase64 } = await getPlaiceholder(backdropBuffer);

  const posterSrc = `${POSTER_URL_IMAGE}${poster_path}`;

  const posterBuffer = await fetch(posterSrc).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64: posterBase64 } = await getPlaiceholder(posterBuffer);

  return {
    props: {
      movie_age_rating: age_rating,
      release_date,
      runtime,
      overview,
      director,
      cast,
      genres,
      watch_providers: watch_providers || null,
      defaultTab,
      title,
      id: slugs ? slugs[0] : null,
      regions: sortedRegions,
      backdrop: backdrop_path,
      backdropPlaceholder: backdropBase64,
      poster: poster_path,
      posterPlaceholder: posterBase64,
    },
  };
};
