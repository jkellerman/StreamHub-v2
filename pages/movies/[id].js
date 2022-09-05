import Search from "@/components/Search/Search";
import Hero from "@/components/Hero/Hero";
import styles from "@/components/Hero/Hero.module.css";

const Movie = ({ name, data }) => {
  return (
    <>
      <main>
        <Search movies />
        <section></section>
      </main>
      <Hero image={data.backdrop_path} name={name} />
    </>
  );
};

export default Movie;

export async function getServerSideProps(context) {
  const { query } = context;
  const { id, name } = query;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-GB&append_to_response=credits,recommendations,watch%2Fproviders`
  );
  const data = await response.json();

  return {
    props: {
      data,
      name,
    },
  };
}
