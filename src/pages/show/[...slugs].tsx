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
const TabList = dynamic(() => import("@/components/TabList/TabList"));
import {
  BASE_TMDB_QUERY_DISCOVER_PARAMS,
  BASE_TMDB_QUERY_SEARCH_PARAMS,
  BASE_TMDB_URL,
} from "@/constants/tmdb";
import { Media, Types } from "@/src/types";
import { FetchDetails } from "@/utils/tmdbDataHelpers";

const Recommendations = dynamic(
  () => import("@/components/RecommendationsList/RecommendationsList")
);

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
  regions: Types.IRegions[];
  defaultTab: string;
  backdrop: string;
  poster: string;
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
  regions,
  defaultTab,
  backdrop,
  poster,
}) => {
  const endpoint = `/api/details/tv/${id}`;
  const { data, isError, isLoading } = FetchDetails(endpoint);
  const recommendations = data && data.recommendations;

  return (
    <>
      <Head>
        <title>{`Where to watch ${title} Online | StreamHub`}</title>
        <meta name="description" content={`Where to watch ${title}`} />
      </Head>
      <Header animate />
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
          cast={cast}
          network={network}
        >
          <TabList
            watch_providers={watch_providers}
            title={title}
            air_date={air_date}
            regions={regions}
            defaultTab={defaultTab}
          >
            <RegionDialog regions={regions} id={id} title={title} type="show" />
          </TabList>
        </MediaInfoBox>

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
  const { slugs } = query;

  const queryString = qs.stringify(
    {
      ...BASE_TMDB_QUERY_SEARCH_PARAMS,
      append_to_response: "credits,recommendations,watch/providers,content_ratings,videos",
    },
    { addQueryPrefix: true }
  );

  const url = slugs && `${BASE_TMDB_URL}/tv/${slugs[0]}${queryString}`;
  console.info("🚀 Request URL: ", url);

  const response = await fetch(url as string);

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
    backdrop_path,
    poster_path,
  } = data;

  const certification: Media.ICertificationSeries | null =
    (slugs &&
      content_ratings.results.find(
        (country: Media.ICertificationSeries) => country.iso_3166_1 === `${slugs[1]}`
      )) ??
    "GB";

  const age_rating: string = certification?.rating ?? "";

  const network: string = networks.map((item: Media.INetwork) => {
    return item.name;
  });

  const cast: Media.ICast = credits.cast.slice(0, 4);

  const getWatchProviders: Media.IProviderList | null =
    slugs && slugs[1] ? data["watch/providers"].results[slugs[1]] : null;

  let defaultTab;

  if (getWatchProviders && getWatchProviders.free) {
    defaultTab = "tab4";
  } else if (getWatchProviders && getWatchProviders.flatrate) {
    defaultTab = "tab1";
  } else if (getWatchProviders && getWatchProviders.rent) {
    defaultTab = "tab2";
  } else if (getWatchProviders && getWatchProviders.buy) {
    defaultTab = "tab3";
  } else {
    defaultTab = "tab1";
  }

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

  return {
    props: {
      series_age_rating: age_rating,
      air_date: first_air_date,
      overview,
      cast,
      genres,
      watch_providers: getWatchProviders || null,
      defaultTab,
      seasons: number_of_seasons,
      network,
      title,
      data,
      id: slugs ? slugs[0] : null,
      regions: sortedRegions,
      backdrop: backdrop_path,
      poster: poster_path,
    },
  };
};
