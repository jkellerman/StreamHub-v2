import Head from "next/head";
import styles from "@/components/Hero/Hero.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";
import Hero from "@/components/Hero/Hero";
import Details from "@/components/Details/Details";
import Overview from "@/components/Overview/Overview";
import WatchProviders from "@/components/WatchProviders/WatchProviders";
import Tablist from "@/components/Tablist/Tablist";
import Suggested from "@/components/Suggested/Suggested";
import useReadMore from "hooks/useReadMore";

const Movie = ({
  name,
  backdrop,
  tagline,
  age_rating,
  release_date,
  runtime,
  vote_average,
  overview,
  poster,
  director,
  cast,
  genres,
  watch_providers,
  suggested,
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
        <SearchBar movies hero />
        <Hero
          image={backdrop}
          name={name}
          tagline={tagline}
          age_rating={age_rating.certification}
          release_date={release_date}
          runtime={runtime}
          rating={vote_average}
          overview={overview}
          poster={poster}
          title={title}
        />
        <WatchProviders watch_providers={watch_providers} />
        <Overview
          overview={overview}
          age_rating={age_rating.certification}
          release_date={release_date}
          vote_average={vote_average}
          readMore={readMore}
          handleToggle={handleToggle}
        />
        <Details
          director={director}
          cast={cast}
          genres={genres}
          runtime={runtime}
          movies
        />
        <Tablist
          name={name}
          age_rating={age_rating}
          release_date={release_date}
          runtime={runtime}
          vote_average={vote_average}
          overview={overview}
          poster={poster}
          director={director}
          cast={cast}
          genres={genres}
          watch_providers={watch_providers}
        />
        <Suggested suggested={suggested} movies closeReadMore={closeReadMore} />
      </main>
    </>
  );
};

export default Movie;

export async function getServerSideProps(context) {
  const { query } = context;
  const { params } = query;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${params[0]}?api_key=${process.env.API_KEY}&language=en-GB&append_to_response=credits,recommendations,watch%2Fproviders,release_dates`
  );
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

  const getDirector = credits.crew.find(
    (crew) => crew.department === "Directing"
  );
  const director = getDirector.name;

  const getCast = credits.cast;
  const cast = getCast.slice(0, 4);

  const getWatchProviders = data["watch/providers"].results;

  const watch_providers = getWatchProviders.GB || [];

  const certification =
    release_dates.results.find((country) => country.iso_3166_1 === "GB") ||
    release_dates.results.find((country) => country.iso_3166_1 === "US") ||
    [];

  const age_rating =
    certification.release_dates.find((item) => item.certification !== "") || [];

  return {
    props: {
      name: params[1],
      backdrop: backdrop_path,
      tagline,
      age_rating,
      release_date,
      runtime,
      vote_average,
      overview,
      poster: poster_path,
      director,
      cast,
      genres,
      watch_providers,
      suggested: recommendations,
      title,
    },
  };
}
