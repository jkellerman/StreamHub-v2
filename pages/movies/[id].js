import Head from "next/head";
import Search from "@/components/Search/Search";
import Hero from "@/components/Hero/Hero";
import Details from "@/components/Details/Details";
import styles from "@/components/Hero/Hero.module.css";

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
  data,
}) => {
  return (
    <>
      <Head>
        <title>{`${name} | Entertainment`}</title>
        <meta name="description" content={`Watch ${name} now`} />
      </Head>
      <main className={styles.main}>
        <Search movies hero />
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
        />
        <Details director={director} cast={cast} genres={genres} />
      </main>
    </>
  );
};

export default Movie;

export async function getServerSideProps(context) {
  const { query } = context;
  const { id, name } = query;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-GB&append_to_response=credits,recommendations,watch%2Fproviders,release_dates`
  );
  const data = await response.json();
  const {
    backdrop_path,
    tagline,
    release_dates,
    release_date,
    production_countries,
    runtime,
    vote_average,
    overview,
    poster_path,
    credits,
    genres,
  } = data;

  const productionCountry = production_countries.map((item) => {
    return item.iso_3166_1;
  });

  const certification = release_dates.results.find(
    (country) =>
      country.iso_3166_1 === "GB" ||
      country.iso_3166_1 === "US" ||
      country.iso_3166_1 === "KR" ||
      country.iso_3166_1 === productionCountry
  );

  const age_rating = certification.release_dates.find(
    (item) => item.certification !== "" || item.certification === ""
  );

  const getDirector = credits.crew.find(
    (crew) => crew.known_for_department === "Directing"
  );
  const director = getDirector.name;

  const getCast = credits.cast;
  const cast = getCast.slice(0, 4) || getCast.slice(0, 1);

  return {
    props: {
      data,
      name,
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
    },
  };
}
