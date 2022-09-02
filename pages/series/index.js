import Head from "next/head";
import Search from "@/components/Search/Search";
import MediaType from "@/components/MediaType/MediaType";

const Series = ({ genreList }) => {
  return (
    <>
      <Head>
        <title>Series | Entertainment</title>
        <meta
          name="description"
          content="Stream now for access to the best series"
        />
      </Head>
      <main>
        <Search series />
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
