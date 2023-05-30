import { GetServerSideProps } from "next";
import Head from "next/head";
import qs from "qs";
import React from "react";

import BackgroundImage from "@/components/atoms/BackgroundImage/BackgroundImage";
import MediaDetails from "@/components/molecules/MediaDetails/MediaDetails";
import MediaDetailsPanel from "@/components/organisms/MediaDetailsPanel/MediaDetailsPanel";
import MediaInfoBox from "@/components/organisms/MediaInfoBox/MediaInfoBox";
import { BASE_TMDB_QUERY_SEARCH_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import { Genres, Media } from "@/src/types";

interface SeriesProps {
  backdrop: string;
  tagline: string;
  series_age_rating: string;
  air_date: string;
  vote_average: number;
  overview: string;
  poster: string;
  cast: Media.ICastMember[];
  genres: Genres.IGenre[];
  watch_providers: Media.IProviderList;
  recommendations: Media.IRecommendationsList;
  seasons: number;
  network: string[];
  title: string;
  id: number;
}

const Series: React.FC<SeriesProps> = ({
  series_age_rating,
  air_date,
  // vote_average,
  overview,
  poster,
  // cast,
  genres,
  watch_providers,
  // recommendations,
  seasons,
  // network,
  title,
  id,
}) => {
  return (
    <>
      <Head>
        <title>{`Watch ${title} Online | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${title}`} />
      </Head>

      <main>
        <BackgroundImage title={title} endpoint={`/api/details/tv/${id}`} />
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
        >
          <MediaDetails
            genres={genres}
            series_age_rating={series_age_rating}
            air_date={air_date}
            seasons={seasons}
          />
        </MediaInfoBox>
      </main>
    </>
  );
};

export default Series;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, res } = context;
  const { id } = query;

  res.setHeader("Cache-Control", "public, s-maxage=1, stale-while-revalidate=86400");

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
    backdrop_path,
    tagline,
    content_ratings,
    first_air_date,
    vote_average,
    overview,
    poster_path,
    credits,
    genres,
    recommendations,
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
      backdrop: backdrop_path,
      tagline,
      series_age_rating: age_rating,
      air_date: first_air_date,
      vote_average,
      overview,
      poster: poster_path,
      cast,
      genres,
      watch_providers,
      recommendations,
      seasons: number_of_seasons,
      network,
      title,
      data,
      id,
    },
  };
};
