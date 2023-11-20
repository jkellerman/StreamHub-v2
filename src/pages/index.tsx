import Head from "next/head";
import React from "react";

import CTA from "@/components/CallToActionSection/CallToActionSection";
import Carousel from "@/components/Carousel/Carousel";
import CategoryHeading from "@/components/CategoryHeading/CategoryHeading";
import Hero from "@/components/Hero/Hero";
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
        <title>StreamHub | Streaming Movies and TV series recommendations</title>
        <meta
          name="description"
          content="StreamHub allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other providers in one place, whilst providing recommendations on what to watch tonight."
        />
      </Head>

      <main>
        <Hero />
        <section>
          <CategoryHeading
            category="trending this week"
            subheading="Trending in cinema and on all streaming services."
          />
          <Carousel endpoint="/api/trending/all/week" />
        </section>
        <section>
          <CategoryHeading
            category="popular movies"
            subheading="The most popular on all streaming services."
          />
          <Carousel endpoint="/api/network/movie/8|337|9|531|350" />
        </section>

        <section>
          <CategoryHeading category="popular netflix series" />
          <Carousel endpoint="/api/network/tv/8" />
        </section>
        <section>
          <CategoryHeading category="popular movies on Disney+" />
          <Carousel endpoint="/api/network/movie/337" />
        </section>
        {/* TODO: add back in for 2024 */}
        {/* <section>
          <CategoryHeading category={`best films of ${year}`} />
          <Carousel endpoint={`/api/year/current/movie/${year}`} />
        </section> */}
        <section>
          <CategoryHeading category="top films of the past year" />
          <Carousel endpoint="/api/year/pastYear/movie/2500" />
        </section>
        <section>
          <CategoryHeading
            category="popular series"
            subheading="The most popular on all streaming services."
          />
          <Carousel endpoint="/api/trending/tv/week" />
        </section>
        <section>
          <CategoryHeading category="upcoming movies" />
          <Carousel endpoint="/api/media/movie/upcoming" />
        </section>
        <section>
          <CategoryHeading category="Hidden gems" />
          <Carousel endpoint="/api/year/pastYear/movie/10" />
        </section>

        <section>
          <CTA />
        </section>
      </main>
    </>
  );
};

export default Home;
