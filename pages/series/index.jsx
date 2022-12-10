import Head from "next/head";
import SearchBar from "@/components/SearchBar/SearchBar";
import MediaType from "@/components/MediaType/MediaType";

const Series = ({ genreList }) => {
  return (
    <>
      <Head>
        <title>Watch TV series Online | Reelgood</title>
        <meta
          name="description"
          content="Find out where to watch TV shows from Netflix, Amazon Prime, Disney+ and many more services."
        />
      </Head>
      <main>
        <SearchBar series />
        <MediaType
          type="series"
          endpoint="api/series"
          popular
          seriesGenreList={genreList}
        />
      </main>
    </>
  );
};

export default Series;

export async function getStaticProps() {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}&language=en-GB`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList,
    },
  };
}
