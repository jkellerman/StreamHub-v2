import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import { sliceArray } from "@/utils/utils";
import Trending from "@/components/Trending/Trending";
import Category from "@/components/Category/Category";

export default function Home({
  trending,
  popularShows,
  popularMovies,
  topRatedShows,
  upcoming,
  onTheAir,
  topRatedMovies,
}) {
  return (
    <>
      <Head>
        <title>Entertainment | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="Entertainment allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <SearchBar all />
        <Trending trending={trending} />
        <Category data={popularShows} category="popular shows" />
        <Category data={popularMovies} category="popular movies" />
        <Category data={topRatedShows} category="top rated shows" />
        <Category data={upcoming} category="upcoming movies" />
        <Category data={onTheAir} category="on the air" />
        <Category data={topRatedMovies} category="top rated movies" />
      </main>
    </>
  );
}

export async function getStaticProps() {
  // trending
  const trendingEndpoint = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}`;
  const trendingResponse = await fetch(trendingEndpoint);
  const trendingData = await trendingResponse.json();

  const trendingFiltered = trendingData.results.filter(
    (type) => type.media_type !== "person"
  );

  const trending = sliceArray(trendingFiltered, 10);

  //   popular shows

  const popularShowsEndpoint = `
    https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-GB&page=1`;
  const popularShowsResponse = await fetch(popularShowsEndpoint);
  const popularShowsData = await popularShowsResponse.json();

  const popularShowsFilteredArr = popularShowsData.results.filter(
    (item) => item.backdrop_path !== null
  );

  const popularShows = sliceArray(popularShowsFilteredArr, 12);

  //   popular movies

  const popularMoviesEndpoint = `
    https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-GB&page=1`;
  const popularMoviesResponse = await fetch(popularMoviesEndpoint);
  const popularMoviesData = await popularMoviesResponse.json();

  const popularMoviesFilteredArr = popularMoviesData.results.filter(
    (item) => item.backdrop_path !== null
  );

  const popularMovies = sliceArray(popularMoviesFilteredArr, 12);

  // top rated shows
  const topRatedShowsEndpoint = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}`;
  const topRatedShowsResponse = await fetch(topRatedShowsEndpoint);
  const topRatedShowsData = await topRatedShowsResponse.json();

  const topRatedShowsFilteredArr = topRatedShowsData.results.filter(
    (item) => item.backdrop_path !== null
  );

  const topRatedShows = sliceArray(topRatedShowsFilteredArr, 12);

  //   upcoming movies

  const upcomingEndpoint = `
    https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-GBpage=1&region=GB`;
  const upcomingResponse = await fetch(upcomingEndpoint);
  const upcomingData = await upcomingResponse.json();

  const upcomingFilteredArr = upcomingData.results.filter(
    (item) => item.backdrop_path !== null
  );

  const upcoming = sliceArray(upcomingFilteredArr, 12);

  //   on the air

  const onTheAirEndpoint = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.API_KEY}`;
  const onTheAirResponse = await fetch(onTheAirEndpoint);
  const onTheAirData = await onTheAirResponse.json();

  const onTheAirFilteredArr = onTheAirData.results.filter(
    (item) => item.backdrop_path !== null
  );

  const onTheAir = sliceArray(onTheAirFilteredArr, 12);

  //   top rated movies

  const topRatedMoviesEndpoint = `
  https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-GBpage=1&region=GB`;
  const topRatedMoviesResponse = await fetch(topRatedMoviesEndpoint);
  const topRatedMoviesData = await topRatedMoviesResponse.json();

  const topRatedMoviesFilteredArr = topRatedMoviesData.results.filter(
    (item) => item.backdrop_path !== null
  );

  const topRatedMovies = sliceArray(topRatedMoviesFilteredArr, 12);

  return {
    props: {
      trending,
      popularShows,
      popularMovies,
      topRatedShows,
      upcoming,
      onTheAir,
      topRatedMovies,
    },
    revalidate: 1,
  };
}
