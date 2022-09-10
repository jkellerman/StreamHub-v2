import Head from "next/head";
import styles from "@/components/Hero/Hero.module.css";
import Search from "@/components/Search/Search";
import Hero from "@/components/Hero/Hero";
import Details from "@/components/Details/Details";
import Overview from "@/components/Overview/Overview";
import WatchProviders from "@/components/WatchProviders/WatchProviders";
import Suggested from "@/components/Suggested/Suggested";

const Series = ({
  genre_list,
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
  data,
}) => {
  // console.log(data);
  return (
    <>
      <Head>
        <title>{`${name} | Entertainment`}</title>
        <meta name="description" content={`Watch ${name} now`} />
      </Head>
      <main className={styles.main}>
        <Search series hero />
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
        />
        <WatchProviders watch_providers={watch_providers} />
        <Overview
          overview={overview}
          series_age_rating={series_age_rating}
          air_date={air_date}
          vote_average={vote_average}
        />
        <Details
          network={network}
          cast={cast}
          genres={genres}
          genre_list={genre_list}
          seasons={seasons}
        />
        <Suggested suggested={suggested} series />
      </main>
    </>
  );
};

export default Series;

export async function getServerSideProps(context) {
  const { query } = context;
  const { id, name } = query;
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&language=en-GB&append_to_response=credits,recommendations,watch%2Fproviders,content_ratings`
  );

  const data = await response.json();

  const response2 = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}&language=en-GB`
  );
  const genre_list = await response2.json();

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
      genre_list,
      name,
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
      data,
      certification,
    },
  };
}
