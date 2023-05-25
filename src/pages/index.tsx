import Head from "next/head";
import React from "react";

import CategoryHeading from "@/components/atoms/CategoryHeading/CategoryHeading";
import Carousel from "@/components/molecules/Carousel/Carousel";
import Hero from "@/components/molecules/Hero/Hero";
import { Media } from "@/src/types";

interface HomeProps {
  trendingSeries: Media.IMediaItem[];
  popularMovies: Media.IMediaItem[];
  topRatedShows: Media.IMediaItem[];
  trendingMovies: Media.IMediaItem[];
  upcomingMovies: Media.IMediaItem[];
  topRatedMovies: Media.IMediaItem[];
}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Head>
        <title>Reelbuddy | Streaming Movies and TV series recommendations</title>
        <meta
          name="description"
          content="Reelbuddy allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other providers in one place, whilst providing recommendations on what to watch tonight."
        />
      </Head>

      <main>
        <Hero />
        <CategoryHeading type="series" category="trending this week" />
        <Carousel endpoint="/api/trending/all/week" allMedia />
        <CategoryHeading type="series" category="popular TV series" />
        <Carousel endpoint="/api/trending/tv/day" />
        <CategoryHeading type="movies" category="popular movies" />
        <Carousel endpoint="/api/trending/movie/day" />
        <CategoryHeading type="movies" category="upcoming movies" />
        <Carousel endpoint="/api/movies/upcoming" />
        <CategoryHeading type="movies" category="top rated movies" />
        <Carousel endpoint="/api/movies/top_rated" />
      </main>
    </>
  );
};

export default Home;
