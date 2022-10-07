import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import styles from "@/components/Category/Category.module.css";

const Category = ({ data, category }) => {
  return (
    <section>
      <h2 className={styles.heading}>{category}</h2>
      <div className={styles.container}>
        {data.map((show) => {
          return (
            <article key={show.id} className={styles.linkContainer}>
              <Card
                id={show.id}
                image={show.backdrop_path}
                airDate={show.first_air_date}
                seriesName={show.name}
                releaseDate={show.release_date}
                title={show.title}
              />
              <CardDetails
                airDate={show.first_air_date}
                seriesName={show.name}
                releaseDate={show.release_date}
                title={show.title}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
