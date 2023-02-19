import React from "react";
import Head from "next/head";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import TrendingBanner from "@/components/organisms/TrendingBanner/TrendingBanner";
import MediaCategoryHomePage from "@/components/organisms/MediaCategoryHomePage/MediaCategoryHomePage";
import { GetStaticProps } from "next";
import { Media } from "types";

interface HomeProps {
  trending: Media.IMediaItem[];
  popularShows: Media.IMediaItem[];
  popularMovies: Media.IMediaItem[];
  topRatedShows: Media.IMediaItem[];
  upcomingMovies: Media.IMediaItem[];
  onTheAir: Media.IMediaItem[];
  topRatedMovies: Media.IMediaItem[];
}

const Home: React.FC<HomeProps> = ({
  trending,
  popularShows,
  popularMovies,
  topRatedShows,
  upcomingMovies,
  onTheAir,
  topRatedMovies,
}) => {
  return (
    <>
      <Head>
        <title>Reelgood | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="Reelgood allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other providers in one place."
        />
      </Head>
      <main>
        <SearchBar all />
        <TrendingBanner data={trending} type="trending" category="trending" />
        <MediaCategoryHomePage
          data={popularMovies}
          type="movies"
          category="popular movies"
        />
        <MediaCategoryHomePage
          data={popularShows}
          type="series"
          category="popular shows"
        />
        <MediaCategoryHomePage
          data={upcomingMovies}
          type="movies"
          category="upcoming movies"
        />
        <MediaCategoryHomePage
          data={topRatedShows}
          type="series"
          category="top rated shows"
        />
        <MediaCategoryHomePage
          data={topRatedMovies}
          type="movies"
          category="top rated movies"
        />
        <MediaCategoryHomePage
          data={onTheAir}
          type="series"
          category="on the air"
        />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // Slice array

  const sliceArray = (
    arr: Media.IMediaItem[],
    limit: number
  ): Media.IMediaItem[] => {
    return arr.slice(0, limit);
  };
  // trending
  const trendingEndpoint = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}`;
  const trendingResponse = await fetch(trendingEndpoint);
  const trendingData = await trendingResponse.json();

  if (!trendingResponse.ok) {
    throw new Error(
      `Failed to fetch posts, received status ${trendingResponse.status}`
    );
  }

  const trendingFiltered = trendingData.results.filter(
    (type: Media.IMediaItem) => type.media_type !== "person"
  );

  const trending = sliceArray(trendingFiltered, 10);

  //   popular movies

  const popularMoviesEndpoint = `
    https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-GB&page=1`;
  const popularMoviesResponse = await fetch(popularMoviesEndpoint);
  const popularMoviesData = await popularMoviesResponse.json();

  if (!popularMoviesResponse.ok) {
    throw new Error(
      `Failed to fetch posts, received status ${popularMoviesResponse.status}`
    );
  }

  const popularMoviesFilteredArr = popularMoviesData.results.filter(
    (item: Media.IMediaItem) => item.backdrop_path !== null
  );

  const popularMovies = sliceArray(popularMoviesFilteredArr, 12);

  //   popular shows

  const popularShowsEndpoint = `
    https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-GB&page=1`;
  const popularShowsResponse = await fetch(popularShowsEndpoint);
  const popularShowsData = await popularShowsResponse.json();

  if (!popularShowsResponse.ok) {
    throw new Error(
      `Failed to fetch posts, received status ${popularShowsResponse.status}`
    );
  }

  const popularShowsFilteredArr = popularShowsData.results.filter(
    (item: Media.IMediaItem) => item.backdrop_path !== null
  );

  const popularShows = sliceArray(popularShowsFilteredArr, 12);

  //   upcoming movies

  const upcomingEndpoint = `
  https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-GBpage=1&region=GB`;
  const upcomingResponse = await fetch(upcomingEndpoint);
  const upcomingData = await upcomingResponse.json();

  if (!upcomingResponse.ok) {
    throw new Error(
      `Failed to fetch posts, received status ${upcomingResponse.status}`
    );
  }

  const upcomingFilteredArr = upcomingData.results.filter(
    (item: Media.IMediaItem) => item.backdrop_path !== null
  );

  const upcomingMovies = sliceArray(upcomingFilteredArr, 12);

  // top rated shows
  const topRatedShowsEndpoint = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}`;
  const topRatedShowsResponse = await fetch(topRatedShowsEndpoint);
  const topRatedShowsData = await topRatedShowsResponse.json();

  if (!topRatedShowsResponse.ok) {
    throw new Error(
      `Failed to fetch posts, received status ${topRatedShowsResponse.status}`
    );
  }

  const topRatedShowsFilteredArr = topRatedShowsData.results.filter(
    (item: Media.IMediaItem) => item.backdrop_path !== null
  );

  const topRatedShows = sliceArray(topRatedShowsFilteredArr, 12);

  //   top rated movies

  const topRatedMoviesEndpoint = `
  https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-GBpage=1&region=GB`;
  const topRatedMoviesResponse = await fetch(topRatedMoviesEndpoint);
  const topRatedMoviesData = await topRatedMoviesResponse.json();

  if (!topRatedMoviesResponse.ok) {
    throw new Error(
      `Failed to fetch posts, received status ${topRatedMoviesResponse.status}`
    );
  }

  const topRatedMoviesFilteredArr = topRatedMoviesData.results.filter(
    (item: Media.IMediaItem) => item.backdrop_path !== null
  );

  const topRatedMovies = sliceArray(topRatedMoviesFilteredArr, 12);

  //   on the air

  const onTheAirEndpoint = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.API_KEY}`;
  const onTheAirResponse = await fetch(onTheAirEndpoint);
  const onTheAirData = await onTheAirResponse.json();

  if (!onTheAirResponse.ok) {
    throw new Error(
      `Failed to fetch posts, received status ${onTheAirResponse.status}`
    );
  }

  const onTheAirFilteredArr = onTheAirData.results.filter(
    (item: Media.IMediaItem) => item.backdrop_path !== null
  );

  const onTheAir = sliceArray(onTheAirFilteredArr, 12);

  return {
    props: {
      trending,
      popularMovies,
      popularShows,
      upcomingMovies,
      topRatedShows,
      topRatedMovies,
      onTheAir,
    },
    revalidate: 1,
  };
};
