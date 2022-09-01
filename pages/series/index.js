import Head from "next/head";
import Search from "@/components/Search/Search";
import MediaType from "@/components/MediaType/MediaType";
import Dropdown from "@/components/Dropdown/Dropdown";

const series = ({ arr }) => {
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
        <Dropdown series={arr} />
        <MediaType type="series" endpoint="api/series" />
      </main>
    </>
  );
};

export default series;

export async function getStaticProps() {
  const url = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.API_KEY}&language=en-GB`;
  const response = await fetch(url);
  const data = await response.json();
  const arr = data.genres.filter((genre) => genre.name !== "Mystery");

  return {
    props: {
      arr,
    },
  };
}
