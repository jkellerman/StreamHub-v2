import Head from "next/head";
import styles from "@/components/Hero/Hero.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";
import Hero from "@/components/Hero/Hero";
import Details from "@/components/Details/Details";
import Overview from "@/components/Overview/Overview";
import Tablist from "@/components/Tablist/Tablist";
import WatchProviders from "@/components/WatchProviders/WatchProviders";
import Suggested from "@/components/Suggested/Suggested";
import useReadMore from "hooks/useReadMore";

const Series = ({
  name,
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
  const { readMore, handleToggle, closeReadMore } = useReadMore();

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
          name={name}
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
        <Overview
          overview={overview}
          series_age_rating={series_age_rating}
          air_date={air_date}
          vote_average={vote_average}
          readMore={readMore}
          handleToggle={handleToggle}
        />
        <Details
          network={network}
          cast={cast}
          genres={genres}
          seasons={seasons}
          series
        />
        <Tablist
          name={name}
          series_age_rating={series_age_rating}
          release_date={air_date}
          seasons={seasons}
          vote_average={vote_average}
          overview={overview}
          poster={poster}
          network={network}
          cast={cast}
          genres={genres}
          watch_providers={watch_providers}
        />
        <Suggested suggested={suggested} series closeReadMore={closeReadMore} />
      </main>
    </>
  );
};

export default Series;

export async function getServerSideProps(context) {
  const { query } = context;
  const { params } = query;
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${params[0]}?api_key=${process.env.API_KEY}&language=en-GB&append_to_response=credits,recommendations,watch%2Fproviders,content_ratings`
  );

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
      name: params[1],
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
