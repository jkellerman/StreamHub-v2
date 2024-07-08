import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
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
  BASE_TMDB_QUERY_DISCOVER_PARAMS,
  BASE_TMDB_QUERY_SEARCH_PARAMS,
  BASE_TMDB_URL,
} from "@/constants/tmdb";
import {
  Certification,
  CountryProviders,
  Id,
  Details,
  MediaId,
  Regions,
  Region,
} from "@/types/tmdb";
import { FetchDetails, fetcher } from "@/utils/tmdbDataHelpers";

const Recommendations = dynamic(
  () => import("@/components/RecommendationsList/RecommendationsList")
);
const TabList = dynamic(() => import("@/components/TabList/TabList"));

interface MovieProps {
  movie_age_rating: Certification;
  release_date: string;
  overview: string;
  cast: MediaId[];
  genres: Id[];
  watch_providers: CountryProviders;
  runtime: number;
  director: string;
  title: string;
  id: number;
  regions: Region[];
  defaultTab: string;
  backdrop: string;
  poster: string;
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
  poster,
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
        <BackgroundImage title={title} backdrop={backdrop} />
        <MediaDetailsPanel title={title} id={id} type="movie">
          <MediaDetails
            genres={genres}
            movie_age_rating={movie_age_rating.certification}
            runtime={runtime}
            release_date={release_date}
          />
        </MediaDetailsPanel>
        <MediaInfoBox
          overview={overview}
          poster={poster}
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

  const data = await fetcher<Details>(url as string);

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

  const getDirector = credits?.crew.find((crew) => crew.department === "Directing");

  const director = getDirector?.name || null;

  const cast = credits?.cast.slice(0, 4);

  const getWatchProviders = data["watch/providers"]?.results;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

  const certification =
    (slugs && release_dates.results.find((country) => country.iso_3166_1 === `${slugs[1]}`)) ??
    release_dates.results.find((country) => country.iso_3166_1 === "US") ??
    "";

  const age_rating =
    (certification && certification.release_dates.find((item) => item.certification !== "")) || "";

  const regionsQueryString = qs.stringify(
    {
      ...BASE_TMDB_QUERY_DISCOVER_PARAMS,
    },
    { addQueryPrefix: true }
  );

  const regionsUrl = `${BASE_TMDB_URL}/watch/providers/regions${regionsQueryString}`;
  console.info("🚀 Request URL: ", regionsUrl);

  const regionsData = await fetcher<Regions>(regionsUrl);

  const sortedRegions = regionsData.results
    .filter((region) => region.iso_3166_1 !== "XK")
    .sort((a, b) => a.english_name.localeCompare(b.english_name));

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
      poster: poster_path,
    },
  };
};
