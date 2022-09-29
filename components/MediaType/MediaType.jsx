import useInfiniteScroll from "hooks/useInfiniteScroll";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";
import Dropdown from "@/components/Dropdown/Dropdown";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const MediaType = ({
  endpoint,
  type,
  popular,
  movieGenreList,
  seriesGenreList,
}) => {
  const { cards, isLoading } = useInfiniteScroll(endpoint);
  if (isLoading) return <LoadingAnimation />;

  return (
    <section>
      <Dropdown
        type={type}
        popular={popular}
        movieGenreList={movieGenreList}
        seriesGenreList={seriesGenreList}
      />
      <h1>{type}</h1>
      <div className={styles.container}>
        {cards.map((item) => {
          return (
            <article key={item.id} className={styles.linkContainer}>
              <Card
                id={item.id}
                image={item.backdrop_path}
                releaseDate={item.release_date}
                title={item.title}
                airDate={item.first_air_date}
                seriesName={item.name}
              />
              <CardDetails
                releaseDate={item.release_date}
                title={item.title}
                airDate={item.first_air_date}
                seriesName={item.name}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
};
// };

export default MediaType;
