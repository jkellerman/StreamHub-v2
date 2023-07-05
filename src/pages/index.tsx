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
        <CategoryHeading
          type="all"
          category="trending this week"
          subheading="Trending in cinema and on all streaming services."
        />
        <Carousel endpoint="/api/trending/all/week" />
        <CategoryHeading type="movies" category="top films of the past year" />
        <Carousel endpoint="/api/year/pastYear/movie/2500" />
        <CategoryHeading type="series" category="popular netflix series" />
        <Carousel endpoint="/api/network/tv/8" />
        <CategoryHeading type="movies" category="best films of 2023" />
        <Carousel endpoint="/api/year/current/movie/2023" />
        <CategoryHeading type="series" category="popular movies on Disney+" />
        <Carousel endpoint="/api/network/movie/337" />
        <CategoryHeading
          type="series"
          category="popular TV series"
          subheading="The most popular on all streaming services."
        />
        <Carousel endpoint="/api/trending/tv/day" />
        <CategoryHeading type="movies" category="upcoming movies" />
        <Carousel endpoint="/api/media/movie/upcoming" />
        <CategoryHeading type="movies" category="Hidden gems of the past year" />
        <Carousel endpoint="/api/year/pastYear/movie/10" />
      </main>
    </>
  );
};

export default Home;
