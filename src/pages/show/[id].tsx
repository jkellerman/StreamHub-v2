import { GetServerSideProps } from "next";
import Head from "next/head";
import qs from "qs";
import React from "react";

import BackgroundImage from "@/components/BackgroundImage/BackgroundImage";
import CategoryHeading from "@/components/CategoryHeading/CategoryHeading";
import MediaDetails from "@/components/MediaDetails/MediaDetails";
import MediaDetailsPanel from "@/components/MediaDetailsPanel/MediaDetailsPanel";
import MediaInfoBox from "@/components/MediaInfoBox/MediaInfoBox";
import Recommendations from "@/components/RecommendationsList/RecommendationsList";
import { BASE_TMDB_QUERY_SEARCH_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import { Media } from "@/src/types";
import { FetchDetails } from "@/utils/tmdbDataHelpers";

interface SeriesProps {
  series_age_rating: string;
  air_date: string;
  overview: string;
  cast: Media.ICastMember[];
  genres: Media.IGenre[];
  watch_providers: Media.IProviderList;
  seasons: number;
  network: string[];
  title: string;
  id: number;
}

const Series: React.FC<SeriesProps> = ({
  series_age_rating,
  air_date,
  overview,
  cast,
  genres,
  watch_providers,
  seasons,
  network,
  title,
  id,
}) => {
  const endpoint = `/api/details/tv/${id}`;
  const { data, isError, isLoading } = FetchDetails(endpoint);
  const backdrop = data && data.backdrop_path;
  const recommendations = data && data.recommendations;
  const poster = data && data.poster_path;
  return (
    <>
      <Head>
        <title>{`Where to watch ${title} Online | StreamHub`}</title>
        <meta name="description" content={`Where to watch ${title}`} />
      </Head>

      <main>
        <BackgroundImage title={title} backdrop={backdrop} />
        <MediaDetailsPanel title={title} id={id} type="tv">
          <MediaDetails
            genres={genres}
            series_age_rating={series_age_rating}
            air_date={air_date}
            seasons={seasons}
          />
        </MediaDetailsPanel>
        <MediaInfoBox
          overview={overview}
          poster={poster}
          title={title}
          watch_providers={watch_providers}
          air_date={air_date}
          cast={cast}
          network={network}
        />

        {data && data.recommendations.results.length > 0 && (
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

export default Series;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { id } = query;

  const queryString = qs.stringify(
    {
      ...BASE_TMDB_QUERY_SEARCH_PARAMS,
      append_to_response: "credits,recommendations,watch/providers,content_ratings,videos",
    },
    { addQueryPrefix: true }
  );

  const url = `${BASE_TMDB_URL}/tv/${id}${queryString}`;
  console.info("🚀 Request URL: ", url);

  const response = await fetch(url);

  const data = await response.json();

  const {
    content_ratings,
    first_air_date,
    overview,
    credits,
    genres,
    number_of_seasons,
    networks,
    name: title,
  } = data;

  const certification: Media.ICertificationSeries | null =
    content_ratings.results.find(
      (country: Media.ICertificationSeries) => country.iso_3166_1 === "GB"
    ) || null;

  const age_rating: string = certification?.rating ?? "";

  const network: string = networks.map((item: Media.INetwork) => {
    return item.name;
  });

  const cast: Media.ICast = credits.cast.slice(0, 4);

  const getWatchProviders: Media.IProviderList | null = data["watch/providers"].results.GB;

  const watch_providers = getWatchProviders ?? [];

  return {
    props: {
      series_age_rating: age_rating,
      air_date: first_air_date,
      overview,
      cast,
      genres,
      watch_providers,
      seasons: number_of_seasons,
      network,
      title,
      data,
      id,
    },
  };
};
