import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

import CategoryHeading from "@/components/atoms/CategoryHeading/CategoryHeading";
import CardList from "@/components/molecules/CardList/CardList";
import Hero from "@/components/molecules/Hero/Hero";
import TrendingCards from "@/components/molecules/TrendingCards/TrendingCards";
import MediaCategoryHomePage from "@/components/organisms/MediaCategoryHomePage/MediaCategoryHomePage";
import TrendingBanner from "@/components/organisms/TrendingBanner/TrendingBanner";
import { Media } from "@/src/types";

interface HomeProps {
  trendingSeries: Media.IMediaItem[];
  popularMovies: Media.IMediaItem[];
  topRatedShows: Media.IMediaItem[];
  trendingMovies: Media.IMediaItem[];
  upcomingMovies: Media.IMediaItem[];
  topRatedMovies: Media.IMediaItem[];
}

const Home: React.FC<HomeProps> = ({
  trendingSeries,
  popularMovies,
  upcomingMovies,
  trendingMovies,
  topRatedShows,
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
        <Hero />
        {/* <CountrySelection /> */}
        <TrendingBanner>
          <CategoryHeading type="series" category="trending series" home />
          <TrendingCards cards={trendingSeries} />
        </TrendingBanner>

        <MediaCategoryHomePage>
          <CategoryHeading category="popular movies" type="movies" home />
          <CardList cards={popularMovies} />
        </MediaCategoryHomePage>

        <MediaCategoryHomePage>
          <CategoryHeading category="top rated shows" type="series" home />
          <CardList cards={topRatedShows} />
        </MediaCategoryHomePage>

        <TrendingBanner>
          <CategoryHeading type="movies" category="trending movies" home />
          <TrendingCards cards={trendingMovies} />
        </TrendingBanner>

        <MediaCategoryHomePage>
          <CategoryHeading category="upcoming movies" type="movies" home />
          <CardList cards={upcomingMovies} />
        </MediaCategoryHomePage>

        <MediaCategoryHomePage>
          <CategoryHeading category="top rated movies" type="movies" home />
          <CardList cards={topRatedMovies} />
        </MediaCategoryHomePage>
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // Slice array

  const sliceArray = (arr: Media.IMediaItem[], limit: number): Media.IMediaItem[] => {
    return arr.slice(0, limit);
  };
  // trending series
  const trendingSeriesEndpoint = `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.API_KEY}`;
  const trendingSeriesResponse = await fetch(trendingSeriesEndpoint);
  const trendingSeriesData = await trendingSeriesResponse.json();

  if (!trendingSeriesResponse.ok) {
    throw new Error(`Failed to fetch posts, received status ${trendingSeriesResponse.status}`);
  }

  const trendingSeriesFiltered = trendingSeriesData.results.filter(
    (type: Media.IMediaItem) => type.media_type !== "person"
  );

  const trendingSeries = sliceArray(trendingSeriesFiltered, 10);

  //   popular movies

  const popularMoviesEndpoint = `
    https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-GB&page=1`;
  const popularMoviesResponse = await fetch(popularMoviesEndpoint);
  const popularMoviesData = await popularMoviesResponse.json();

  if (!popularMoviesResponse.ok) {
    throw new Error(`Failed to fetch posts, received status ${popularMoviesResponse.status}`);
  }

  const popularMoviesFilteredArr = popularMoviesData.results.filter(
    (item: Media.IMediaItem) => item.backdrop_path !== null
  );

  const popularMovies = sliceArray(popularMoviesFilteredArr, 12);

  // top rated shows
  const topRatedShowsEndpoint = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}`;
  const topRatedShowsResponse = await fetch(topRatedShowsEndpoint);
  const topRatedShowsData = await topRatedShowsResponse.json();

  if (!topRatedShowsResponse.ok) {
    throw new Error(`Failed to fetch posts, received status ${topRatedShowsResponse.status}`);
  }

  const topRatedShowsFilteredArr = topRatedShowsData.results.filter(
    (item: Media.IMediaItem) => item.backdrop_path !== null
  );

  const topRatedShows = sliceArray(topRatedShowsFilteredArr, 12);

  // trending movies
  const trendingMoviesEndpoint = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.API_KEY}`;
  const trendingMoviesResponse = await fetch(trendingMoviesEndpoint);
  const trendingMoviesData = await trendingMoviesResponse.json();

  if (!trendingSeriesResponse.ok) {
    throw new Error(`Failed to fetch posts, received status ${trendingMoviesResponse.status}`);
  }

  const trendingMoviesFiltered = trendingMoviesData.results.filter(
    (type: Media.IMediaItem) => type.media_type !== "person"
  );

  const trendingMovies = sliceArray(trendingMoviesFiltered, 10);

  //   upcoming movies

  const upcomingEndpoint = `
  https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-GBpage=1&region=GB`;
  const upcomingResponse = await fetch(upcomingEndpoint);
  const upcomingData = await upcomingResponse.json();

  if (!upcomingResponse.ok) {
    throw new Error(`Failed to fetch posts, received status ${upcomingResponse.status}`);
  }

  const upcomingFilteredArr = upcomingData.results.filter(
    (item: Media.IMediaItem) => item.backdrop_path !== null
  );

  const upcomingMovies = sliceArray(upcomingFilteredArr, 12);

  //   top rated movies

  const topRatedMoviesEndpoint = `
  https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-GBpage=1&region=GB`;
  const topRatedMoviesResponse = await fetch(topRatedMoviesEndpoint);
  const topRatedMoviesData = await topRatedMoviesResponse.json();

  if (!topRatedMoviesResponse.ok) {
    throw new Error(`Failed to fetch posts, received status ${topRatedMoviesResponse.status}`);
  }

  const topRatedMoviesFilteredArr = topRatedMoviesData.results.filter(
    (item: Media.IMediaItem) => item.backdrop_path !== null
  );

  const topRatedMovies = sliceArray(topRatedMoviesFilteredArr, 12);

  return {
    props: {
      trendingSeries,
      popularMovies,
      topRatedShows,
      trendingMovies,
      upcomingMovies,
      topRatedMovies,
    },
    revalidate: 1,
  };
};
