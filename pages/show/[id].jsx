import Head from "next/head";
import styles from "@/components/organisms/Hero/Hero.module.css";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import Hero from "@/components/organisms/Hero/Hero";
import MediaDetails from "@/components/molecules/MediaDetails/MediaDetails";
import MediaSummary from "@/components/molecules/MediaSummary/MediaSummary";
import Tablist from "@/components/organisms/TabList/TabList";
import WatchProviders from "@/components/molecules/WatchProviders/WatchProviders";
import Suggested from "@/components/molecules/Recommendations/Recommendations";

import qs from "qs";
import { BASE_TMDB_QUERY_SEARCH_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";

const Series = ({
  backdrop,
  tagline,
  series_age_rating,
  air_date,
  vote_average,
  overview,
  poster,
  cast,
  genres,
  watch_providers,
  suggested,
  seasons,
  network,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{`Watch ${title} Online | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${title}`} />
      </Head>
      <main className={styles.main}>
        <SearchBar series hero />
        <Hero
          image={backdrop}
          tagline={tagline}
          series_age_rating={series_age_rating}
          air_date={air_date}
          rating={vote_average}
          overview={overview}
          poster={poster}
          seasons={seasons}
          title={title}
        />
        <WatchProviders watch_providers={watch_providers} />
        <MediaSummary
          overview={overview}
          series_age_rating={series_age_rating}
          air_date={air_date}
          vote_average={vote_average}
        />
        <MediaDetails
          network={network}
          cast={cast}
          genres={genres}
          seasons={seasons}
          series
        />
        <Tablist
          series_age_rating={series_age_rating}
          air_date={air_date}
          seasons={seasons}
          vote_average={vote_average}
          overview={overview}
          poster={poster}
          network={network}
          cast={cast}
          genres={genres}
          watch_providers={watch_providers}
          title={title}
        />
        <Suggested suggested={suggested} series />
      </main>
    </>
  );
};

export default Series;

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;

  const queryString = qs.stringify(
    {
      ...BASE_TMDB_QUERY_SEARCH_PARAMS,
    },
    { addQueryPrefix: true }
  );

  const url = `${BASE_TMDB_URL}/tv/${id}${queryString}&append_to_response=credits,recommendations,watch%2Fproviders,content_ratings`;
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

  const certification =
    content_ratings.results.find((country) => country.iso_3166_1 === "GB") ||
    [];

  const age_rating = certification.rating || [];

  const network = networks.map((item) => {
    return item.name;
  });

  const getCast = credits.cast;
  const cast = getCast.slice(0, 4);

  const getWatchProviders = data["watch/providers"].results;

  const watch_providers = getWatchProviders.GB || [];

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
      suggested: recommendations,
      seasons: number_of_seasons,
      network,
      title,
    },
  };
}
