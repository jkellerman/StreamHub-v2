import TrendingCard from "@/components/TrendingCard/TrendingCard";
import styles from "@/components/Trending/Trending.module.css";

const Trending = ({ arr }) => {
  return (
    <section>
      <h1>Trending</h1>
      <div className={styles.banner}>
        {arr.map((item) => {
          return (
            <TrendingCard
              key={item.id}
              id={item.id}
              image={item.backdrop_path}
              movieTitle={item.title}
              year={item.release_date}
              type={item.media_type}
              seriesName={item.name}
              airDate={item.first_air_date}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Trending;
