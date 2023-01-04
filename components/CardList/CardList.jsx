import useInfiniteScroll from "hooks/useInfiniteScroll";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const CardList = ({ endpoint }) => {
  const { cards, isLoading } = useInfiniteScroll(endpoint);
  
  if (isLoading) return <LoadingAnimation />;

  return (
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
  );
};

export default CardList;
